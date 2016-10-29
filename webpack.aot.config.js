'use strict';
let path = require('path');
let webpack = require('webpack');
let ngtools = require('@ngtools/webpack');

// TIP: if compilation fails try to run ngc only, then tsc only (in that order) - it's possible that the problem
//      is in ngc or tsc. Webpack's autoPlugin doesn't show real errors (fixed ts libs and it worked)

module.exports = {
    entry: {
        'main.aot': './src/main.aot.ts',
    },

    output: {
        path: './dist',
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript?tsconfig=tsconfig.json',
                    'angular2-template'
                ]
            },
            {
                test: /\.html$/,
                use: 'raw'
            }
        ]
    },

    plugins: [
        // NOTE: possibly this should replace ngc (use it internally?) - build works without it
        //       but there's cannot find ngfactories errors when using this without ngc (soemthing wrong with paths possibly)
        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig.aot.json',
            baseDir: path.resolve(__dirname, 'src'),
            entryModule: path.join(__dirname, 'src', 'app', 'app.module') + '#AppModule'
        }),
        new webpack.ProgressPlugin(),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(process.cwd(), 'src')
        )
    ],

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.ts', '.js']
    },

    devtool: 'source-map'
};