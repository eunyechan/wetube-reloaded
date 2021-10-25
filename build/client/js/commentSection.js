"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.getElementById("videoContainer");
var form = document.getElementById("commentForm");
var videoCommentsBox = document.getElementById("video__comments-box");
var videoCommentTextarea = document.getElementById("video__comment-textarea");
var videoCommentList = document.querySelector(".video__comment");
var videoCommentCancleBtn = document.getElementById("video__comment__cancle-button");
var videoCommentWriteBtn = document.getElementById("video__comment__write-button");
var userCommentContainerBox = document.getElementsByClassName("user__comment__container-box");
var deleteBtns = document.getElementsByClassName("user__comment__deletebtn-span");
var userCommentFirstdBtn = document.getElementsByClassName("user__comment__hover-firstbtn");
var userCommentSecondBtn = document.getElementsByClassName("user__comment-deletebtn");
var toggleValue = true;

var addComment = function addComment(text, id) {
  // const videoComments = document.querySelector(".video__comments ul");
  // const userCommentContainerBox = document.createElement("div");
  // userCommentContainerBox.className = "user__comment__container-box";
  // const commentList = document.createElement("li");
  // commentList.className = "user__comment-list";
  // const span = document.createElement("span");
  // const userCommentFirstdBtn = document.createElement("div");
  // userCommentFirstdBtn.className = "user__comment__hover-firstbtn";
  // const userCommentFirstdBtnIcon = document.createElement("i");
  // userCommentFirstdBtnIcon.className =
  //   "fas.fa-ellipsis-v user__comment__hover__firstbtn-icon";
  // const userCommentSecondBtn = document.createElement("button");
  // userCommentSecondBtn.className = "user__comment-deletebtn";
  // const deleteBtns = document.createElement("i");
  // deleteBtns.className = "far.fa-trash-alt, user__comment__deletebtn-span";
  // const userCommentDeletebtnSpan = document.createElement("span");
  // userCommentDeletebtnSpan.className = "user__comment__deletebtn-span";
  // userCommentSecondBtn.append(deleteBtns, userCommentDeletebtnSpan);
  // userCommentFirstdBtnIcon.append(userCommentSecondBtn);
  // userCommentFirstdBtn.append(userCommentFirstdBtnIcon);
  // span.innerText = `${text}`;
  // commentList.append(span, userCommentFirstdBtn);
  // userCommentContainerBox.append(commentList);
  // videoComments.prepend(userCommentContainerBox);
  setTimeout("location.reload()");
}; // const locationReloadSubmit = () => {
// };


var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var textarea, text, videoId, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            textarea = form.querySelector("textarea");
            text = textarea.value;
            videoId = videoContainer.dataset.id;

            if (!(text === "")) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.next = 8;
            return (0, _nodeFetch["default"])("/api/videos/".concat(videoId, "/comment"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                text: text
              })
            });

          case 8:
            response = _context.sent;

            if (response.status === 201) {
              textarea.value = "";
              addComment(text);
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleSubmit(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleDelete = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    var comment, commentId, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            comment = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
            commentId = comment.dataset.id;
            console.log(comment);
            console.log(commentId);
            _context2.next = 6;
            return (0, _nodeFetch["default"])("/api/videos/".concat(commentId, "/commentDelete"), {
              method: "DELETE"
            });

          case 6:
            response = _context2.sent;

            if (response.status === 201) {
              comment.remove();
            }

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function handleDelete(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var handleStop = function handleStop(e) {
  e.stopPropagation();
};

var inputFocus = function inputFocus() {
  videoCommentTextarea.style.borderBottom = "1px solid rgba(238, 238, 238, 0.6)";
};

var inputBlur = function inputBlur() {
  videoCommentTextarea.style.borderBottom = "1px solid rgba(238, 238, 238, 0.2)";
};

var handleText = function handleText() {
  videoCommentCancleBtn.style.display = "block";
  videoCommentWriteBtn.style.display = "block";

  if (videoCommentTextarea.value.length > 0) {
    videoCommentWriteBtn.style.cursor = "pointer";
    videoCommentWriteBtn.style.pointerEvents = "stroke";
    videoCommentWriteBtn.style.backgroundColor = "white";
    videoCommentWriteBtn.style.color = "#cc0d00";
  }

  if (videoCommentTextarea.value.length < 1) {
    videoCommentWriteBtn.style.pointerEvents = "none";
    videoCommentWriteBtn.style.backgroundColor = "#484848";
    videoCommentWriteBtn.style.color = "#717171";
  }
};

var hanldeTextCancle = function hanldeTextCancle() {
  var textarea = form.querySelector("textarea");
  videoCommentCancleBtn.style.display = "none";
  videoCommentWriteBtn.style.display = "none";
  textarea.value = "";
};

var hanldeBtnLeave = function hanldeBtnLeave() {
  if (toggleValue === false) {
    for (var i = 0; i < userCommentSecondBtn.length; i++) {
      userCommentSecondBtn[i].style.display = "none";
      toggleValue = true;
    }
  }
};

var handleDeleteBtn = function handleDeleteBtn() {
  if (toggleValue === true) {
    for (var i = 0; i < userCommentSecondBtn.length; i++) {
      userCommentSecondBtn[i].style.display = "flex";
      userCommentSecondBtn[i].style.marginLeft = "-40px";
      userCommentSecondBtn[i].style.top = "50px";
      userCommentSecondBtn[i].style.position = "absolute";
    }

    toggleValue = false;
  } else {
    for (var _i = 0; _i < userCommentSecondBtn.length; _i++) {
      userCommentSecondBtn[_i].style.display = "none";
    }

    toggleValue = true;
  }
};

videoCommentsBox.addEventListener("keydown", handleStop);
videoCommentTextarea.addEventListener("focus", inputFocus);
videoCommentTextarea.addEventListener("blur", inputBlur);
videoCommentTextarea.addEventListener("click", handleText);
videoCommentTextarea.addEventListener("input", handleText);
videoCommentCancleBtn.addEventListener("click", hanldeTextCancle);

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtns) {
  for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", handleDelete);
  }
}

if (userCommentFirstdBtn) {
  for (var _i2 = 0; _i2 < userCommentFirstdBtn.length; _i2++) {
    userCommentFirstdBtn[_i2].addEventListener("click", handleDeleteBtn);
  }
}

if (userCommentContainerBox) {
  for (var _i3 = 0; _i3 < userCommentContainerBox.length; _i3++) {
    userCommentContainerBox[_i3].addEventListener("mouseleave", hanldeBtnLeave);
  }
}