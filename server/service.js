"use strict";

import bs58 from "bs58";
import Promise from "bluebird";
import { User, Adventure, Message, Token } from "./database";

class TokenError extends Error {}

export function isTokenValidAsync(token) {
    console.log(`token valid check for ${token}`);
    let decoded = null;
    try {
        decoded = bs58.decode(token);
    } catch (e) {
        console.log("Couldn't decode token", e);
        return Promise.reject(e);
    }
    let tokenContents = new Buffer(decoded).toString();
    let [userId, email, issueDate] = tokenContents.split(";");

    console.log("Token contents", tokenContents);
    console.log(userId, email, issueDate);

    console.log(`Searching for token ${token} for userId ${userId}`);

    return Token.findAll()
        .then(token => {
            console.log("found token for user?", token);
            if (!token) {
                throw new TokenError("Invalid token");
            }
            return token;
        });

}

export function findOrCreateFacebookUser(data) {
    let userProperties = {
        firstName: data.name.givenName,
        lastName: data.name.familyName,
        email: data.emails[0].value
    };
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
        return user.addToken({
            text: token
        });
    });
}

export function getAdventure(id) {
    return Adventure.find(id);
}

export function getMessages(adventureId, token) {
    return isTokenValidAsync(token)
        .then(Message.findAll({
            where: {
                AdventureId: adventureId
            },
            order: [
                ["createdAt", "DESC"],
                ["id", "DESC"]
            ]
        }));
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

export function postMessage(adventureId, message) {
    if (!message.text) {
        return Promise.reject(new Error("Missing message text"));
    } else if (!message.userId) {
        return Promise.reject(new Error("Missing user ID"));
    }

    return Message.create({
        text: message.text,
        UserId: message.userId,
        AdventureId: adventureId
    })
    .catch(err => {
        if (err.name === "SequelizeForeignKeyConstraintError") {
            return Promise.reject(new Error("Invalid user or adventure ID"));
        }
        return err;
    });
}
