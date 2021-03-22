const moment=require('moment');
const bcrypt=require('bcryptjs');
const {sequelize}=require('../../core/db');
const {Model,DataTypes}=require('sequelize');

class Admin extends Model{

}

Admin.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nickname:{
        type:DataTypes.STRING(64),
        allowNull:false,
        comment:'管理员昵称'
    },
    email:{
        type:DataTypes.STRING(128),
        unique:true,
        allowNull:false,
        comment:'管理员邮箱'
    },
    password:{
        type:DataTypes.STRING,
        set(val){
            //加密
            const salt=bcrypt.genSaltSync(10);
            //生成加密密码
            const psw=bcrypt.hashSync(val,salt);
            this.setDataValue('password',psw);
        },
        allowNull:false,
        comment:'管理员密码'
    },
    created_at:{
        type:DataTypes.DATE,
        allowNull:false,
        get(){
            return moment(this.getDataValue('created_at')).format('YYY-MM-DD');
        }
    }
},{
    sequelize,
    modelName:'admin',
    tableName:'admin'
});

module.exports={
    Admin
}