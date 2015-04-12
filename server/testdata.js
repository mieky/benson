"use strict";

let Promise = require("bluebird");
let {
    User,
    Adventure,
    Message,
    UserMessages,
    UserAdventures
} = require("./model");

export function createTestData() {
    // Initialize everything, deleting existing data
    Promise.all([
        UserAdventures.sync({ force: true }),
        UserMessages.sync({ force: true }),
        Adventure.sync({ force: true }),
        Message.sync({ force: true }),
        User.sync({ force: true })
    ]).then(() => {
        return Adventure.create({ name: "A grand voyage" });
    }).then(adventure => {
        return User.create({
            firstName: "Frank",
            lastName: "Ballston"
        }).then(user => {
            return user.addAdventure(adventure);
        }).then(user => {
            return Message.create({
                text: "Hello world",
                UserId: 1,
                AdventureId: 1
            }).then(msg => {
                console.log("A:", adventure.get({ plain: true }));
                console.log("U:", user.get({ plain: true }));
                console.log("M:", msg.get({ include: [Adventure, User]}));
                // console.log(msg.get({ plain: true }));
                // msg.setUser(user).then(() => {
                //     console.log("msg", msg.get({ plain: true }));
                // });
                // msg.setAdventure(adventure);
            });
        })
        .then(() => {
            // return User.create({
            //     firstName: "Adam",
            //     lastName: "Goggles"
            // }).then(user => {
            //     return user.addAdventure(adventure);
            // });
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
