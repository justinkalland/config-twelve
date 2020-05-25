const Config = require('./lib/config')
const path = require('path')
const configFile = path.resolve(process.cwd(), 'config.js')
const dotenvFile = path.resolve(process.cwd(), '.env')
const settings = require(configFile)
require('dotenv').config({ path: dotenvFile })

module.exports = new Config(settings)
