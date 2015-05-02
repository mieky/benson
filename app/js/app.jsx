import React from "react";
import Router from "react-router";

import Header from "./header.jsx!";
import Messages from "./messages.jsx!";

let DefaultRoute = Router.DefaultRoute;
let RouteHandler = Router.RouteHandler;
let Link = Router.Link;
let Route = Router.Route;

function pretendRequest(email, pass, callback) {
    setTimeout(() => {
        if (email === "joe@example.com" && pass === "password1") {
            callback({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            });
        } else {
            callback({ authenticated: false });
        }
    }, 0);
}

var auth = {
    login(email, pass, callback) {
        callback = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (callback) {
                callback(true);
            }
            this.onChange(true);
            return;
        }
        pretendRequest(email, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (callback) {
                    callback(true);
                }
                this.onChange(true);
            } else {
                if (callback) {
                    callback(false);
                }
                this.onChange(false);
            }
        });
    },

    getToken: () => {
        return localStorage.token;
    },

    logout: callback => {
        delete localStorage.token;
        if (callback) {
            callback();
        }
        this.onChange(false);
    },

    loggedIn: () => {
        return !!localStorage.token;
    },

    onChange: () => {}
};

class Login extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        var { router } = this.context;
        var nextPath = router.getCurrentQuery().nextPath;
        var email = this.refs.email.getDOMNode().value;
        var pass = this.refs.pass.getDOMNode().value;

        auth.login(email, pass, (loggedIn) => {
            if (!loggedIn) {
                return this.setState({ error: true });
            }
            if (nextPath) {
                router.replaceWith(nextPath);
            } else {
                router.replaceWith("/");
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
                <label><input ref="pass" placeholder="password"/></label> (hint: password1)<br/>
                <button type="submit">login</button>
                {this.state.error && (
                    <p>Bad login information</p>
                )}
            </form>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.func
};

class Logout extends React.Component {
    componentDidMount () {
        auth.logout();
    }

    render () {
        return <p>You are now logged out</p>;
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: auth.loggedIn()
        };
    }

    setStateOnAuth (loggedIn) {
        this.setState({
            loggedIn: loggedIn
        });
    }

    componentWillMount () {
        auth.onChange = this.setStateOnAuth.bind(this);
        auth.login();
    }

    render() {
        let token = auth.getToken();
        return (
            <div className="main">
                <div>
                    {this.state.loggedIn ? (
                      <Link to="logout">Log out</Link>
                    ) : (
                      <Link to="login">Sign in</Link>
                    )}
                </div>
                <Header />
                <RouteHandler />
                <p>Token? {token}</p>
            </div>
        );
    }
}

var requireAuth = (Component) => {
    return class Authenticated extends React.Component {
        static willTransitionTo(transition) {
            if (!auth.loggedIn()) {
                transition.redirect("/login", {}, {
                    "nextPath": transition.path
                });
            }
        }
        render() {
            return <Component {...this.props} />;
        }
    };
};

let MessagesWithAuth = requireAuth(Messages);

let routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="login" handler={Login} />
        <Route name="logout" handler={Logout} />
        <Route name="messages" handler={MessagesWithAuth} />
        <DefaultRoute handler={MessagesWithAuth} />
    </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler />, document.body);
});
