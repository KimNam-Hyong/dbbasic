const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID, //카카오 api 키값
        callbackURL: "/user/kakao/callback", //결과값을 던져주기
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          //"select * from user where user_id=profile.id";
          const exUser = await User.findOne({
            where: { user_id: profile.id },
          });
          if (exUser) {
            done(null, exUser); //세션
          } else {
            //db에 회원정보를 넣기
            const newUser = await User.create({
              user_id: profile.id,
              nick: profile.displayName,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
