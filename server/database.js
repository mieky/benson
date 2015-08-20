import path from "path";
import Promise from "bluebird";

var dbFile = path.resolve(".", "knex.sqlite");
var dbConfig = {
    client: "sqlite3",
    connection: {
        filename: dbFile
    }
};

let knex = require("knex")(dbConfig);
let bookshelf = require("bookshelf")(knex);

export function initialize(options) {
    options = options || {};

    console.log("Initializing database...");

    let User = bookshelf.Model.extend({
        tableName: "user",
        adventures: () => {
            return this.belongsToMany(Adventure);
        },
        messages: () => {
            return this.hasMany(Message);
        },
        tokens: () => {
            return this.hasMany(Token);
        }
    });

    let Adventure = bookshelf.Model.extend({
        tableName: "adventure",
        messages: () => {
            return this.hasMany(Message);
        },
        users: () => {
            return this.hasMany(User);
        }
    });

    let Message = bookshelf.Model.extend({
        tableName: "message",
        adventure: () => {
            return this.belongsTo(Adventure);
        },
        user: () => {
            return this.belongsTo(User);
        }
    });

    let Token = bookshelf.Model.extend({
        tableName: "token",
        user: () => {
            return this.belongsTo(User);
        }
    });

    if (options.createTestData) {
        console.log("Creating test data...");
    }

    return Promise.resolve();
}
