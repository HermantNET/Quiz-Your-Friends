var React = require('react');
var ReactDOM = require('react-dom');

var MessageList = React.createClass({
    componentDidUpdate: function () {
        var node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    },
    render: function () {
        return (
            <ul className="MessageList">
                {this.props.messages.map((msg, index) => {
                    return <li key={'msg' + index }>{msg}</li>
                })}
            </ul>
        );
    }
})

module.exports = MessageList;