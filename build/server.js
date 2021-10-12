"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./init");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _middlewares = require("./middlewares");

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json()); // 클라이언트에서 보낸 데이터를 JSON.parse를 수행하여 서버에 전달

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   maxAge: 20000,
  // },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use((0, _expressFlash["default"])());
app.use(_middlewares.localsMiddleware); ///////////////////////////////////////////////////////////////////

app.use("/core", _express["default"]["static"]("node_modules/@ffmpeg/core/dist"));
app.use(function (req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
}); ///////////////////////////////////////////////////////////////////

app.use("/uploads", _express["default"]["static"]("uploads")); // 서버의 assets 폴더를 브라우저의 URL /static을 통해서 공개

app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _rootRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/videos", _videoRouter["default"]);
app.use("/api", _apiRouter["default"]);
var _default = app;
exports["default"] = _default;