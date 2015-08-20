import path from "path";
import Promise from "bluebird";

var dbConfig = {
    client: "sqlite3",
    connection: {
        filename: "./database.sqlite"
    },
    // debug: true
};

var knex = require("knex")(dbConfig);
var bookshelf = require("bookshelf")(knex);

export function initialize(options) {
    options = options || {};

    console.log("Initializing database...");

    // Schemas

    let tables = [
        bookshelf.knex.schema.hasTable("adventure").then(exists => {
            if (!exists) {
                return bookshelf.knex.schema.createTable("adventure", table => {
                    table.increments("id").primary();
                    table.string("name");
                });
            }
        }),
        bookshelf.knex.schema.hasTable("user").then(exists => {
            if (!exists) {
                return bookshelf.knex.schema.createTable("user", table => {
                    table.increments("id").primary();
                    table.string("first_name");
                    table.string("last_name");
                    table.string("email");
                    table.string("image_url");
                });
            }
        }),
        bookshelf.knex.schema.hasTable("adventure_user").then(exists => {
            if (!exists) {
                return bookshelf.knex.schema.createTable("adventure_user", table => {
                    table.integer("adventure_id").references("adventure.id");
                    table.integer("user_id").references("user.id");
                    table.timestamps();
                });
            }
        }),
        bookshelf.knex.schema.hasTable("message").then(exists => {
            if (!exists) {
                return bookshelf.knex.schema.createTable("message", table => {
                    table.increments("id").primary();
                    table.timestamp("created_at").defaultTo(knex.fn.now());
                    table.string("text");
                });
            }
        }),
        bookshelf.knex.schema.hasTable("token").then(exists => {
            if (!exists) {
                return bookshelf.knex.schema.createTable("token", table => {
                    table.timestamp("created_at").defaultTo(knex.fn.now());
                    table.string("text");
                });
            }
        })
    ];

    // Models

    var User = bookshelf.Model.extend({
        tableName: "user",
        adventures: function() {
            return this.belongsToMany(Adventure);
        },
        messages: function() {
            return this.hasMany(Message);
        },
        tokens: function() {
            return this.hasMany(Token);
        }
    });

    var Adventure = bookshelf.Model.extend({
        tableName: "adventure",
        messages: function() {
            return this.hasMany(Message);
        },
        users: function() {
            return this.belongsToMany(User);
        }
    });

    var Message = bookshelf.Model.extend({
        tableName: "message",
        adventure: function() {
            return this.belongsTo(Adventure);
        },
        user: function() {
            return this.belongsTo(User);
        }
    });

    var Token = bookshelf.Model.extend({
        tableName: "token",
        user: function() {
            return this.belongsTo(User);
        }
    });

    if (options.createTestData) {
        return Promise.all(tables)
            .then(() => {
                console.log("Creating test data...");

                var adventure1 = new Adventure({ name: "A grand voyage "});
                var user1 = new User({ "first_name": "Frank", "last_name": "Ballston" });
                var user2 = new User({ "first_name": "Adam", "last_name": "Goggles" });

                Promise.all([adventure1.save(), user1.save(), user2.save()])
                    .then(() => {
                        return adventure1.users().attach([user1, user2]);
                    })
                    .then(() => {
                        Adventure.fetchAll({ withRelated: "users" }).then(advs => {
                            advs.forEach(a => {
                                console.log(a.toJSON());
                            });
                        });
                    });
            })
            .catch(err => {
                console.error(err);
            });
    }
}
