import passport from "passport";
import authConfig from "../auth-config.json";

let service = require("./service");
let FacebookStrategy = require("passport-facebook").Strategy;

export function initialize(server) {
    // Serialize the user for the session
    passport.serializeUser(function(user, done) {
        let serializedUser = user.get({ plain: true });
        done(null, serializedUser);
    });

    // Deserialize the user from the session
    passport.deserializeUser(function(id, done) {
        // TODO: do something like User.findById() here
        console.log("deserializeUser", id);
        done(null, id);
    });

    // Facebook will send back the token and profile
    function onAuth(token, refreshToken, profile, done) {
        service.findOrCreateFacebookUser(profile)
            .then(user => {
                console.log("Connected as user", user.id);
                done(null, user);
            })
            .catch(err => {
                console.log("Couldn't find or create user", err);
                done(err);
            });
    }

    passport.use(new FacebookStrategy(authConfig, onAuth));

    server.get("/auth/facebook",
        passport.authenticate("facebook", {
            scope: "email"
        }));

    server.get("/auth/facebook/callback",
        passport.authenticate("facebook", { failureRedirect: "/login" }),
        (req, res) => {
            // Successful authentication:
            console.log("TODO: create custom auth token for client");
            res.redirect("/#/token?token=keyboard_cat");
        });
}
