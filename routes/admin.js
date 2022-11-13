const express = require("express");
const router = express.Router();
const { Setting } = require("../models");

router.get("/", (req, res) => {
  res.render("index", { title: "제목" });
});

router
  .get("/setting", async (req, res) => {
    try {
      const row = await Setting.findOne();
      res.render("./admin/setting", { title: "설정", row });
    } catch (error) {}
  })
  .post("/setting", async (req, res) => {
    try {
      const row = await Setting.findOne();
      let column = {};
      //switch case문을 들어가야 함 그래야 db 필드명에 맞게 들어갈 수가 있음
      switch (req.body.field) {
        case "no_data_message":
          column = { no_data_message: req.body.value };
          break;
        case "data_message":
          column = { data_message: req.body.value };
          break;
        case "play_message":
          column = { play_message: req.body.value };
          break;
        case "r_length":
          column = { r_length: req.body.value };
          break;
      }
      if (row) {
        //데이터가 있을 경우
        await Setting.update(column, {
          where: { id: 1 },
        });
      } else {
        //데이터가 없을 경우
        await Setting.create(column);
      }
    } catch (error) {
      console.error(error);
    }
  });
module.exports = router; // 라우터 내보내기
