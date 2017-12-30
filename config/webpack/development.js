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

// Disable Sass source maps
const sassRule = config.module.rules.find(rule => rule.test.test("file.sass"))
const sassLoader = sassRule.use.find(loader => loader.loader === "sass-loader")
sassLoader.options.sourceMap = false
const postcssLoader = sassRule.use.find(
  loader => loader.loader === "postcss-loader"
)
postcssLoader.options.sourceMap = false

module.exports = config
