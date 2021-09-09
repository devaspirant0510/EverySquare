const Sequelize = require("sequelize");

module.exports = class Room extends Sequelize.Model{
    static init(sequelize,options){
        return super.init({
            roomKey: {
                type:Sequelize.STRING,
                primaryKey:true,
                allowNull:true,
            },
            roomName:{
                type:Sequelize.STRING,
                allowNull: false,
            },
            roomDescription:{
                type:Sequelize.STRING,
                allowNull:false
            },
            currentUser:{
                type:Sequelize.INTEGER,
                allowNull:true,

            },
            maxUser:{
                type:Sequelize.INTEGER,
                allowNull:false,
            },
            hashtag:{
                type:Sequelize.STRING,
                allowNull:true,
            },
            joinUser:{
                type:Sequelize.JSON,
                allowNull:true,
            },
            isPublic:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: "Room",
            tableName: "rooms",
            charset: "utf8",
            collate: "utf8_general_ci"
        });
    }
    static associate(db){
        db.Room.hasMany(db.User,{
            foreignKey:"joinRoomId",
            id:"roomKey"
        });
        db.Room.belongsTo(db.User,{
            as:"master",
            constraints:false
        })
    }
}
