import path from "path";
import bs58 from "bs58";
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
                    table.integer("user_id").references("user.id");
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

    function createUser(options) {
        var user = new User({
            "first_name": options["first_name"],
            "last_name": options["last_name"],
            "image_url": `https://graph.facebook.com/v2.3/${options["facebook_id"]}/picture?type=square`
        });

        return user.save()
            .then(savedUser => {
                return options.adventure.users().attach(user);
            })
            .then(jotain => {
                let tokenText = bs58.encode(new Buffer(`${user.id};;`));
                return new Token({
                    text: tokenText,
                    "user_id": user.id
                }).save();
            });
    }

    if (options.createTestData) {
        return Promise.all(tables)
            .then(() => {
                console.log("Creating test data...");

                var adventure1 = new Adventure({
                    name: "A grand voyage"
                });

                adventure1.save()
                    .then(() => {
                        return Promise.all([
                            createUser({
                                "first_name": "Frank",
                                "last_name": "Ballston",
                                "facebook_id": 6,
                                "adventure": adventure1
                            }),
                            createUser({
                                "first_name": "Demis",
                                "last_name": "Röyssös",
                                "facebook_id": 8,
                                "adventure": adventure1
                            })
                        ]);
                    })
                    .then(() => {
                        Adventure.fetchAll({ withRelated: ["users"] }).then(advs => {
                            advs.forEach(a => {
                                console.log(a.toJSON());
                                // Just a token printing test
                                new User({ id: a.toJSON().users[0].id }).fetch({ withRelated: "tokens" }).then(u => {
                                    console.log(u.toJSON());
                                });
                            });
                        });
                    });

            })
            .catch(err => {
                console.error(err);
            });
    }
}
