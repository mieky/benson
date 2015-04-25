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
            data: [
                { text: "I'm a lumberjack and I'm okay" },
                { text: "I sleep all night and work all day" },
                { text: "I cut down trees, I skip and jump" },
                { text: "I like to press wild flowers" },
                { text: "I put on women's clothing" },
                { text: "And hang around in bars" }
            ]
        };
    }
    componentDidMount() {
        console.log("componentDidMount: Messages");
    }
    render() {
        return (
            <div className="messages">
                <MessagesList data={this.state.data} />
            </div>
        );
    }
}
