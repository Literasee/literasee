var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './routes/edit/app'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    modulesDirectories: ['shared', 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      GH_CLIENT_ID: JSON.stringify(process.env.GH_CLIENT_ID)
    })
  ],
  node: {fs:'empty'},
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
        ],
        include: path.join(__dirname, 'routes', 'edit')
      },
      {
        test: /\.styl$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]',
          'stylus'
        ]
      },
      {
        test: /\.md$/,
        loader: 'raw'
      }
    ]
  }
};
