const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore(app){

    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
    InitManager.loadConfig()
  }
  static loadConfig(path=''){
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static loadHttpException(){
    //每当应用程序启动的时候，都会把http-exception里的类都装载到global里，使用global方法导入全部的类
    const errors = require('./http-exception')
    global.errs = errors
  }

  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule });
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
       InitManager.app.use(obj.routes());
      }
    }
  }
}

module.exports = InitManager

