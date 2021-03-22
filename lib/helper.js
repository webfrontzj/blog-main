class Resolve{
    success(msg='success',errorCode=0,code = 200){
        return {
            msg,
            errorCode,
            code
        }
    }
    json(data,msg='success',errorCode=0,code =200){
        return {
            data,
            code,
            msg,
            errorCode
        }
    }
}

module.exports={
    Resolve
}