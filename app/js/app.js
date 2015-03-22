import React from "react"
import Router from "react-router"
import Header from "./header.jsx!"
import Content from "./content.jsx!"

React.render(
    React.createElement("div", null, Header(), Content()),
    document.getElementById("main")
)
