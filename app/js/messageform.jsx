import React from "react";

export default class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        // console.log(React.findDOMNode(this.refs.text));
    }
    handleSubmit(e) {
        e.preventDefault();

        var text = React.findDOMNode(this.refs.text).value.trim();
        if (!text) {
            return;
        }

        this.props.onSubmit({
            userId: 1,
            text: text
        });
        React.findDOMNode(this.refs.text).value = "";
    }
    render() {
        return (
            <form className="message-form" onSubmit={this.handleSubmit}>
                <input className="message-form__text" type="text" ref="text"
                    autoFocus />
                <input className="message-form__submit" type="submit" value="Send" />
            </form>
        );
    }
}
