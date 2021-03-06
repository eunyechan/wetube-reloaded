const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const selectValue = document.getElementById("selectValue");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.querySelector("body");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;

video.volume = volumeValue;

const videoKeyButton = (e) => {
  const keyButton = e.code;
  if (keyButton === "Space") {
    handlePlayClick();
  }
  if (keyButton === "KeyF") {
    handleFullscreen();
  }
  if (keyButton === "KeyM") {
    handleMuteClick();
    const volumeProgress =
      ((volumeRange.value - volumeRange.min) /
        (volumeRange.max - volumeRange.min)) *
      100;
    const color =
      "linear-gradient(90deg, rgb(255,255,255)" +
      volumeProgress +
      "%, rgb(189,189,189)" +
      volumeProgress +
      "%)";
    volumeRange.style.background = color;
  }
};

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
    handleLoadedMetadata();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineProgress = () => {
  const timelineProgress =
    ((timeline.value - timeline.min) / (timeline.max - timeline.min)) * 100;
  const color =
    "linear-gradient(90deg, rgb(255,36,36)" +
    timelineProgress +
    "%, rgb(189,189,189)" +
    timelineProgress +
    "%)";
  timeline.style.background = color;

  if (timeline.value === timeline.max) {
    playBtnIcon.classList = "fas fa-play";
  } else {
    playBtnIcon.classList = "fas fa-pause";
  }
};

const hanleVolumeProgress = (e) => {
  const volumeProgress =
    ((volumeRange.value - volumeRange.min) /
      (volumeRange.max - volumeRange.min)) *
    100;
  const color =
    "linear-gradient(90deg, rgb(255,255,255)" +
    volumeProgress +
    "%, rgb(189,189,189)" +
    volumeProgress +
    "%)";
  volumeRange.style.background = color;

  if (volumeRange.value === volumeRange.min) {
    muteBtnIcon.classList = "fas fa-volume-mute";
  } else {
    muteBtnIcon.classList = "fas fa-volume-up";
  }
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

video.addEventListener("click", handlePlayClick);
video.addEventListener("mousemove", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("timeupdate", handleTimelineProgress);
video.addEventListener("ended", handleEnded);
videoControls.addEventListener("input", hanleVolumeProgress);
videoControls.addEventListener("mousemove", hanleVolumeProgress);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
document.addEventListener("keydown", videoKeyButton);
