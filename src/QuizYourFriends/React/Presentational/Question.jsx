var React = require('react');

var Question = React.createClass({
    render: function () {
        return (
        <div>
            <p style={{ maxWidth: '20rem', overflowWrap: 'break-word' }}>{this.props.question}</p>
            {this.props.answers.map((answer, index) =>
                <div className="Button" key={"answer"+index} onClick={this.props.submitAnswer}>
                    {answer}
                </div>
            )}
        </div>
    );
    }
})

module.exports = Question;