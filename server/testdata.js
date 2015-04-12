"use strict";

let Promise = require("bluebird");
let {
    User,
    Adventure,
    Message,
    UserAdventures
} = require("./model");

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
        lastName: options.lastName
    })
        .then(user => {
            return user.addAdventure(options.adventure);
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

export function createTestData() {
    // Initialize everything, deleting existing data
    return Promise.all([
        User.sync({ force: true }),
        Adventure.sync({ force: true }),
        Message.sync({ force: true }),
        UserAdventures.sync({ force: true })
    ])
        .then(() => {
            return Adventure.create({ name: "A grand voyage" });
        })
        .then(adventure => {
            return createAdventurer({
                firstName: "Frank",
                lastName: "Ballston",
                adventure: adventure,
                firstMessage: "Hi, I'm Frank!"
            });
        })
        .then(adventure => {
            return createAdventurer({
                firstName: "Adam",
                lastName: "Goggles",
                adventure: adventure,
                firstMessage: "Hello everybody."
            });
        })
        .tap(printOverview);
};

if (!module.parent) {
    createTestData();
}
