const { join } = require('path')
const webpack = require('webpack')

const editRoute = join(__dirname, 'routes', 'edit')

module.exports = {
  entry: join(editRoute, 'app'),
  output: {
    path: join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  resolve: {
    modules: [editRoute, 'node_modules'],
  },
  node: { fs: 'empty' },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: editRoute,
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
          },
          'stylus-loader',
        ],
        include: editRoute,
      },
      {
        test: /(\.idl$|\.css$)/,
        use: 'raw-loader',
      },
    ],
  },
}
