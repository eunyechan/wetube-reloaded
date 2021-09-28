"use strict";

var _regeneratorRuntime = require("regenerator-runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.getElementById("videoContainer");
var form = document.getElementById("commentForm");
var videoCommentsBox = document.getElementById("video__comments-box");
var videoCommentTextarea = document.getElementById("video__comment-textarea");
var videoCommentList = document.querySelector(".video__comment");
var videoCommentCancleBtn = document.getElementById("video__comment__cancle-button");
var videoCommentWriteBtn = document.getElementById("video__comment__write-button");
var userCommentContainerBox = document.querySelector(".user__comment__container-box");
var userCommentFirstdBtn = document.querySelector(".user__comment__hover-firstbtn");
var userCommentSecondBtn = document.getElementById("user__comment-deleteBtn");
var deleteBtn = document.getElementById("user__comment-deleteBtn");
var toggleValue = true;

var addComment = function addComment(text, id) {
  locationReloadSubmit(); // const newComment = document.createElement("li");
  // newComment.className = "video__comment";
  // const span = document.createElement("span");
  // span.innerText = ` ${text}`;
  // newComment.dataset.commentid = id;
  // const span2 = document.createElement("button");
  // span2.innerText = " ❌";
  // span2.className = "deleteButton";
  // newComment.appendChild(span);
  // newComment.appendChild(span2);
  // videoComments.prepend(newComment);
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
            return fetch("/api/videos/".concat(videoId, "/comment"), {
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
    var selectBtn, id, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            selectBtn = event.target.parentElement;
            id = selectBtn.dataset.commentid;
            locationReloadDelete();
            console.log(id);
            _context2.next = 6;
            return fetch("/api/videos/".concat(id, "/commentDelete"), {
              method: "DELETE"
            });

          case 6:
            response = _context2.sent;

            if (response.status === 201) {
              deleteComment(id);
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

var locationReloadSubmit = function locationReloadSubmit() {
  setTimeout("location.reload()");
};

var locationReloadDelete = function locationReloadDelete() {
  setTimeout("location.reload()");

  if (window.location.reload === true) {
    videoCommentList.style.display = "none";
  }
};

var deleteComment = function deleteComment(selectBtn) {
  selectBtn.parentNode.removeChild(selectBtn);
};

if (form) form.addEventListener("submit", handleSubmit);

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

var hanldeBtnOver = function hanldeBtnOver() {
  if (toggleValue === true) {
    userCommentFirstdBtn.style.display = "block";
    toggleValue = false;
  }
};

var hanldeBtnLeave = function hanldeBtnLeave() {
  if (toggleValue === false) {
    userCommentFirstdBtn.style.display = "none";
    userCommentSecondBtn.style.display = "none";
    toggleValue = true;
  }
};

var handleDeleteBtn = function handleDeleteBtn() {
  if (toggleValue === false) {
    userCommentSecondBtn.style.display = "flex";
    userCommentSecondBtn.style.marginLeft = "-5px";
    userCommentSecondBtn.style.top = "50px";
    userCommentSecondBtn.style.position = "absolute";
    toggleValue = true;
  } else {
    userCommentSecondBtn.style.display = "none";
    userCommentSecondBtn.style.marginLeft = "-5px";
    userCommentSecondBtn.style.top = "50px";
    userCommentSecondBtn.style.position = "absolute";
    toggleValue = false;
  }
};

videoCommentsBox.addEventListener("keydown", handleStop);
videoCommentTextarea.addEventListener("click", handleText);
videoCommentTextarea.addEventListener("input", handleText);
videoCommentCancleBtn.addEventListener("click", hanldeTextCancle);
deleteBtn && deleteBtn.addEventListener("click", handleDelete, false);
userCommentFirstdBtn.addEventListener("click", handleDeleteBtn);
userCommentContainerBox.addEventListener("mouseover", hanldeBtnOver);
userCommentContainerBox.addEventListener("mouseleave", hanldeBtnLeave);