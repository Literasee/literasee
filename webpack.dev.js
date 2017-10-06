const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const oauthBase = 'https://github.com/login/oauth/authorize?client_id='
const { GH_CLIENT_ID } = process.env

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      GH_CLIENT_ID: JSON.stringify(GH_CLIENT_ID),
      OAUTH_URL: JSON.stringify(`${oauthBase}${GH_CLIENT_ID}&scope=repo`),
    }),
  ],
})
