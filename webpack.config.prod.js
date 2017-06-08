const { join } = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './routes/edit/app'
  ],
  output: {
    path: join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    modules: [
      join(__dirname, 'routes', 'edit'),
      join(__dirname, 'routes', 'edit', 'screens', 'App', 'shared'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      GH_CLIENT_ID: JSON.stringify(process.env.GH_CLIENT_ID)
    })
  ],
  node: {fs:'empty'},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        include: join(__dirname, 'routes', 'edit')
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
              localIdentName: '[name]_[local]__[hash:base64:5]'
            }
          },
          'stylus-loader'
        ],
        include: join(__dirname, 'routes', 'edit')
      },
      {
        test: /\.idl$/,
        use: 'raw-loader'
      }
    ]
  }
};
