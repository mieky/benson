import React from "react";

class Message extends React.Component {
    render() {
        return (
            <div class="message">{this.props.text}</div>
        );
    }
}

export default class Messages extends React.Component {
    componentDidMount() {
        console.log("componentDidMount: Messages");
    }
    getInitialState() {
        return { data: [] };
    }
    render() {
        return (
            <div class="messages">
                <Message text="I have no idea what I'm doing!" />
            </div>
        );
    }
}
