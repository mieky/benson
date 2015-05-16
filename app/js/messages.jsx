import React from "react";
import MessageForm from "./messageform.jsx!";

class Message extends React.Component {
    render() {
        return (
            <div className="message">
                <div className="message__author-image"></div>
                <div className="message__content">
                    <div className="message__author-name">{this.props.author}</div>
                    <div className="message__text">{this.props.children.toString()}</div>
                </div>
            </div>
        );
    }
}

class MessagesList extends React.Component {
    componentDidUpdate() {
        // Scroll to bottom of list
        let listElement = React.findDOMNode(this.refs.list);
        listElement.scrollTop = listElement.scrollHeight;
    }
    render() {
        let messageNodes = this.props.data.reverse().map(msg => {
            let author = `${msg.User.firstName} ${msg.User.lastName[0]}.`;
            return (
                <Message author={author}>{msg.text}</Message>
            );
        });
        return (
            <div className="messages-list" ref="list">
                {messageNodes}
            </div>
        );
    }
}

export default class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.DEFAULT_POLL_INTERVAL = 10000;
        this.state = {
            data: []
        };
        this.loadMessages = this.loadMessages.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }

    componentDidMount() {
        this.loadMessages();
        setInterval(this.loadMessages,
            this.props.pollInterval || this.DEFAULT_POLL_INTERVAL);
    }

    loadMessages() {
        let token = this.props.auth.getToken();
        fetch(`/api/adventure/1/messages?token=${token}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json
                });
            });
    }

    handleMessageSubmit(msg) {
        let token = this.props.auth.getToken();
        fetch(`/api/adventure/1/message?token=${token}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(msg)
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: [json].concat(this.state.data.reverse())
                });
            });
    }

    render() {
        return (
            <div className="messages-container">
                <MessagesList data={this.state.data} />
                <MessageForm onSubmit={this.handleMessageSubmit} />
            </div>
        );
    }
}
