const moment=require('moment');
const {sequelize}=require('../../core/db');
const {DataTypes,Model}=require('sequelize');

class Category extends Model{}

Category.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'分类名称'
    },
    key:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'分类关键字'
    },
    parent_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0,
        comment:'分类父级ID，默认为0'
    },
    created_at:{
        type:DataTypes.DATE,
        allowNull:false,
        get(){
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD')
        }
    }
},{
    sequelize,
    modelName:'category',
    tableName:'category'
});

module.exports={
    Category
}