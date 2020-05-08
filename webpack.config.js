/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const { smart } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const load = require('./utils/dotenv')
const { cacheIdentifier, resolve } = require('./utils')

const devEnvConfig = load('development')

const prodEnvConfig = load('production')

const deefinePluginOptions = (env = 'production', params = {}) => {
  const config = env === 'development' ? devEnvConfig : prodEnvConfig
  const options = Object.keys(config).reduce((target, key) => {
    if (key.startsWith('WEB_') || key === 'NODE_ENV') {
      target[key] = JSON.stringify(config[key])
    }
    return target
  }, {})
  if (params.PROXY_HOST) {
    options.WEB_REQUEST_BASE_URL = JSON.stringify(`http://${params.PROXY_HOST}${config.WEB_REQUEST_BASE_URL}`)
  }
  return options
}

const devServerOptions = () => {
  return {
    host: devEnvConfig.DEV_SERVER_HOST_NAME,
    port: devEnvConfig.DEV_SERVER_PORT,
    compress: true,
    open: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    https: devEnvConfig.DEV_SERVER_PROROCOL === 'https',
    proxy: {
      [devEnvConfig.WEB_REQUEST_BASE_URL]: {
        target: devEnvConfig.PROXY_TARGET_SERVER,
        changeOrigin: true
      }
    },
    overlay: true,
    historyApiFallback: {
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
    }
  }
}

const baseConf = (env = 'production') => ({
  entry: './src/main.js',
  output: {
    path: resolve('dist'),
    publicPath: (env === 'development' ? devEnvConfig : prodEnvConfig).WEB_PUBLIC_PATH,
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@layout': resolve('src/layout'),
      '@test': resolve('test'),
      '@image': resolve('src/images'),
      '@page': resolve('src/pages'),
      '@store': resolve('src/store'),
      '@style': resolve('src/styles'),
      '@router': resolve('src/router'),
      '@util': resolve('src/utils'),
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ]
  },
  // externals: {
  //   vue: 'Vue',
  //   vuex: 'Vuex',
  //   'vue-router': 'VueRouter',
  //   axios: 'axios',
  //   'element-ui': 'ELEMENT',
  //   'vue-class-component': 'VueClassComponent',
  //   'vue-property-decorator': 'VuePropertyDecorator',
  //   'vuex-class': 'VuexClass',
  //   'systemjs-webpack-interop': 'SystemjsWebapckInterop',
  //   'vuex-router-sync': 'VuexRouterSync',
  //   nprogress: 'NProgress'
  // },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(vue|(j|t)sx?)$/,
      exclude: [
        /node_modules/
      ],
      use: [{
        loader: 'eslint-loader',
        options: {
          failOnError: true,
          failOnWarning: true,
          cache: resolve('.cache/eslint')
        }
      }]
    }, {
      test: /\.tsx?$/,
      exclude: [/node_module/],
      use: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: resolve('.cache/typescript'),
          cacheIdentifier: cacheIdentifier('typescript', env)
        }
      }, {
        loader: 'thread-loader',
        options: {
          workerParallelJobs: 50,
          poolRespawn: false,
          poolTimeout: 2000,
          name: 'typescript-pool'
        }
      }, {
        loader: 'babel-loader'
      }, {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: ['\\.vue$'],
          happyPackMode: true
        }
      }]
    }, {
      test: /\.m?jsx?$/,
      exclude: [/node_module/],
      use: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: resolve('.cache/es6'),
          cacheIdentifier: cacheIdentifier('babel', env)
        }
      }, {
        loader: 'thread-loader',
        options: {
          workerParallelJobs: 50,
          poolRespawn: false,
          poolTimeout: 2000,
          name: 'es6-pool'
        }
      }, {
        loader: 'babel-loader'
      }]
    }, {
      test: /\.vue$/,
      exclude: [/node_module/],
      use: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: resolve('.cache/vue'),
          cacheIdentifier: cacheIdentifier('vue', env)
        }
      }, {
        loader: 'thread-loader',
        options: {
          workerParallelJobs: 50,
          poolRespawn: false,
          poolTimeout: 2000,
          name: 'vue-pool'
        }
      }, {
        loader: 'vue-loader'
      }]
    }, {
      test: /\.css$/,
      use: [{
        loader: env === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'production',
          importLoaders: 2
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }]
    }, {
      test: /\.less$/,
      use: [{
        loader: env === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'production',
          importLoaders: 2
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }]
    }, {
      test: /\.s(c|a)ss$/,
      use: [{
        loader: env === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'production',
          importLoaders: 2
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }]
    }, {
      test: /\.styl(us)?$/,
      use: [{
        loader: env === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'production',
          importLoaders: 2
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: env !== 'production'
        }
      }, {
        loader: 'stylus-loader',
        options: {
          sourceMap: env !== 'production',
          preferPathResolver: 'webpack'
        }
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': deefinePluginOptions(env)
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CaseSensitivePathsPlugin()
  ]
})

const devConf = smart(baseConf('development'), {
  mode: 'development',
  output: {
    filename: 'main.js',
    chunkFilename: 'chunks/[name].js'
  },
  devtool: '#inline-source-map',
  devServer: devServerOptions(),
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      templateParameters: {
        MODULE_COMMON_BASE_URL: devEnvConfig.MODULE_COMMON_BASE_URL,
        MODULE_FTP_BASE_URL: devEnvConfig.MODULE_FTP_BASE_URL
      }
    })
  ]
})

const prodConf = smart(baseConf('production'), {
  mode: 'production',
  output: {
    filename: 'main.[chunkhash:8].js',
    chunkFilename: 'chunks/[name].[chunkhash:8].js'
  },
  devtool: false,
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'index.[chunkhash:8].css' }),
    new CompressionWebpackPlugin({ test: /\.(js|css)$/ })
  ]
})

module.exports = env => (env === 'development' ? devConf : prodConf)
