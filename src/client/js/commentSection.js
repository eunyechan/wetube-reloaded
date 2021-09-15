const videoContainer = document.getElementById("videoContainer");
const videoEditDeleteBox = document.getElementById("video__editDelete-box");
const form = document.getElementById("commentForm");
const videoComments = document.getElementById("video__comments-box");
const videoCommentTextarea = document.getElementById("video__comment-textarea");
const videoCommentCancleBtn = document.getElementById(
  "video__comment__cancle-button"
);
const videoCommentWriteBtn = document.getElementById(
  "video__comment__write-button"
);

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  const userAvatar = document.querySelector(".header__avatar");
  const username = document.querySelector(".user__name");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  // const span2 = document.createElement("span");
  // span2.innerText = "❌";
  newComment.style.display = "flex";
  username.style.display = "flex";
  span.style.display = "flex";
  newComment.appendChild(userAvatar);
  newComment.appendChild(username);
  newComment.appendChild(span);
  // span.style.border = "1px, solid, white";
  // newComment.appendChild(span2);
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

const editDeleteVideo = () => {
  if (loggedIn === true) {
    videoEditDeleteBox.style.opacity = 1;
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

if (form) {
  form.addEventListener("submit", handleSubmit);
}

videoComments.addEventListener("keydown", handleStop);
videoCommentTextarea.addEventListener("click", handleText);
videoCommentTextarea.addEventListener("input", handleText);
videoCommentCancleBtn.addEventListener("click", hanldeTextCancle);
