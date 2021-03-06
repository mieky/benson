"use strict";

import bs58 from "bs58";
import Promise from "bluebird";
import { User, Adventure, Message, Token } from "./database";

class TokenError extends Error {}

/*
    "https://www.facebook.com/app_scoped_user_id/10152821918247405/"
    ->
    "https://graph.facebook.com/v2.3/10152821918247405/picture?type=square"
*/
function getImageUrl(profileUrl) {
    let userId = profileUrl.split("/").filter(l => l.match(/^[0-9]+$/))[0];
    return `https://graph.facebook.com/v2.3/${userId}/picture?type=square`;
}

export function isTokenValidAsync(token) {
    let decoded = null;
    try {
        decoded = bs58.decode(token);
    } catch (e) {
        console.log("Couldn't decode token", e);
        return Promise.reject(e);
    }
    let tokenContents = new Buffer(decoded).toString();
    let [userId, email, issueDate] = tokenContents.split(";"); /* eslint no-unused-vars: 0 */

    return Token.find({
        where: {
            UserId: userId,
            text: token
        }
    })
    .then(userToken => {
        if (!userToken) {
            throw new TokenError("Invalid token");
        }
        return userToken;
    });
}

export function findOrCreateFacebookUser(data) {
    let userProperties = {
        firstName: data.name.givenName,
        lastName: data.name.familyName,
        email: data.emails[0].value,
        imageUrl: getImageUrl(data.profileUrl)
    };
    console.log("user properties", userProperties);

    return User.findOrCreate({
        where: userProperties
    })
    .then(users => {
        return users[0];
    });
}

export function findOrCreateToken(user) {
    return Token.findAll({
        where: {
            UserId: user.id
        }
    })
    .then(tokens => {
        if (tokens.length > 0) {
            return tokens[0];
        }

        let tokenContents = [user.id, user.email, new Date().getTime()];
        let token = bs58.encode(new Buffer(tokenContents.join(";")));

        console.log(`Creating token for user ${user.id}: ${token}`);
        return Token.create({
            text: token,
            UserId: user.id
        });
    });
}

export function getAdventure(id) {
    return Adventure.find(id);
}

export function getMessages(requestToken, adventureId) {
    return isTokenValidAsync(requestToken)
        .then(token => {
            return Message.findAll({
                where: {
                    AdventureId: adventureId
                },
                include: [
                    {
                        model: User,
                        attributes: ["firstName", "lastName", "imageUrl"]
                    }
                ],
                order: [
                    ["createdAt", "DESC"],
                    ["id", "DESC"]
                ]
            });
        });
}

export function getUser(id) {
    return User.find(id);
}

export function getUserWhere(params) {
    return User.find({
        where: params
    });
}

export function getUsersAsync() {
    return User.findAll();
}

export function getTokens() {
    return Token.findAll();
}

export function postMessage(requestToken, adventureId, message) {
    return isTokenValidAsync(requestToken)
        .then(token => {
            if (!message.text) {
                return Promise.reject(new Error("Missing message text"));
            } else if (!token.UserId) {
                return Promise.reject(new Error("Missing user ID"));
            }

            // Post with the userId from the token
            return Message.create({
                text: message.text,
                UserId: token.UserId,
                AdventureId: adventureId
            });
        })
        .catch(err => {
            if (err.name === "SequelizeForeignKeyConstraintError") {
                return Promise.reject(new Error("Invalid user or adventure ID"));
            }
            return err;
        });
}
