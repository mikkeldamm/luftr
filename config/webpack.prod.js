const webpack = require('webpack');
var path = require('path');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;


const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig.metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
});

module.exports = [
    webpackMerge(commonConfig, {
        entry: {
            'polyfills': './src/polyfills.ts',
            'vendor': './src/vendor.ts',
            'main': './src/main.browser.ts'
        },
        debug: false,
        devtool: 'source-map',
        output: {
            path: helpers.root('dist'),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js'
        },
        plugins: [
            new ForkCheckerPlugin(),
            new webpack.optimize.OccurenceOrderPlugin(true),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
            new CopyWebpackPlugin([{
                from: 'src/assets',
                to: 'assets'
            }]),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency'
            }),
            new WebpackMd5Hash(),
            new DedupePlugin(),
            new DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                    'HMR': METADATA.HMR,
                }
            }),
            new UglifyJsPlugin({
                beautify: false, //prod
                mangle: {
                    screw_ie8 : true,
                    keep_fnames: true
                }, //prod
                compress: {
                    screw_ie8: true
                }, //prod
                comments: false //prod
            }),
            new CompressionPlugin({
                regExp: /\.css$|\.html$|\.js$|\.map$/,
                threshold: 2 * 1024
            })
        ],
        tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
        },
        htmlLoader: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [
                [/#/, /(?:)/],
                [/\*/, /(?:)/],
                [/\[?\(?/, /(?:)/]
            ],
            customAttrAssign: [/\)?\]?=/]
        },
        node: {
            global: 'window',
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    }),
    webpackMerge(commonConfig, {
        context: __dirname,
        target: 'node',
        entry: {
            'main': '../src/server.ts'
        },
        externals: checkNodeImport,
        debug: false,
        output: {
            path: helpers.root('dist'),
            publicPath: path.resolve(__dirname),
            filename: 'index.js',
            libraryTarget: 'commonjs2'
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(true)
        ],
        node: {
            global: true,
            __dirname: true,
            __filename: true,
            process: true,
            Buffer: true
        }
    })
];

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
