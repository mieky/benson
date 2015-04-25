"use strict";

let service = require("./service");

function jsonOr404(req, res, next) {
    return function(data) {
        if (!data) {
            res.send(404);
        } else {
            res.json(data);
        }
        return next();
    };
}

export function initialize(server) {
    server.get("/adventure/:id", (req, res, next) => {
        service.getAdventure(req.params.id)
            .then(jsonOr404(req, res, next));
    });

    server.get("/adventure/:id/messages", (req, res, next) => {
        service.getMessages(req.params.id)
            .then(jsonOr404(req, res, next));
    });

    server.get("/user/:id", (req, res, next) => {
        service.getUser(req.params.id)
            .then(jsonOr404(req, res, next));
    });

    server.get("/user", (req, res, next) => {
        service.getUsersAsync()
            .then(jsonOr404(req, res, next));
    });
};
