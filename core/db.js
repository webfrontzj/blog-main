const Sequelize=require('sequelize');

const {dbName,host,port,user,password}=require('../config').database;

const sequelize=new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging:false,
    timezone:'+08:00',
    define:{
        timestamp:true,
        paranoid:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true,
        scopes:{
            bh:{
                attributes:{
                    exclude:['password', 'updated_at', 'deleted_at', 'created_at']
                }
            },
            iv:{
                attributes: {
                    exclude: ['content', 'password', 'updated_at', 'deleted_at']
                }
            }
        }
    }
});

sequelize.sync({force:false});

module.exports={
    sequelize
}