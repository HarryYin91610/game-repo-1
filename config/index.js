'use strict'
// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const fs = require('fs')
var distPath = path.resolve(__dirname, '../dist')

class ProjectConfig {
  constructor ({ filename, template, templateDistPath, inject, keepHTMLComment }) {
    this.filename = filename
    this.template = template
    this.templateDistPath = templateDistPath
    this.inject = inject
    this.keepHTMLComment = keepHTMLComment
  }
}

var config = {
  // 基础设置.
  base: {
    entry: null,                    // 对应 webpack 中的 entry.
    htmlWebpackPluginConfig: null,  // 对应 HTMLWebpackPlugin 配置.
    openBrowser: false              // 是否在开启服务器后打开浏览器.
  },

  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

const entry = {}  // Webpack entry 配置.
const htmlWebpackPluginConfig = {}  // HTMLWebpackPlugin 配置.

// 构建所有项目
const projectDirs = fs.readdirSync(path.resolve(__dirname, '../src'))
projectDirs.forEach(projectName => {
  const dirPath = path.resolve(__dirname, `../src/${projectName}`)
  const projectJSON = require(dirPath + '/project.json')

  // entry 配置.
  entry[projectName] = dirPath + '/' + projectJSON.entry.js

  // HTML Webpack Plugin 设置.
  const link = projectJSON.name + '/' + projectJSON.devHTML  // 开发环境项目访问路径.
  htmlWebpackPluginConfig[projectName] = new ProjectConfig({
    filename: link,
    template: dirPath + '/' + projectJSON.entry.template,
    templateDistPath: `${distPath}/${projectJSON.publicHTML}`,
    inject: !!projectJSON.inject,
    keepHTMLComment: projectJSON.keepHTMLComment || false
  })
})

config.base.entry = entry
config.base.htmlWebpackPluginConfig = htmlWebpackPluginConfig

module.exports = config

