import React from "react";
import Header from "./header.jsx!";
import Messages from "./messages.jsx!";

export default class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Messages pollInterval="10000" />
            </div>
        );
    }
}
