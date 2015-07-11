"use strict";

let service = require("./service");

function jsonOr404(req, res, next) {
    return function(data) {
        if (!data) {
            res.status(404);
        } else {
            res.json(data);
        }
        return next();
    };
}

export function initialize(server) {
    // Get messages for adventure
    server.get("/api/adventure/:id/messages", (req, res, next) => {
        service.getMessages(req.query.token, req.params.id)
            .then(jsonOr404(req, res, next));
    });

    // Post a message to Adventure
    server.post("/api/adventure/:id/message", (req, res, next) => {
        service.postMessage(req.query.token, req.params.id, req.body)
            .then(jsonOr404(req, res, next))
            .catch(err => {
                console.log(err.name);
                console.log("Error posting message", err);
                res.status(400).json(err);
            });
    });

    // Get adventure
    server.get("/api/adventure/:id", (req, res, next) => {
        service.getAdventure(req.params.id)
            .then(jsonOr404(req, res, next));
    });

    // Get user info
    server.get("/api/user/:id", (req, res, next) => {
        service.getUser(req.params.id)
            .then(jsonOr404(req, res, next));
    });

    // List users
    server.get("/api/user", (req, res, next) => {
        service.getUsersAsync()
            .then(jsonOr404(req, res, next));
    });

    /**
     *  DEBUGGING BITS
     */
    server.post("/api/finduser", (req, res, next) => {
        service.getUserWhere(req.body)
            .then(jsonOr404(req, res, next));
    });

    server.get("/api/checktoken", (req, res, next) => {
        service.isTokenValidAsync(req.query.token)
            .then(jsonOr404(req, res, next))
            .catch(err => {
                console.log(err.name);
                res.status(401).json(err);
            });
    });

    server.get("/api/tokens", (req, res, next) => {
        service.getTokens()
            .then(jsonOr404(req, res, next));

    });
}
