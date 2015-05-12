import React from "react";
import Router from "react-router";

let { Link } = Router;

export default class Header extends React.Component {
    render() {
        let loggedIn = this.props.auth.loggedIn();
        return (
            <header className="site-header">
                <h1 className="site-header__title">benson</h1>
                <div className="site-header__tagline"></div>
                <div className="site-header__status">
                    {loggedIn ? (<Link to="logout">Log out</Link>) : ""}
                </div>
            </header>
        );
    }
}
