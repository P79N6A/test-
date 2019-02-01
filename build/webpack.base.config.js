const path = require('path');
const config = require('./config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin  = require('webpack-cleanup-plugin');

const webpackBaseConfig = {
  entry: config.entry,
  output: {
    path: config.distRoot,
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx$|\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { 'modules': false }],
              'react',
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          limit: 1024, // size <= 1kib
          outputPath: 'images',
        },
      },
    ],
  },
  externals: {
    dfp: 'dfp',
  },
  plugins: [
    new WebpackCleanupPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../asserts/'),
    //     to: path.resolve(__dirname, '../dist/images'),
    //     // ignore: ['.*']
    //   },
    // ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/pages/*.html'),
        to: path.resolve(__dirname, '../dist/[name].html'),
      },
    ]),
  ],
};

module.exports = webpackBaseConfig;
