const path = require('path');
const webpack = require('webpack');

const regex = /firebase\/(app|firestore)/;

module.exports = {
    mode: 'none',
    entry: {
        server: './server.ts',
        prerender: './prerender.ts'
    },
    target: 'node',
    resolve: {extensions: ['.js', '.ts']},
    optimization: {
        minimize: false
    },
    // this makes sure we include node_modules and other 3rd party libraries
    externals: [/node_modules/, function (context, request, callback) {

        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
            return callback(null, 'commonjs ' + request);
        }
        callback();
    }],
    output: {
        path: path.join(__dirname, `functions/dist`),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'},
            {
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
                parser: {system: true},
            },
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            // fixes WARNING Critical dependency: the request of a dependency is an expression
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(
            // fixes WARNING Critical dependency: the request of a dependency is an expression
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'),
            {}
        )
    ]
};
