/// <binding />
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './React/App.jsx',
    output: {
        path: './wwwroot/scripts',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};