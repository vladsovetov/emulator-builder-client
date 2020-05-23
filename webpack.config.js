const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.[hash].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [{
                module: 'react',
                entry: process.env.MODE === 'development' ? 'umd/react.development.js' : 'umd/react.production.min.js',
                global: 'React'
            }, {
                module: 'react-dom',
                entry: process.env.MODE === 'development' ? 'umd/react-dom.development.js' : 'umd/react-dom.production.min.js',
                global: 'ReactDOM'
            }]
        }),
        new CleanWebpackPlugin()
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};