import passport from "passport";
import authConfig from "../auth-config.json";

let FacebookStrategy = require("passport-facebook").Strategy;

export function ensureAuthenticated(req, res, next) {
    console.log("Checking if authenticated...");
    if (req.isAuthenticated()) {
        console.log("Authenticated, continuing");
        return next();
    }
    console.log("Not authenticated, redirecting to auth");
    res.redirect("/auth/facebook");
}

export function initialize(server) {
    // Serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("serializeUser", user);
        done(null, user.id);
    });

    // Deserialize the user from the session
    passport.deserializeUser(function(id, done) {
        // TODO: do something like User.findById() here
        console.log("deserializeUser", id);
        done(null, id);
    });

    // Facebook will send back the token and profile
    function onAuth(token, refreshToken, profile, done) {
        console.log("TODO: find or create user with Facebook ID", profile.id);
        console.log(profile);
        done(null, profile);
    }

    passport.use(new FacebookStrategy(authConfig, onAuth));

    server.get("/auth/facebook",
        passport.authenticate("facebook", {
            scope: "email"
        }));

    server.get("/auth/facebook/callback",
        passport.authenticate("facebook", {
            successRedirect: "/index.html",
            failureRedirect: "/fail.html"
        }));
}
