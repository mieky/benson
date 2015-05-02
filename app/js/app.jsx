import React from "react";
import Router from "react-router";

import Header from "./header.jsx!";
import Messages from "./messages.jsx!";

let DefaultRoute = Router.DefaultRoute;
let RouteHandler = Router.RouteHandler;
let Route = Router.Route;

class App extends React.Component {
    render() {
        return (
            <div className="main">
                <Header />
                <RouteHandler />
            </div>
        );
    }
}

let routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="messages" handler={Messages} />
        <DefaultRoute handler={Messages} />
    </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler />, document.body);
});
