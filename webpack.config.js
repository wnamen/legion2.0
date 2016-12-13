var debug = process.env.NODE_ENV !== "production";

var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/index.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      }
    ]
  },
  // output: {
  //   path: __dirname + "/src/",
  //   filename: "main.min.js"
  // },
  output: {
    path: path.resolve('./src/bundles/'),
    filename: "[name]-[hash].js"
  },
  plugins: [
    // new ExtractTextPlugin("main.min.css"),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new BundleTracker({filename: './webpack-stats.json'}),
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  }
};
