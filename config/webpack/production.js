const webpack = require("webpack")

const environment = require("./environment")

const config = environment.toWebpackConfig()

// Set production environment variables
config.plugins.push(
  new webpack.EnvironmentPlugin({
    GITHUB_CLIENT_ID: process.env.FORKSINTHEROAD_GITHUB_PROD_CLIENT_ID
  })
)

module.exports = config
