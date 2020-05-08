/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const crypto = require('crypto')
const { version } = require('../package.json')

const resolve = filename => path.resolve(__dirname, '..', filename)

const cacheIdentifier = (extension = 'ts', env = 'development') => {
  const content = `${extension}:${env}${version}`
  return crypto.createHash('md5').update(content).digest('hex').substr(0, 8)
}

module.exports = { resolve, cacheIdentifier }
