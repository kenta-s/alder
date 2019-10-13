const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'app', 'javascript', 'packs'),
  entry: {
    application: './application.js',
  },
  output: {
    path: path.resolve(__dirname, 'public', 'packs'),
    filename: '[name]-[hash].js'
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/packs/',
      writeToFileEmit: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ]
};
