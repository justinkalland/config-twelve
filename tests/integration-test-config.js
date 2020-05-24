const _ = require('lodash')

module.exports = {
  STRING: 'string',
  STRING_NOT_REQUIRED: { type: 'string', required: false },
  STRING_DEFAULT_AND_SET: { type: 'string', default: 'foo' },
  STRING_DEFAULT_AND_MISSING: { type: 'string', default: 'foo' },
  NUMBER: 'number',
  NUMBER_NOT_REQUIRED: { type: 'number', required: false },
  NUMBER_DEFAULT_AND_SET: { type: 'number', default: 356 },
  NUMBER_DEFAULT_AND_MISSING: { type: 'number', default: 356 },
  BOOLEAN: 'boolean',
  BOOLEAN_NOT_REQUIRED: { type: 'boolean', required: false },
  BOOLEAN_DEFAULT_TRUE_AND_SET_FALSE: { type: 'boolean', default: true },
  BOOLEAN_DEFAULT_FALSE_AND_SET_TRUE: { type: 'boolean', default: false },
  BOOLEAN_DEFAULT_TRUE_AND_MISSING: { type: 'boolean', default: true },
  BOOLEAN_DEFAULT_FALSE_AND_MISSING: { type: 'boolean', default: false },
  // sss
  DOTENV_STRING: 'string',
  DOTENV_STRING_DEFAULT_AND_SET: { type: 'string', default: 'foo' },
  DOTENV_NUMBER: 'number',
  DOTENV_NUMBER_DEFAULT_AND_SET: { type: 'number', default: 356 },
  DOTENV_BOOLEAN: 'boolean',
  DOTENV_BOOLEAN_DEFAULT_TRUE_AND_SET_FALSE: { type: 'boolean', default: true },
  DOTENV_BOOLEAN_DEFAULT_FALSE_AND_SET_TRUE: { type: 'boolean', default: false }
}

process.env = _.merge(process.env, {
  STRING: 'foobar',
  STRING_DEFAULT_AND_SET: 'bar',
  NUMBER: '123',
  NUMBER_DEFAULT_AND_SET: '123',
  BOOLEAN: 'off',
  BOOLEAN_DEFAULT_TRUE_AND_SET_FALSE: 'no',
  BOOLEAN_DEFAULT_FALSE_AND_SET_TRUE: 'y'
})
