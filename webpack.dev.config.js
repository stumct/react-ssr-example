const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require("fs");

require.extensions['.sass'] = () => { return; }; require.extensions['.scss'] = () => { return; }; require.extensions['.css'] = () => { return; };

module.exports = {
    entry: {
        bundle: ['babel-polyfill',__dirname + '/src/index.jsx',]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        publicPath: '/dist'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
            { test: /\.(png|jpg|gif)?$/, loader: 'url?prefix=images/&name=[path][name].[ext]&limit=8096' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader!autoprefixer-loader") },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!autoprefixer-loader!sass') },
            { test: /\.sass$/, loader: ExtractTextPlugin.extract('css!autoprefixer-loader!sass') },
            { test: /\.woff(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
            { test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
            { test: /\.ttf(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
            { test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' }

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin("css/styles.css", {allChunks: true}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
