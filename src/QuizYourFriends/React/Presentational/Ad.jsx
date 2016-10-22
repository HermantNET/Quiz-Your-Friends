var React = require('react');

var Ad = React.createClass({
    componentDidMount: function () {
        // Adsense code
        (adsbygoogle = window.adsbygoogle || []).push({});
    },

    render: function () {
        return (
            <ins className="adsbygoogle"
                 style={this.props.adStyle}
                 data-ad-client={this.props.adClient}
                 data-ad-slot={this.props.adSlot}>
            </ins>
        );
    }
});

module.exports = Ad;