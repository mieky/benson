import React from "react";

class Message extends React.Component {
    render() {
        return (
            <div className="message">
                {this.props.children.toString()}
            </div>
        );
    }
}

class MessagesList extends React.Component {
    render() {
        var messageNodes = this.props.data.map(msg => {
            return (
                <Message>{msg.text}</Message>
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
    }
    componentDidMount() {
        this.loadMessages();
    }
    loadMessages() {
        window.fetch("/api/adventure/1/messages")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json
                });
            });
    }
    render() {
        return (
            <div className="messages">
                <MessagesList data={this.state.data} />
            </div>
        );
    }
}
