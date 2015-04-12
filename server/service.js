"use strict";

let Promise = require("bluebird");
let {
    User,
    Adventure,
    Message,
    UserAdventures
} = require("./model");

export function getUser(id) {
    return User.find(id);
}

export function getUsersAsync() {
    return User.findAll();
};
