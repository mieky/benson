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
        order: [
            ["createdAt", "DESC"],
            ["id", "DESC"]
        ]
    });
}

export function getUser(id) {
    return User.find(id);
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
