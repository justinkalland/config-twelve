const stringFalsey = [
  'false',
  'f',
  'n',
  'no',
  'off',
  '0',
  ''
]

class Variable {
  constructor (name, options = 'string') {
    if (typeof options !== 'object') {
      options = {
        type: options
      }
    }

    this.name = name
    this._options = options
  }

  envExists () {
    return Object.prototype.hasOwnProperty.call(process.env, this.name)
  }

  getValue () {
    let value
    if (this.envExists()) {
      value = process.env[this.name]
    } else if (this._options.default !== undefined) {
      value = String(this._options.default)
    }

    switch (this.getType()) {
      case 'number':
        value = Number(value)
        if (Number.isNaN(value)) {
          value = 0
        }
        break

      case 'boolean':
        if (value === undefined) {
          value = 'false'
        }
        value = value.toLowerCase()
        if (stringFalsey.includes(value)) {
          value = false
        } else {
          value = true
        }
        break
    }

    return value
  }

  getType () {
    return this._options.type
  }

  isRequired () {
    if (this._options.default !== undefined) {
      return false
    }

    if (this._options.required === false) {
      return false
    }

    return true
  }
}

module.exports = Variable
