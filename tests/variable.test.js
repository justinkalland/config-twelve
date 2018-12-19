const Variable = require('../lib/variable')
const expect = require('chai').expect

describe('Variable class', () => {
  describe('constructor method', () => {
    it('converts string `options` to object', () => {
      const variable = new Variable('FOO', 'boolean')

      expect(variable.getType()).to.equal('boolean')
    })
  })

  describe('getType method', () => {
    it('returns type', () => {
      const variable = new Variable('FOO', 'number')

      expect(variable.getType()).to.equal('number')
    })
  })

  describe('envExsists method', () => {
    it('returns true', () => {
      process.env.FOO = 'bar'
      const variable = new Variable('FOO')

      expect(variable.envExists()).to.equal(true)
    })

    it('returns true for empty env variable', () => {
      process.env.FOO = ''
      const variable = new Variable('FOO')

      expect(variable.envExists()).to.equal(true)
    })

    it('returns false', () => {
      const variable = new Variable('NOTSET')

      expect(variable.envExists()).to.equal(false)
    })
  })

  describe('isRequired method', () => {
    it('returns true as default', () => {
      const variable = new Variable('NOTSET')

      expect(variable.isRequired()).to.equal(true)
    })

    it('returns true with explicit option', () => {
      const variable = new Variable('NOTSET', {
        required: true
      })

      expect(variable.isRequired()).to.equal(true)
    })

    it('returns false with explicit option', () => {
      const variable = new Variable('NOTSET', {
        required: false
      })

      expect(variable.isRequired()).to.equal(false)
    })

    it('returns false if default value', () => {
      const variable = new Variable('NOTSET', {
        default: 'bar'
      })

      expect(variable.isRequired()).to.equal(false)
    })
  })

  describe('getValue method', () => {
    it('returns undefined by default', () => {
      const variable = new Variable('NOTSET')

      expect(variable.getValue()).to.equal(undefined)
    })

    it('returns default if option set', () => {
      const variable = new Variable('NOTSET', {
        default: 'bar'
      })

      expect(variable.getValue()).to.equal('bar')
    })

    it('returns env if set', () => {
      process.env.FOO = 'bar'
      const variable = new Variable('FOO', {
        default: 'defaultbar'
      })

      expect(variable.getValue()).to.equal('bar')
    })

    it('returns zero for invalid number', () => {
      process.env.FOO = 'bar'
      const variable = new Variable('FOO', 'number')

      expect(variable.getValue()).to.equal(0)
    })

    describe('returns number types', () => {
      const variable = new Variable('FOO', 'number')

      const numberTry = [
        0,
        1,
        2.5643,
        547839275682,
        549834597497.8675
      ]

      numberTry.forEach(value => {
        it(`${value}`, () => {
          process.env.FOO = String(value)
          expect(variable.getValue())
            .to.equal(value)
            .and.to.be.a('number')
        })
      })
    })

    describe('returns true for boolean', () => {
      const variable = new Variable('FOO', 'boolean')

      const trueTry = [
        'true',
        't',
        'yes',
        'y',
        'on',
        '1',
        'foobar',
        '55'
      ]

      trueTry.forEach(value => {
        it(value, () => {
          process.env.FOO = value
          expect(variable.getValue()).to.equal(true)
        })
      })
    })

    describe('returns false for boolean', () => {
      const variable = new Variable('FOO', 'boolean')

      const falseTry = [
        'false',
        'f',
        'n',
        'no',
        'off',
        '0',
        ''
      ]

      falseTry.forEach(value => {
        it(value, () => {
          process.env.FOO = value
          expect(variable.getValue()).to.equal(false)
        })
      })
    })
  })
})
