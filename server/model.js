const Sequelize = require("sequelize");
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

module.exports = {
    User, Adventure, UserAdventures, Message
};
