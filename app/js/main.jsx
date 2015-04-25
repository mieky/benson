import React from "react";
import Header from "./header.jsx!";
import Content from "./content.jsx!";

export default class Main extends React.Component {
    render() {
        return (
            <div class="main">
                <Header />
                <Content />
            </div>
        );
    }
}
