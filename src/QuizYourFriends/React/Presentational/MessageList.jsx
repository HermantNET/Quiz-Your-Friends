var React = require('react');
var ReactDOM = require('react-dom');
var css = require('../../scss/MessageList.scss');

var MessageList = React.createClass({
    componentDidUpdate: function () {
        this.refs.msgList.scrollTop = this.refs.msgList.scrollHeight;
    },
    sendMessage: function(e) {
        e.preventDefault();
        this.props.sendMessage(this.refs.msg.value)
        this.refs.msg.value = "";
    },
    render: function () {
        return (
            <div className="Messages">
                <ul ref="msgList" className="MessageList">
                    {this.props.messages.map((msg, index) => {
                    return <li key={'msg' + index }>{msg}</li>
                    })}
                </ul>
                <form onSubmit={this.sendMessage}>
                    <input ref="msg" type="text" placeholder="Message" maxLength="140" minLength="1" required />
                    <input type="submit" value="Send" />
                </form>
            </div>
            
        );
    }
})

module.exports = MessageList;