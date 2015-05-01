import passport from "passport";
import authConfig from "../auth-config.json";

let FacebookStrategy = require("passport-facebook").Strategy;

export function initialize(server) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("serializeUser", user);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("deserializeUser", id);
        done(null, id);
        // User.findById(id, function(err, user) {
        //     done(err, user);
        // });
    });

    // Facebook will send back the token and profile
    function onAuth(token, refreshToken, profile, done) {
        console.log("TODO: find or create user with Facebook ID", profile.id);
        console.log(profile);
        done(null, profile);
    }

    passport.use(new FacebookStrategy(authConfig, onAuth));

    server.get("/auth/facebook", passport.authenticate("facebook"));

    server.get("/auth/facebook/callback",
        passport.authenticate("facebook", { failureRedirect: "/login" }),
        function(req, res) {
            // Successful authentication, redirect home.
            console.log("Facebook auth successful");
            res.redirect("/");
        });
}
