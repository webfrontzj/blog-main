const moment=require('moment');

const {sequelize}=require('../../core/db');
const {Sequelize,Model,DataTypes}=require('sequelize');

class Advertise extends Model{}

Advertise.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING(64),
        allowNull:false,
        comment:'广告标题'
    },
    link:{
        type:DataTypes.STRING(64),
        allowNull:false,
        comment:'广告链接'
    },
    created_at:{
        type:DataTypes.DATE,
        allowNull:false,
        get(){
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
},{
    sequelize,
    modelName:'advertise',
    tableName:'advertise'
});


module.exports={
    Advertise
}