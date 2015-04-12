"use strict";

let Promise = require("bluebird");
let {
    Adventure,
    User,
    UserAdventures,
    Message
} = require("./model");

export function createTestData() {
    Promise.all([
        Adventure.sync({ force: true }),
        UserAdventures.sync({ force: true }),
        User.sync({ force: true })
    ]).then(() => {
        return Adventure.create({
            name: "A grand voyage"
        });
    }).then(adventure => {
        console.log("Adventure", adventure.get({ plain: true }));

        return User.create({
            firstName: "Frank",
            lastName: "Ballston"
        }).then(user => {
            return user.addAdventure(adventure);
        })
        .then(() => {
            return User.create({
                firstName: "Adam",
                lastName: "Goggles"
            }).then(user => {
                return user.addAdventure(adventure);
            });
        });
    }).then(() => {
        console.log("\n--- users");
        User.findAll({ include: [Adventure] })
            .then(users => {
                users.forEach(user => {
                    console.log(user.get({ plain: true }));
                });
            });
    });
};
