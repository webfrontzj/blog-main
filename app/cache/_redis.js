const redis=require('redis');
const {REDIS_CONF}=require('../../core/redis');

//创建客户端
const redisClient=redis.createClient(
    REDIS_CONF.port,
    REDIS_CONF.host
);

//错误监听
redisClient.on('error',err=>{
    console.log('Redis err');
    console.log(err);
});

//设置redis
function setRedis(key,val,timeout=60*60){
    if(typeof val== 'object'){
        val=JSON.stringify(val);
    }
    redisClient.set(key,val);
    redisClient.expire(key,timeout);
}

//获取redis
function getRedis(key){
    return new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err);
                return;
            }
            if(val == null){
                resolve(null);
                return;
            }
            try{
                resolve(JSON.parse(val));
            }catch(ex){
                resolve(val);
            }
        });
    });
}

module.exports={
    setRedis,
    getRedis
}