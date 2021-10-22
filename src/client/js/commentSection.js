import fetch from "node-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoCommentsBox = document.getElementById("video__comments-box");
const videoCommentTextarea = document.getElementById("video__comment-textarea");
const videoCommentList = document.querySelector(".video__comment");
const videoCommentCancleBtn = document.getElementById(
  "video__comment__cancle-button"
);
const videoCommentWriteBtn = document.getElementById(
  "video__comment__write-button"
);
const userCommentContainerBox = document.getElementsByClassName(
  "user__comment__container-box"
);
const deleteBtns = document.getElementsByClassName(
  "user__comment__deletebtn-span"
);

const userCommentFirstdBtn = document.getElementsByClassName(
  "user__comment__hover-firstbtn"
);
const userCommentSecondBtn = document.getElementsByClassName(
  "user__comment-deletebtn"
);

let toggleValue = true;

const addComment = (text, id) => {
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
};

// const locationReloadSubmit = () => {

// };

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    addComment(text);
  }
};

const handleDelete = async (event) => {
  const comment =
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  const commentId = comment.dataset.id;
  console.log(comment);
  console.log(commentId);
  const response = await fetch(`/api/videos/${commentId}/commentDelete`, {
    method: "DELETE",
  });

  if (response.status === 201) {
    comment.remove();
  }
};

const handleStop = (e) => {
  e.stopPropagation();
};

const inputFocus = () => {
  videoCommentTextarea.style.borderBottom =
    "1px solid rgba(238, 238, 238, 0.6)";
};
const inputBlur = () => {
  videoCommentTextarea.style.borderBottom =
    "1px solid rgba(238, 238, 238, 0.2)";
};

const handleText = () => {
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

const hanldeTextCancle = () => {
  const textarea = form.querySelector("textarea");
  videoCommentCancleBtn.style.display = "none";
  videoCommentWriteBtn.style.display = "none";
  textarea.value = "";
};

const hanldeBtnLeave = () => {
  if (toggleValue === false) {
    for (let i = 0; i < userCommentSecondBtn.length; i++) {
      userCommentSecondBtn[i].style.display = "none";
      toggleValue = true;
    }
  }
};

const handleDeleteBtn = () => {
  if (toggleValue === true) {
    for (let i = 0; i < userCommentSecondBtn.length; i++) {
      userCommentSecondBtn[i].style.display = "flex";
      userCommentSecondBtn[i].style.marginLeft = "-40px";
      userCommentSecondBtn[i].style.top = "50px";
      userCommentSecondBtn[i].style.position = "absolute";
    }
    toggleValue = false;
  } else {
    for (let i = 0; i < userCommentSecondBtn.length; i++) {
      userCommentSecondBtn[i].style.display = "none";
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
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", handleDelete);
  }
}

if (userCommentFirstdBtn) {
  for (let i = 0; i < userCommentFirstdBtn.length; i++) {
    userCommentFirstdBtn[i].addEventListener("click", handleDeleteBtn);
  }
}

if (userCommentContainerBox) {
  for (let i = 0; i < userCommentContainerBox.length; i++) {
    userCommentContainerBox[i].addEventListener("mouseleave", hanldeBtnLeave);
  }
}
