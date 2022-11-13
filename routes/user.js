const express = require("express");
const passport = require("passport");
const router = express.Router();
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/", //카카오 로그인 실패를 할 때
  }),
  (req, res) => {
    res.redirect("/"); //성공을 하게 되면
  }
);
router.get("/logout", async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});
module.exports = router;
