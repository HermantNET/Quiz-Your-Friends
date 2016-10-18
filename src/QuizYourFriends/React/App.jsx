var React = require('react');
var ReactDOM = require('react-dom');
var QuizGameContainer = require('./Containers/QuizGameContainer.jsx');
// Node-Sass doesn't work at school development machine.
var css = require('../scss/site.scss');

ReactDOM.render(<QuizGameContainer />, document.getElementById('app'));