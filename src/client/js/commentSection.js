import { async } from "regenerator-runtime";

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
const userCommentContainerBox = document.querySelector(
  ".user__comment__container-box"
);
const userCommentFirstdBtn = document.querySelector(
  ".user__comment__hover-firstbtn"
);
const userCommentSecondBtn = document.getElementById("user__comment-deleteBtn");
const deleteBtn = document.getElementById("user__comment-deleteBtn");

let toggleValue = true;

const addComment = (text, id) => {
  locationReloadSubmit();
  // const newComment = document.createElement("li");
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
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const selectBtn = event.target.parentElement;
  const id = selectBtn.dataset.commentid;
  locationReloadDelete();
  console.log(id);
  const response = await fetch(`/api/videos/${id}/commentDelete`, {
    method: "DELETE",
  });
  if (response.status === 201) {
    deleteComment(id);
  }
};

const locationReloadSubmit = () => {
  setTimeout("location.reload()");
};

const locationReloadDelete = () => {
  setTimeout("location.reload()");
  if (window.location.reload === true) {
    videoCommentList.style.display = "none";
  }
};

const deleteComment = (selectBtn) => {
  selectBtn.parentNode.removeChild(selectBtn);
};

if (form) form.addEventListener("submit", handleSubmit);

const handleStop = (e) => {
  e.stopPropagation();
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

const hanldeBtnOver = () => {
  if (toggleValue === true) {
    userCommentFirstdBtn.style.display = "block";
    toggleValue = false;
  } else {
    hanldeBtnOut();
  }
};
const hanldeBtnOut = () => {
  userCommentFirstdBtn.style.display = "none";
  toggleValue = true;
};

const handleDeleteBtn = () => {
  if (toggleValue === false) {
    toggleValue = true;
    userCommentSecondBtn.style.display = "flex";
    userCommentSecondBtn.style.marginLeft = "-5px";
    userCommentSecondBtn.style.top = "30px";
    userCommentSecondBtn.style.position = "absolute";
    userCommentSecondBtn.style.margintop = "40px";
  } else {
    toggleValue = false;
    userCommentSecondBtn.style.display = "none";
    userCommentSecondBtn.style.marginLeft = "-5px";
    userCommentSecondBtn.style.top = "30px";
    userCommentSecondBtn.style.position = "absolute";
    userCommentSecondBtn.style.margintop = "40px";
  }
};

videoCommentsBox.addEventListener("keydown", handleStop);
videoCommentTextarea.addEventListener("click", handleText);
videoCommentTextarea.addEventListener("input", handleText);
videoCommentCancleBtn.addEventListener("click", hanldeTextCancle);
deleteBtn && deleteBtn.addEventListener("click", handleDelete, false);
userCommentFirstdBtn.addEventListener("click", handleDeleteBtn);
userCommentContainerBox.addEventListener("mouseover", hanldeBtnOver);
userCommentContainerBox.addEventListener("mouseout", hanldeBtnOut);
