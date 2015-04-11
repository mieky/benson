"use strict";

const Sequelize = require("sequelize");
const Promise = require("bluebird");
const path = require("path");

let sequelize = new Sequelize(null, null, null, {
    dialect: "sqlite",
    storage: path.resolve(".", "database.sqlite"),
    logging: false
});

let User = sequelize.define("User", {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING }
});

let Adventure = sequelize.define("Adventure", {
    name: { type: Sequelize.STRING }
});

let Message = sequelize.define("Message", {
    text: { type: Sequelize.STRING }
});

let UserAdventures = sequelize.define("UserAdventures", {});

User.belongsToMany(Adventure, { through: "UserAdventures" });
Adventure.belongsToMany(User, { through: "UserAdventures" });

User.hasMany(Message);
Adventure.hasMany(Message);

Message.belongsTo(User);
Message.belongsTo(Adventure);

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
    }).then(() => {
        User.create({
            firstName: "Adam",
            lastName: "Goggles"
        });
    })
    .then(() => {
        console.log("\n--- users");
        User.findAll().then(users => {
            users.map(u => {
                u.addAdventure(adventure).then(() => {
                    console.log(u.get({ plain: true }));
                });
            });
        });
    });
});
