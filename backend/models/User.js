const Sequelize = require("sequelize");


module.exports = class User extends Sequelize.Model{
    static init(sequelize,options){
        return super.init({
            id:{
                type:Sequelize.STRING,
                primaryKey:true,
                allowNull:false,
                unique:true,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            nickname: {
                type: Sequelize.STRING,
                unique: false,
                allowNull: false
            },
            profileURL: {
                type: Sequelize.STRING,
                unique: false,
                allowNull: true
            },
            createdAt: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            socketId:{
                type:Sequelize.STRING,
                allowNull:true
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: "User",
            tableName: "users",
            charset: "utf8",
            collate: "utf8_general_ci"
        });
    }
    static associate(db){
        db.User.belongsTo(db.Room,{
            foreignKey:"joinRoomId",
            id:"roomKey"
        });
        db.User.hasOne(db.Room,{
            as:"master",
            constraints:false,
        });

    }
}