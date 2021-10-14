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
  // const comment = event.target.parentNode.parentNode.parentNode;
  // const commentId = comment.dataset.id;
  // const videoId = videoContainer.dataset.id;
  // console.log(videoId);

  // const response = await fetch(`/api/videos/${commentId}/commentDelete`, {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // if (response === 200) {
  //   locationReloadDelete();
  //   console.log("asd");
  // } else {
  //   console.log("fail");
  //   console.log(response);
  // }

  const videoId = videoContainer.dataset.id;
  const comment = event.target.parentNode.parentNode.parentNode;
  const user = comment.previousElementSibling;
  console.log(user);
  console.log(videoId);
  const commentId = comment.dataset.id;
  console.log(commentId);

  const { status } = await fetch(
    `/api/videos/${videoId}/comment/${commentId}/commentDelete`,
    {
      method: "DELETE",
    }
  );

  if (status === 200) {
    user.remove();
    comment.remove();
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
