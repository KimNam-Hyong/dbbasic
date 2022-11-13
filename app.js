const express = require("express"); //익스프레스 모듈 가져오기
const morgan = require("morgan"); //로그를 기록하기 위한 모듈
const cookieParser = require("cookie-parser"); //쿠키를 굽는 모듈
const session = require("express-session"); //세션 인식 모듈
const dotenv = require("dotenv"); //키값을 지정하는 모듈
const path = require("path"); //경로 모듈 가져오기
const multer = require("multer");
const fs = require("fs");
const nunjucks = require("nunjucks");
const { sequelize } = require("./models");
const passport = require("passport");
const indexRouter = require("./routes");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const chatRouter = require("./routes/chat");
const passportConfig = require("./passport");
const SocketIO = require("socket.io");
const { emit } = require("process");
const { on } = require("events");

dotenv.config(); ////키값을 가져오는 기본 설정
passportConfig(); // 패스포트 설정
//앱과 데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express(); //익스프레스를 사용

app.set("port", process.env.PORT || 3000); // 포트 번호 설정 process.env파일에 PORT를 가져오거나 또는 3000번 포트로 설정
app.set("view engine", "html");
//views에 있는 파일을 가져오겠다는 설정
nunjucks.configure("views", {
  express: app, //express 프레임워크 어떤 객체로 쓸 것인지
  watch: true, //렌더링 할 것인지 말 것인지
});

// 어떤 api나 또는 모듈에 필요한 키값을 가져오기 위함

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public"))); // /public을 url주소 /로 해도 바로 접근이 가능하게
app.use(express.json()); //json을 사용한다
app.use(express.urlencoded({ extended: false })); //url 인코드를 사용하지 않겠다.
app.use(cookieParser(process.env.COOKIE_SECRET)); //쿠키를 암호화해서 파싱하기
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/chat", chatRouter);

app.use((req, res, next) => {
  console.log("모든 요청에 다 실행됩니다.");
  next(); //다음 미들웨어에 검수하기
});

//최종적으로 오류가 발생하면 메세지 보여주기
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message); //500번 오류 메세지 보여주기
});

const server = app.listen(app.get("port"), () => {
  //기본 포트는 3000번
  console.log(app.get("port"), "번 포트에서 대기중");
});

//소켓 서버 만들기
const io = SocketIO(server, {
  //함수겸 상수
  path: "/socket.io",
  cors: { origin: "*" }, //접근 허용 ip별로 허용
  transports: ["polling"],
});
const chat = io.of("/chat");
chat.on("connection", (socket) => {
  socket.on("send", (data) => {
    chat.emit("res", data);
  });
});

const test = io.of("/test"); //테스트 라우터 만들기
//테스트 라우터에 연결이 되면
test.on("connection", (socket) => {
  socket.on("send", (data) => {
    test.emit("res", data);
  });
  socket.on("re-send", (data) => {
    test.emit("re-res", data);
  });
});
