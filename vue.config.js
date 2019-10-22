const StylelintPlugin = require('stylelint-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const autoprefixer = require('autoprefixer') // rem适配方案（可选）
const pxtorem = require('postcss-pxtorem') // rem适配方案（可选）
const path = require('path')
module.exports = {
  // 选项...
  publicPath: './', // 部署应用包时的基本 URL。 不加上的话部署后会显示空白页面
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的目录。
  devServer: {
    proxy: { // 设置代理
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://220.249.21.130:65532', // 测试
        ws: true, // 如果要代理 websockets
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      '/dev-api-intranet': {
        target: 'http://192.168.1.85:65532', // 内网
        ws: true, // 如果要代理 websockets
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/dev-api-intranet': ''
        }
      }
    }
  },
  productionSourceMap: process.env.VUE_APP_ENV_CONFIG !== 'prod', // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  css: {
    sourceMap: true, // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。有了source map，浏览器直接显示less，快速查看在less文件中的位置，方便调试。
    loaderOptions: {
      less: {
        // modifyVars: {
        //   red: '#333',
        //   blue: '#3eaf7c',
        //   orange: '#f08d49',
        //   'text-color': '#111'
        // }
        modifyVars: {
          'hack': `true; @import "${path.join(__dirname, './src/assets/css/base/variables/vars.less')}";`
        // 'hack': `true; @import './src/assets/css/base/variables/colors.less')};`
        }
      },
      // rem适配方案（可选）
      postcss: {
        plugins: [
          autoprefixer({
            browsers: ['Android >= 4.0', 'iOS >= 7']
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      return {
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              uglifyOptions: {
                warnings: false,
                compress: {
                  drop_console: true, // 删除console.log
                  drop_debugger: false // 自动删除debugger
                }
              }
            })
          ]
        }
      }
    } else {
      // 为开发环境修改配置...
      return {
        plugins: [
          new StylelintPlugin({
            files: ['**/*.{vue,html,less}']
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // ...your other webpack config overrides here
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config.plugin('webpack-report')
          .use(BundleAnalyzerPlugin, [{
            // ...webpack-bundle-analyzer options here
          }])
      }
    }
  },
  pluginOptions: {
    vant: {
      // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    }
  }
}
