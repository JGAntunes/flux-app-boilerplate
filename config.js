var config = {}

config.server = {
  port: process.env.FLUX_APP_PORT || 3000
}

config.client = {
  env: process.env.NODE_ENV || 'development',
  source: {
    path: process.env.FLUX_APP_SOURCE_PATH || __dirname + '/lib/client/index.js'
  },
  build: {
    path: process.env.FLUX_APP_BUILD_PATH || __dirname + '/dist'
  }
}

module.exports = config
