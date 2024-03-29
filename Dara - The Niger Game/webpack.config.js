'use strict';
const path = require('path');
module.exports = {
    devServer: {
        port: 8080,
        compress: true,
        contentBase: [
            path.join(__dirname, 'dist'),
            path.join(__dirname, 'wwwroot')
        ]
    },
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/
            }
        ]
    }
};