const environment = require("./environment")

const config = environment.toWebpackConfig()

// https://webpack.js.org/configuration/stats/
config.devServer.stats = {
  errorDetails: true,
  timings: true
}

module.exports = config
