const express = require("express");
const router = express.Router();
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
router.get("/", (req, res) => {
  console.log(req.user);
  res.render("./main/index", { title: "제목" });
});

router.get("/test", (req, res) => {
  res.render("./main/test");
});
router.get("/res", (req, res) => {
  res.render("./main/res");
});
module.exports = router; // 라우터 내보내기
