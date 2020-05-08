/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, existsSync } = require('fs')
const { parse } = require('dotenv')

const { resolve } = require('./index')

function load (filename) {
  const envPath = resolve(filename)
  if (existsSync(envPath)) {
    return parse(readFileSync(envPath))
  }
  return {}
}

module.exports = env => {
  const subfix = env === 'development' ? 'development' : 'production'
  return Object.assign(load('.env'), load('.env.local'), load(`.env.${subfix}`), load(`.env.${subfix}.local`))
}
