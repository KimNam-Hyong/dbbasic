const Sequelize = require("sequelize");

module.exports = class Setting extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      //init은 초기 세팅
      {
        no_data_message: {
          type: Sequelize.TEXT, //varchar(100) STRING INTEGER TEXT ENUM...
          allowNull: false, //null 허용 안함 true은 빈값을 허용 false허용이 아님
          defaultValue: "", //기본값은 guest로
          comment: "데이터가 없을 때 코멘트", //코멘트 달기
        },
        data_message: {
          type: Sequelize.TEXT, //varchar(100)
          allowNull: false, //null 허용 안함
          defaultValue: "", //기본값은 guest로
          comment: "전광판에 보여줄 코멘트", //코멘트 달기
        },
        play_message: {
          type: Sequelize.TEXT, //varchar(100)
          allowNull: false, //null 허용 안함
          defaultValue: "", //기본값은 guest로
          comment: "플레이 메세지", //코멘트 달기
        },
        r_length: {
          type: Sequelize.INTEGER, //varchar(100)
          allowNull: false, //null 허용 안함
          defaultValue: 0, //기본값은 guest로
          comment: "플레이 갯수", //코멘트 달기
        },
      },
      {
        sequelize,
        timestamps: true, //등록일과 수정일 자동으로 생성이 되어지고 인서트 및 업데이트도 자동으로 되어진다.
        underscored: false, //캐멀캐이스 -> 뭔 뜻인지 모르겠음
        modelName: "Setting", //노드에서 사용할 모델명
        tableName: "setting", //db에서 저장할 테이블명
        paranoid: false, //삭제여부 true를 하게 되면 deleteAt 필드가 나옴 완전 삭제를 하려면 false로 해야 함
        charset: "utf8", //캐릭터셋 설정
        collate: "utf8_general_ci", //db 캐릭터셋
      }
    );
  }
  static associate(db) {
    // 데이터 관계 맺기
  }
};
