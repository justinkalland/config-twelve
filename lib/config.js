const Variable = require('./variable')

class Config {
  constructor (settings) {
    for (const name in settings) {
      const variable = new Variable(name, settings[name])

      if (variable.isRequired() && !variable.envExists()) {
        throw new Error(`Missing required environment variable: ${name}`)
      }

      this[name] = variable.getValue()
    }
  }
}

module.exports = Config
