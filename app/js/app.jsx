/** @jsx React.DOM */
import React from "react"
import Router from "react-router"
import Header from "./header.jsx!"
import Content from "./content.jsx!"

React.render(
    <div>
        <Header />
        <Content />
    </div>,
    document.getElementById("main")
)
