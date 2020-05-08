module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['last 2 versions']
      }
    }]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-json-strings',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'transform-vue-jsx'
  ]
}
