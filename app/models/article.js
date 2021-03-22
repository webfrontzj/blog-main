const moment=require('moment');
const {sequelize}=require('../../core/db');
const {DataTypes,Model}=require('sequelize');
const {Category}=require('./category');

class Article extends Model{}

Article.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING(50),
        allowNull:false,
        comment:'文章标题'
    },
    author:{
        type:DataTypes.STRING(30),
        allowNull:true,
        defaultValue:'张晶',
        comment:'文章作者'
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
        comment:'文章内容'
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'文章简介'
    },
    keyword:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:0,
        comment:'文章关键字'
    },
    cover:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'文章封面'
    },
    browse:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0,
        comment:'文章浏览次数'
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
    modelName:'article',
    tableName:'article'
});

Category.hasMany(Article,{
    foreignKey:'category_id',sourceKey:'id',as:'article'
});
Article.belongsTo(Category,{
    foreignKey:'category_id',targetKey:'id',as:'category'
});

module.exports={
    Article
}