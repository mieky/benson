"use strict";

let restify = require("restify");
let testdata = require("./testdata");

let server = restify.createServer();
require("./api").initialize(server);

server.get(/\/?.*/, restify.serveStatic({
    directory: "./app"
}));

testdata.createTestData()
    .then(() => {
        server.listen(8080, () =>
            console.log("%s listening at %s", server.name, server.url)
        );
    });
