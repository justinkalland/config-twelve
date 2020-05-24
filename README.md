# config-twelve
Node.js configuration with env variables that adheres to the [twelve-factor methodology](https://12factor.net/).

The [third factor](https://12factor.net/config) states config should be stored in the environment. This library makes that processor easier. You define the variables you want to use in a config file. Supports defaults and casts to various types.

This improves over the popular [dotenv])(https://www.npmjs.com/package/dotenv) by
- Allowing the use of types (think TypeScript for env vars)
- Ability to set default values
- Requirement to define what environment variables your application will use
- Providing an easy interface
- One location for new developers to see all config needed

## Setup
Install with NPM
```
npm i config-twelve
```

Add a file named `config.js` to the root folder of your application (same place package.json is located). Here is an example to get started.

```js
module.exports = {
  DATABASE_URI: 'string',
  DATABASE_MAX_CONNECTIONS: 'number',
  REPORTS_EMAIL: {
    default: 'admin@site.com'
  },
  DEBUG_OUTPUT: {
    type: 'boolean',
    default: false
  }
}
```

In the example ```DATABASE_URI``` and ```DATABASE_MAX_CONNECTIONS``` are both required environment variables. You can set these before running your application with:
```
export DATABASE_URI="sqlite:/tmp/database.db"
export DATABASE_MAX_CONNECTIONS=100
```

Now you are ready to use the config in your app:
```js
const config = require('config-twelve')

console.log(config.DATABASE_URI) // sqlite:/tmp/database.db
console.log(config.DEBUG_OUTPUT) // false
```

## Config file
The `config.js` file sets up what variables you want to use for configuration.
### Type
Each configured variable has a type. The default is a string, and unknown types are treated as strings.

`number` is cast to a number

`boolean` handles the falsey values of: `false`, `f`, `n`, `no`, `off`, `0`, ` ` *(emtpy string)*. Everything else is `true`.

You can declare the type using a string:
```js
module.exports = {
  ENV_VAR_NAME: 'boolean'
}
```
Or as an option:
```js
module.exports = {
  ENV_VAR_NAME: {
    type: 'boolean'
  }
}
```
### Required
By default all environment variables are required. If a required variable is missing in the environment, an exception will be thrown. If the variable has a default value it is not required. You can also set the `required` option to false:
```js
module.exports = {
  ENV_VAR_NAME: {
    required: false
  }
}
```
### Default
If the default option is set, the value is used if the variable is missing in the environment.
```js
module.exports = {
  ENV_VAR_NAME: {
    default: 'foobar'
  }
}
```

For more examples of the config file, see the [config used for the integration tests](https://github.com/justinkalland/config-twelve/blob/master/tests/integration-test-config.js).

## Usage
Every variable becomes a property on the config object:
```js
const config = require('config-twelve')

console.log(config.ENV_VAR_NAME)
```

## Contributing
After pulling the repository setup with ```npm install```

Running tests: ```npm test```

Check style: ```npm run lint```
