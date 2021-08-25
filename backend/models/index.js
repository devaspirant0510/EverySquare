const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const User = require("./User");
const Room = require("./Room");
const db = {};

let sequelize;
// db 연결
sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델 정의
User.init(sequelize);
Room.init(sequelize);

// db 테이블 연결
db.User = User;
db.Room = Room;

// 테이블간 관계정의
User.associate(db);
Room.associate(db)

module.exports = db;
