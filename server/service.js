"use strict";

let Promise = require("bluebird");
let {
    User,
    Adventure,
    Message,
    UserAdventures
} = require("./model");

export function getAdventure(id) {
    return Adventure.find(id);
}

export function getMessages(adventureId) {
    return Message.findAll({
        where: {
            AdventureId: adventureId
        },
        order: [["createdAt", "DESC"]]
    });
}

export function getUser(id) {
    return User.find(id);
}

export function getUsersAsync() {
    return User.findAll();
};
