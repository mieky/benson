"use strict";

import restify from "restify";
import createTestData from "./testdata";

let server = restify.createServer();
server.use(restify.bodyParser());

require("./auth").initialize(server);
require("./api").initialize(server);

server.get(/\/?.*/, restify.serveStatic({
    directory: "./app"
}));

createTestData()
    .then(() => {
        server.listen(8080, () =>
            console.log("%s listening at %s", server.name, server.url)
        );
    });
