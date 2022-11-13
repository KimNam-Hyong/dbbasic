const Sequelize = require("sequelize");

const Setting = require("./setting");
const User = require("./user");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env]; //db정보가 있는 곳
const db = {}; //db 테이블을 객체로 받는 곳

const sequelize = new Sequelize( //db화
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Setting = Setting; //db 모델명 설정

User.init(sequelize);
User.associate(db);
Setting.init(sequelize); //회원 테이블 생성할 수 있게
Setting.associate(db); //회원테이블을 다른 테이블 연결할 수 있게

module.exports = db; //db 모듈을 내보내기
