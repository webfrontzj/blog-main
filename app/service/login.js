const {AdminDao}=require('../dao/admin');
const {generateToken}=require('../../core/util');
const {Auth}=require('../../middlewares/auth');


class LoginManager{
    //管理员登录
    static async adminLogin(params){
        const {email,password}=params;
        //验证账号密码
        const admin=await AdminDao.verify(email,password);
        return generateToken(admin.id,Auth.ADMIN);
    }
}

module.exports={
    LoginManager
}