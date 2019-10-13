const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'app', 'javascript', 'packs'),
  entry: {
    application: './application.js',
    applicationStyle: './css/application.scss',
  },
  output: {
    path: path.resolve(__dirname, 'public', 'packs'),
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
            }
          },
          {
            loader:'sass-loader',
          }
        ],
      },
    ],
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
