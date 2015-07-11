"use strict";

import Promise from "bluebird";
import bs58 from "bs58";
import database from "./database";
let { User, Adventure, Message, Token, UserAdventures } = database;

function printOverview() {
    console.log("\n--- users");
    User.findAll({ include: [Adventure, Message] })
        .then(users => {
            users.forEach(user => {
                console.log(user.get({ plain: true }));
            });
        });
}

function createAdventurer(options) {
    return User.create({
        firstName: options.firstName,
        lastName: options.lastName,
        imageUrl: `https://graph.facebook.com/v2.3/${options.facebookId}/picture?type=square`
    })
        .then(user => {
            return user.addAdventure(options.adventure);
        })
        .then(userAdventure => {
            let tokenText = bs58.encode(new Buffer(`${userAdventure.UserId};;`));
            return Token.create({
                text: tokenText,
                UserId: userAdventure.UserId
            })
            .then(token => {
                console.log("Created token", token.get({ plain: true }));
                return userAdventure;
            });
        })
        .then(userAdventure => {
            return Message.create({
                text: options.firstMessage,
                UserId: userAdventure.UserId,
                AdventureId: userAdventure.AdventureId
            });
        })
        .then(() => {
            return options.adventure;
        });
}

function createTestDataAsync() {
    return Promise.all([
        User.sync(),
        Adventure.sync(),
        Message.sync(),
        Token.sync(),
        UserAdventures.sync()
    ])
        .then(() => {
            return Adventure.create({ name: "A grand voyage" });
        })
        .then(adventure => {
            return createAdventurer({
                firstName: "Frank",
                lastName: "Ballston",
                adventure: adventure,
                facebookId: 4,
                firstMessage: "Hi, I'm Frank!"
            });
        })
        .then(adventure => {
            return createAdventurer({
                firstName: "Adam",
                lastName: "Goggles",
                adventure: adventure,
                facebookId: 5,
                firstMessage: "Hello everybody."
            });
        })
        .tap(printOverview);
}

export default function createTestDataIfEmpty() {
    return database.initialize()
        .then(() => {
            return User.count();
        })
        .then(count => {
            if (count > 0) {
                console.log("Something found in the database, all right!");
                return Promise.resolve();
            }
            console.log("Database looks empty, creating some test data...");
            return createTestDataAsync();
        });
}

if (!module.parent) {
    createTestDataAsync().then(() => {
        console.log("Created some test data.");
    });
}
