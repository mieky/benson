import React from "react";
import MessageForm from "./messageform.jsx!";

class Message extends React.Component {
    render() {
        return (
            <div className="message">
                <div className="message__author-image"></div>
                <div className="message__author-name">{this.props.author}</div>
                <div className="message__text">{this.props.children.toString()}</div>
            </div>
        );
    }
}

class MessagesList extends React.Component {
    render() {
        let messageNodes = this.props.data.map(msg => {
            let author = `User ${msg.UserId}`;
            return (
                <Message author={author}>{msg.text}</Message>
            );
        });
        return (
            <div className="messages-list">
                {messageNodes}
            </div>
        );
    }
}

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.loadMessages = this.loadMessages.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }
    componentDidMount() {
        this.loadMessages();
        setInterval(this.loadMessages, this.props.pollInterval);
    }
    loadMessages() {
        fetch("/api/adventure/1/messages")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json
                });
            });
    }
    handleMessageSubmit(msg) {
        fetch("/api/adventure/1/message", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(msg)
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: [json].concat(this.state.data)
                });
            });
    }
    render() {
        return (
            <div className="messages">
                <MessagesList data={this.state.data} />
                <MessageForm onSubmit={this.handleMessageSubmit} />
            </div>
        );
    }
}
