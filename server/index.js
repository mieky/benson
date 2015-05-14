"use strict";

import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import createTestData from "./testdata";

let auth = require("./auth");
let app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

auth.initialize(app);

require("./routes").initialize(app);
app.use("/", express.static("app"));

createTestData()
    .then(() => {
        let server = app.listen(8080, () => {
            let { address, port } = server.address();
            console.log("Server listening at http://%s:%s", address, port);
        });
    });
