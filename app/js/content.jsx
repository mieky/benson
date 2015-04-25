import React from "react";
import Messages from "./messages.jsx!";

export default class Content extends React.Component {
    render() {
        return (
            <section className="content">
                <Messages pollInterval="10000" />
            </section>
        );
    }
}
