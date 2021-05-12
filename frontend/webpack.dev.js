const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
      host: '0.0.0.0',
      port: 3000,
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      compress: true,
      disableHostCheck: true, 
  }
});
