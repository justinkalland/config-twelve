const expect = require('chai').expect
const path = require('path')
const fs = require('fs')
const appRoot = path.dirname(require.main.filename)
let config

describe('Integration', () => {
  before(() => {
    fs.copyFileSync(path.join(__dirname, 'integration-test-config.js'), path.join(appRoot, 'config.js'))
    config = require('../')
  })

  after(() => {
    fs.unlinkSync(path.join(appRoot, 'config.js'))
  })

  describe('string', () => {
    it('regular', () => {
      expect(config.STRING).to.equal('foobar')
    })

    it('not required', () => {
      expect(config.STRING_NOT_REQUIRED).to.equal(undefined)
    })

    it('default and set', () => {
      expect(config.STRING_DEFAULT_AND_SET).to.equal('bar')
    })

    it('default and mising', () => {
      expect(config.STRING_DEFAULT_AND_MISSING).to.equal('foo')
    })
  })

  describe('number', () => {
    it('regular', () => {
      expect(config.NUMBER).to.equal(123)
    })

    it('not required', () => {
      expect(config.NUMBER_NOT_REQUIRED).to.equal(0)
    })

    it('default and set', () => {
      expect(config.NUMBER_DEFAULT_AND_SET).to.equal(123)
    })

    it('default and mising', () => {
      expect(config.NUMBER_DEFAULT_AND_MISSING).to.equal(356)
    })
  })

  describe('boolean', () => {
    it('regular', () => {
      expect(config.BOOLEAN).to.equal(false)
    })

    it('not required', () => {
      expect(config.BOOLEAN_NOT_REQUIRED).to.equal(false)
    })

    it('default true and set false', () => {
      expect(config.BOOLEAN_DEFAULT_TRUE_AND_SET_FALSE).to.equal(false)
    })

    it('default false and set true', () => {
      expect(config.BOOLEAN_DEFAULT_FALSE_AND_SET_TRUE).to.equal(true)
    })

    it('default true and missing', () => {
      expect(config.BOOLEAN_DEFAULT_TRUE_AND_MISSING).to.equal(true)
    })

    it('default false and missing', () => {
      expect(config.BOOLEAN_DEFAULT_FALSE_AND_MISSING).to.equal(false)
    })
  })
})
