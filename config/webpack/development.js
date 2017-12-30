const environment = require("./environment")

const config = environment.toWebpackConfig()

// Show build stats
// https://webpack.js.org/configuration/stats/
config.devServer.stats = {
  errorDetails: true,
  timings: true
}

// Skip SSR for development
delete config.entry.server_rendering

module.exports = config
