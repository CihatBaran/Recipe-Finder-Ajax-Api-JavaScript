const path = require('path'); //Build in node module
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //This is the point it starts bundling
    entry: ["babel-polyfill", './src/js/index.js'],
    //Where to save or bundle file
    output: {
        path: path.resolve(__dirname, 'dist'), // this should be absolute path top var creation for this
        filename: 'js/bundle.js' //standart name bundle.js for webpack output.
    },
    //mode: 'development', //this is development mmode easiest mode to save time and storage
    devServer: {
        contentBase: './dist',
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/, // regular expression
                exclude: /node_modules/, //we don't want inside node_modules to be converted.
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }

};
