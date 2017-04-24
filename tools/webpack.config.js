const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      './src/client/index.jsx',
    ],
    vendor: [
      'history',
      'jss',
      'jss-theme-reactor',
      'material-ui',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'react-tap-event-plugin',
      'redux',
      'redux-logger',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    modules: [
      '../src',
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader!postcss-loader!sass-loader'
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=static/[name].[hash].[ext]'
      },
      {
        test: /\.woff$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=static/[name].[hash].[ext]'
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=static/[name].[hash].[ext]'
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=static/[name].[hash].[ext]'
      },
      {
        test: /\.eot$/,
        loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=static/[name].[hash].[ext]'
      },
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['../dist'], {
      verbose: true
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/assets/index.html',
      favicon: './src/assets/favicon-32x32.ico'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: 'Infinity'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.IP_ADDRESS': JSON.stringify(process.env.IP_ADDRESS || 'localhost'),
      'process.env.HTTP_PORT': JSON.stringify(process.env.HTTP_PORT || '8081'),
      'process.env.SOCKET_ADDRESS': JSON.stringify(process.env.SOCKET_ADDRESS || 'ws://localhost:8081'),
    }),
  ],
  // // https://webpack.github.io/docs/webpack-dev-server.html
  // devServer: {
  //   port: process.env.HTTP_PORT || 8080,
  //   host: 'localhost',
  //   historyApiFallback: true,
  //   watchOptions: {
  //     aggregateTimeout: 300,
  //     poll: 1000
  //   },
  // },
};
