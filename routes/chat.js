const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("./main/chat", { title: "채팅" });
});
module.exports = router; // 라우터 내보내기
