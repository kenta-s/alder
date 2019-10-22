const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
  context: path.resolve(__dirname, 'app', 'javascript', 'packs'),
  output: {
    path: path.resolve(__dirname, 'public', 'packs'),
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: '/packs/images',
              emitFile: true,
            },
          },
        ]
      },
      {
        test: /\.(js)$/,
        loaders: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-0'],
        }
      },
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
}

const mainConfig = mode => {
  return Object.assign({}, config, {
    entry: {
      application: './application.js',
      applicationStyle: './css/application.scss',
      landingPage: './landingPage.js',
      landingPageStyle: './css/landing/landingPage.scss',
			task: './images/landing/task.png',
    },
  })
}

// const landingPageConfig = () => {
//   return Object.assign({}, config, {
//     entry: {
//       landingPage: './landingPage.js',
//       landingPageStyle: './css/landing/landingPage.scss',
//     },
//   })
// }

module.exports = (env, argv) => {
  const mode = argv.mode === 'production' ? 'production' : 'development'
  return [
    mainConfig(mode),
    // landingPageConfig(),
  ]
}
