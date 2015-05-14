import React from "react";
import Router from "react-router";

import Header from "./header.jsx!";
import Messages from "./messages.jsx!";

let { Route, RouteHandler, DefaultRoute } = Router;

var auth = {
    login: () => {
        console.log("auth.login");
        console.log("auth: this = ", this);
    },

    getToken: () => {
        return localStorage.token;
    },

    setToken: token => {
        localStorage.token = token;
    },

    logout: () => {
        delete localStorage.token;
        console.log("auth: this = ", this);
    },

    loggedIn: () => {
        return !!localStorage.token;
    },

    onChange: () => {}
};

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                Howdy, stranger! Would you like to <a href="/auth/facebook">login with Facebook?</a>
            </div>
        );
    }
}

class Logout extends React.Component {
    componentDidMount() {
        auth.logout();
    }

    render() {
        this.context.router.transitionTo("/");
        return null;
    }
}

Logout.contextTypes = {
    router: React.PropTypes.func
};

class App extends React.Component {
    render() {
        return (
            <div className="main">
                <Header auth={auth} />
                <RouteHandler />
            </div>
        );
    }
}

class Token extends React.Component {
    static willTransitionTo(transition) {
        console.log("Memorizing auth token");
        let token = transition.path.split("token=")[1];
        auth.setToken(token);

        transition.redirect("/messages");
    }
    render() {
        return null;
    }
}

var requireAuth = (Component) => {
    return class Authenticated extends React.Component {
        static willTransitionTo(transition) {
            if (!auth.loggedIn()) {
                transition.redirect("/");
            }
        }
        constructor(props) {
            super(props);
            this.props.auth = auth;
        }
        render() {
            return <Component {...this.props} />;
        }
    };
};

let routes = (
    <Route name="app" path="/" handler={App}>
        <Route handler={Home} />
        <Route name="token" handler={Token} />
        <Route name="logout" handler={Logout} />
        <Route name="messages" handler={requireAuth(Messages)} />
        <DefaultRoute handler={requireAuth(Messages)} />
    </Route>
);

Router.run(routes, Router.HashLocation, Handler => {
    React.render(<Handler />, document.body);
});
