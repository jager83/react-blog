
var React = require('react');
var ReactDOM = require('react-dom');

var HelloMessage = React.createClass({
  displayName: "HelloMessage",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
  }
});


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(HelloMessage, { name: "John" }), document.getElementById('root'));
});
