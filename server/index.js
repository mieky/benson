"use strict";

var Sequelize = require("sequelize");
var path = require("path");

var sequelize = new Sequelize(null, null, null, {
    dialect: "sqlite",
    storage: path.resolve(".", "database.sqlite")
});

var User = sequelize.define("user", {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});

User.sync({ force: true }).then(function() {
    return User.create({
        firstName: "Frank",
        lastName: "Ballston"
    });
});
