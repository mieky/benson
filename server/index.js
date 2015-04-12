"use strict";

let restify = require("restify");
let testdata = require("./testdata");
let service = require("./service");

let server = restify.createServer();

server.get("/user/:id", function(req, res, next) {
    service.getUser(req.params.id)
        .then(user => res.json(user))
        .then(next);
});

server.get("/user", function(req, res, next) {
    service.getUsersAsync()
        .then(users => res.json(users))
        .then(next);
});

testdata.createTestData()
    .then(() => {
        server.listen(8080, () =>
            console.log("%s listening at %s", server.name, server.url)
        );
    });
