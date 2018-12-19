const Config = require('./lib/config')
const path = require('path')
const appRoot = path.dirname(require.main.filename)
const settings = require(path.join(appRoot, 'config.js'))

module.exports = new Config(settings)
