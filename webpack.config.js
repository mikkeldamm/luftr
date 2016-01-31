var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var toString  = Function.prototype.call.bind(Object.prototype.toString);
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


var webpackMerge = require('webpack-merge');
var path = require('path');

var common = {
  resolve: {
    extensions: ['','.ts','.js','.json','.html']
  },
  module: {
    loaders: [
        {
            test: /\.ts$/,
            loader: 'ts-loader',
            query: {
                'ignoreDiagnostics': [
                    2403, // 2403 -> Subsequent variable declarations
                    2300, // 2300 Duplicate identifier
                    2374, // 2374 -> Duplicate number index signature
                    2375  // 2375 -> Duplicate string index signature
                ]
            },
            exclude: [ /\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/ ]
        },
        { test: /\.json$/,  loader: 'json-loader' },
        { test: /\.html$/,  loader: 'raw-loader' }
    ]
  }
};

var client = {
  target: 'web',
  entry: './src/bootstrap',
  output: {
    path: __dirname + '/dist/client'
  }
};

var server = {
  target: 'node',
  entry: './src/server',
  output: {
    path: __dirname + '/dist/server'
  },
  externals: function checkNodeImport(context, request, cb) {
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      cb(null, 'commonjs ' + request); return;
    }
    cb();
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

var defaults = {
  context: __dirname,
  resolve: {
    root: __dirname + '/src'
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'bundle.js'
  }
}

module.exports = [
  webpackMerge({}, defaults, common, client),
  webpackMerge({}, defaults, common, server)
]



/*
module.exports = {
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,

  entry: {
    'vendor': './src/vendor.ts',
    'app': './src/bootstrap.ts' // our angular app
  },

  // Config for our build files
  output: {
    path: root('scripts'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    // ensure loader extensions match
    extensions: ['','.ts','.js','.json','.html']
  },

  module: {
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [ /\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/ ]
      },
      { test: /\.json$/,  loader: 'json-loader' },
      { test: /\.html$/,  loader: 'raw-loader' },
    ],
    noParse: [
     /zone\.js\/dist\/.+/,
     /reflect-metadata/,
     /es(6|7)-.+/,
    ]
  },

  plugins: [
    new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor'] })
  ],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false
  },
  // our Webpack Development Server config
  devServer: {
    historyApiFallback: true,
    contentBase: 'src/public',
    publicPath: '/scripts'
  }

};

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = sliceArgs(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
*/