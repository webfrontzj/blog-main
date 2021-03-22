const basicAuth=require('basic-auth');
const jwt=require('jsonwebtoken');

class Auth{
    constructor(level){
        this.level=level || 1;

        Auth.USER=8;
        Auth.ADMIN=16;
        Auth.SPUSER_ADMIN=32;
    }

    get m(){

        return async (ctx,next)=>{
            const tokenToken=basicAuth(ctx.req);

            let errMsg='无效的token';
            if(!tokenToken || !tokenToken.name){
                errMsg='需要携带token值';
                throw new global.errs.Forbidden(errMsg);
            }

            try{
                var decode =jwt.verify(tokenToken.name,global.config.security.secretKey);
            }catch(error){
                if(error.name == 'TokenExpiredError'){
                    errMsg='token已过期'
                }
                throw new global.errs.Forbidden(errMsg);
            }

            if(decode.scope < this.level){
                errMsg='权限不足';
                throw new global.errs.Forbidden(errMsg);
            }

            ctx.auth={
                uid:decode.uid,
                scope:decode.scope
            };
            await next();
        }

    }
}




module.exports={
    Auth
}