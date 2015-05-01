"use strict";

import express from "express";
import bodyParser from "body-parser";

import createTestData from "./testdata";

let server = express();

server.use(bodyParser.json());
server.use("/app", express.static("app"));

// require("./auth").initialize(server);
require("./api").initialize(server);

createTestData()
    .then(() => {
        server.listen(8080, () =>
            console.log("%s listening at %s", server.name, server.url)
        );
    });
