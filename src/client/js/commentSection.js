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
const userCommentContainerBox = document.querySelector(
  ".user__comment__container-box"
);
const deleteBtns = document.getElementsByClassName(
  "user__comment__deleteBtn-span"
);
const userCommentFirstdBtn = document.querySelector(
  ".user__comment__hover-firstbtn"
);
const userCommentSecondBtn = document.getElementById("user__comment-deleteBtn");

let toggleValue = true;

const addComment = (text, id) => {
  locationReloadSubmit();
  // const videoComments = document.querySelector(".video__comments ul");
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

const locationReloadSubmit = () => {
  setTimeout("location.reload()");
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
  const comment = event.target.parentNode.parentNode.parentNode;
  const commentId = comment.dataset.id;
  console.log(commentId);
  const response = await fetch(`/api/videos/${commentId}/commentDelete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });
  if (response.status === 200) {
    locationReloadDelete();
  }
};

const locationReloadDelete = () => {
  setTimeout("location.reload()");
  if (window.location.reload === true) {
    videoCommentList.style.display = "none";
  }
};

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
  }
};
const hanldeBtnLeave = () => {
  if (toggleValue === false) {
    userCommentFirstdBtn.style.display = "none";
    userCommentSecondBtn.style.display = "none";
    toggleValue = true;
  }
};

const handleDeleteBtn = () => {
  console.log("asd");
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
if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtns) {
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", handleDelete);
  }
}
userCommentFirstdBtn.addEventListener("click", handleDeleteBtn);
userCommentContainerBox.addEventListener("mouseover", hanldeBtnOver);
userCommentContainerBox.addEventListener("mouseleave", hanldeBtnLeave);
