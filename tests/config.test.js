const Config = require('../lib/config')
const expect = require('chai').expect

describe('Config class', () => {
  it('works', () => {
    const config = new Config({
      FOO: {
        default: 'bar'
      }
    })

    expect(config.FOO).to.equal('bar')
  })

  it('throws error on missing required env variable', () => {
    const config = () => {
      return new Config({ NOTSET: 'string' })
    }

    expect(config).to.throw('Missing required environment variable')
  })
})
