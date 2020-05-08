module.exports = {
  extends: [
    'standard',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
  ],
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: 5,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline':'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'vue/valid-v-on': 0,
    'vue/attributes-order': ['error', {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'UNIQUE',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT'
      ]
    }],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'no-console': ['error'],
    'no-empty': 2,
    'no-eq-null': 2,
    'no-new': 0,
    'no-fallthrough': 0,
    'no-unreachable': 0,
    'no-unneeded-ternary': 0,
    '@typescript-eslint/explicit-function-return-type': 0
  },
  globals: {
    Vue: 'readonly',
    VueRouter: 'readonly',
    Vuex: 'readonly',
    SystemjsWebapckInterop: 'readonly',
    singleSpaNavigate: 'readonly',
    ELEMENT: 'readonly',
    singleSpaVue: 'readonly',
    VuePropertyDecorator: 'readonly',
    axios: 'readonly',
    VuePropertyDecorator: 'readonly',
    VuexRouterSync: 'readonly',
    VueClassComponent: 'readonly'
  }
}
