import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoCommentsBox = document.getElementById("video__comments-box");
const videoCommentTextarea = document.getElementById("video__comment-textarea");
const videoComments = document.querySelector(".video__comments ul");
const videoCommentList = document.querySelector(".video__comment");
const videoCommentCancleBtn = document.getElementById(
  "video__comment__cancle-button"
);
const videoCommentWriteBtn = document.getElementById(
  "video__comment__write-button"
);
const deleteBtn = document.getElementById("user__comment-deleteBtn");

const addComment = (text, id) => {
  const newComment = document.createElement("li");
  newComment.dataset.commentid = id;
  newComment.className = "video__comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("button");
  span2.innerText = " ❌";
  span2.className = "deleteButton";
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
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
  console.log(selectBtn);
  const response = await fetch(`/api/videos/${id}/commentDelete`, {
    method: "DELETE",
  });
  if (response.status === 201) {
    deleteComment(selectBtn.parentElement);
  }
};

const deleteComment = (selectBtn) => {
  selectBtn.parentNode.removeChild(selectBtn);
  videoCommentList.style.display = "none";
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

videoCommentsBox.addEventListener("keydown", handleStop);
videoCommentTextarea.addEventListener("click", handleText);
videoCommentTextarea.addEventListener("input", handleText);
videoCommentCancleBtn.addEventListener("click", hanldeTextCancle);
deleteBtn && deleteBtn.addEventListener("click", handleDelete, false);
