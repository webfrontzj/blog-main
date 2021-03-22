const Router=require('koa-router');
const requireDirectory=require('require-directory');

class InitManager{
    static initCore(app){
        InitManager.app=app;
        InitManager.initLoadRouters();
        InitManager.loadHttpException();
        InitManager.loadConfig();
    }
    //加载全部路由
    static initLoadRouters(){
        //绝对路径
        const apiDirectory=`${process.cwd()}/app/api`
        //路由自动加载
        requireDirectory(module,apiDirectory,{
            visit:whenLoadModule
        });
        //判断requireDirectory加载的模块是否是路由
        function whenLoadModule(obj){
            if(obj instanceof Router){
                InitManager.app.use(obj.routes());
            }
        }
    }
    // 将config配置到global上
    static loadConfig(path = ''){
        const configPath = path || process.cwd()+'/config/index.js';
        const config=require(configPath);
        global.config=config;
    }
    static loadHttpException(){
        const errors=require('./http-exception');
        global.errs=errors;
    }

}

module.exports=InitManager;