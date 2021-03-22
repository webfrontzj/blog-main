const {Admin} =require('../models/admin');
const bcrypt=require('bcryptjs');

class AdminDao{
    //创建管理员
    static async create(params){
        const {email,password,nickname}=params;

        const hasAdmin=await Admin.findOne({
            where:{
                email,
                deleted_at:null
            }
        });

        if(hasAdmin){
            throw new global.errs.Existing('管理员已存在');
        }

        const admin =await Admin.create({
            nickname,
            email,
            password
        });
        
        return{
            email:admin.email,
            nickname:admin.nickname
        }

    }

    //验证密码
    static async verify(email,plainPassword){
        //检查用户是否存在
        const admin = await Admin.findOne({
            where:{
                email
            }
        });
        if(!admin){
            throw new global.errs.AuthFailed('账号不存在');
        }

        //验证密码是否正确
        const correct=bcrypt.compareSync(plainPassword,admin.password);

        if(!correct){
            throw new global.errs.AuthFailed('密码不正确');
        }

        return admin;
    }

    //查询管理员信息
    static async detail(id){
        const scope='bh';
        //查询管理员是否存在
        const admin=await Admin.scope(scope).findOne({
            where:{
                id
            }
        });
        if(!admin){
            throw new global.errs.AuthFailed('账号不存在');
        }

        return admin;
    }

}


module.exports={
    AdminDao
}