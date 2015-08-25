var config = {}

config.client = {
  env: process.env.NODE_ENV || 'development',
  source: {
    path: process.env.FLUX_APP_SOURCE_PATH || __dirname + '/lib/client/index.js'
  },
  build: {
    path: process.env.FLUX_APP_BUILD_PATH || __dirname + '/static'
  }
}

module.exports = config
