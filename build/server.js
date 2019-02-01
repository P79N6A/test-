const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('./webpack.dev.config');

const options = {
  contentBase: path.resolve(__dirname, '../dist'),
  publicPath: '/',
  hot: true,
  watchContentBase: true,
  port: 3000,
  host: 'localhost',
  stats: {
    colors: true,
  },
};

WebpackDevServer.addDevServerEntrypoints(webpackDevConfig, options);
const compiler = Webpack(webpackDevConfig);
const server = new WebpackDevServer(compiler, options);

server.listen(3000, 'localhost', () => {
  console.log('Starting server on http://localhost:3000');
});
