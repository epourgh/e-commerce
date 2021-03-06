const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "index.tsx") },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i, // if both url-loader & file loader used, image converts to blank square
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/', // copying
                        publicPath: 'images/'  // keep correct reference
                    }
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    // Translates CSS into CommonJS
                    { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    // Compiles Sass to CSS
                    { loader: "sass-loader" },
                ]
            },
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                exclude: /node_modules/,
                use: 'babel-loader'
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/static", "index.html")
        })
    ]
};