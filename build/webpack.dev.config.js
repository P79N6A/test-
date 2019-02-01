const webpack = require('webpack');
const Merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const themeConfig = require('./theme.config');

const WebpackDevConfig = Merge.smart(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              modifyVars: themeConfig,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
});

module.exports = WebpackDevConfig;
