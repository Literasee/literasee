const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const oauthBase = 'https://github.com/login/oauth/authorize?client_id='
const { GH_CLIENT_ID } = process.env

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      GH_CLIENT_ID: JSON.stringify(GH_CLIENT_ID),
      OAUTH_URL: JSON.stringify(`${oauthBase}${GH_CLIENT_ID}&scope=repo`),
    }),
  ],
})
