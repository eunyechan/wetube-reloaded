const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

<<<<<<< HEAD
const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(span);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
=======
const handleSubmit = (event) => {
>>>>>>> 9442ec1f0399d8c3ffc93b309538c16da72cffad
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
<<<<<<< HEAD
  const response = await fetch(`/api/videos/${videoId}/comment`, {
=======
  fetch(`/api/videos/${videoId}/comment`, {
>>>>>>> 9442ec1f0399d8c3ffc93b309538c16da72cffad
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
<<<<<<< HEAD
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
=======
>>>>>>> 9442ec1f0399d8c3ffc93b309538c16da72cffad
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
