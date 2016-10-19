var React = require('react');
var ReactDOM = require('react-dom');
var css = require('../../scss/MessageList.scss');

var MessageList = React.createClass({
    componentDidUpdate: function () {
        var node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    },
    render: function () {
        return (
            <div className="MessageList">
                <ul>
                    {this.props.messages.map((msg, index) => {
                    return <li key={'msg' + index }>{msg}</li>
                    })}
                </ul>
            </div>
            
        );
    }
})

module.exports = MessageList;