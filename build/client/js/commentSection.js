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
  locationReloadSubmit(); // const videoComments = document.querySelector(".video__comments ul");
  // const newComment = document.createElement("li");
  // newComment.dataset.id = id;
  // newComment.className = "video__comment";
  // const icon = document.createElement("i");
  // icon.className = "fas fa-comment";
  // icon.innerText = ` ${text}`;
  // const span2 = document.createElement("span");
  // span2.innerText = "❌";
  // span2.className = "deleteBtn";
  // newComment.appendChild(icon);
  // newComment.appendChild(span2);
  // videoComments.prepend(newComment);
  // span2.addEventListener("click", handleDelete);
};

var locationReloadSubmit = function locationReloadSubmit() {
  setTimeout("location.reload()");
};

var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var textarea, text, videoId, response, _yield$response$json, newCommentId;

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

            if (!(response.status === 201)) {
              _context.next = 16;
              break;
            }

            textarea.value = "";
            _context.next = 13;
            return response.json();

          case 13:
            _yield$response$json = _context.sent;
            newCommentId = _yield$response$json.newCommentId;
            addComment(text, newCommentId);

          case 16:
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
            comment = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
            commentId = comment.dataset.id;
            console.log(comment);
            console.log(commentId);
            _context2.next = 6;
            return (0, _nodeFetch["default"])("/api/video/".concat(commentId, "/commentDelete"), {
              method: "DELETE"
            });

          case 6:
            response = _context2.sent;

            if (response.status === 201) {
              locationReloadDelete();
              comment.remove();
            } // const { videoId } = videoContainer.dataset.id;
            // const comment = event.currentTarget.parentElement;
            // const user = comment.previousElementSibling;
            // console.log(user);
            // console.log(videoId);
            // const { commentId } = comment.dataset;
            // const { status } = await fetch(
            //   `/api/videos/${videoId}/comment/${commentId}/delete`,
            //   {
            //     method: "DELETE",
            //   }
            // );
            // if (status === 200) {
            //   user.remove();
            //   comment.remove();
            // }


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

var locationReloadDelete = function locationReloadDelete() {
  setTimeout("location.reload()");

  if (window.location.reload === true) {
    videoCommentList.style.display = "none";
  }
};

var handleStop = function handleStop(e) {
  e.stopPropagation();
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