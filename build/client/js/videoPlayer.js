"use strict";

var video = document.querySelector("video");
var playBtn = document.getElementById("play");
var playBtnIcon = playBtn.querySelector("i");
var muteBtn = document.getElementById("mute");
var muteBtnIcon = muteBtn.querySelector("i");
var volumeRange = document.getElementById("volume");
var currenTime = document.getElementById("currenTime");
var totalTime = document.getElementById("totalTime");
var timeline = document.getElementById("timeline");
var selectValue = document.getElementById("selectValue");
var fullScreenBtn = document.getElementById("fullScreen");
var fullScreenIcon = fullScreenBtn.querySelector("i");
var videoContainer = document.getElementById("videoContainer");
var videoControls = document.querySelector("body");
var controlsTimeout = null;
var controlsMovementTimeout = null;
var volumeValue = 0.5;
video.volume = volumeValue;

var videoKeyButton = function videoKeyButton(e) {
  var keyButton = e.code;

  if (keyButton === "Space") {
    handlePlayClick();
  }

  if (keyButton === "KeyF") {
    handleFullscreen();
  }

  if (keyButton === "KeyM") {
    handleMuteClick();
    var volumeProgress = (volumeRange.value - volumeRange.min) / (volumeRange.max - volumeRange.min) * 100;
    var color = "linear-gradient(90deg, rgb(255,255,255)" + volumeProgress + "%, rgb(189,189,189)" + volumeProgress + "%)";
    volumeRange.style.background = color;
  }
};

var handlePlayClick = function handlePlayClick(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

var handleMuteClick = function handleMuteClick(e) {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

var handleVolumeChange = function handleVolumeChange(event) {
  var value = event.target.value;

  if (video.muted) {
    video.muted = false;
  }

  volumeValue = value;
  video.volume = value;
};

var formatTime = function formatTime(seconds) {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
};

var handleLoadedMetadata = function handleLoadedMetadata() {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

var handleTimeUpdate = function handleTimeUpdate() {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

var handleTimelineProgress = function handleTimelineProgress() {
  var timelineProgress = (timeline.value - timeline.min) / (timeline.max - timeline.min) * 100;
  var color = "linear-gradient(90deg, rgb(255,36,36)" + timelineProgress + "%, rgb(189,189,189)" + timelineProgress + "%)";
  timeline.style.background = color;
};

var hanleVolumeProgress = function hanleVolumeProgress(e) {
  var volumeProgress = (volumeRange.value - volumeRange.min) / (volumeRange.max - volumeRange.min) * 100;
  var color = "linear-gradient(90deg, rgb(255,255,255)" + volumeProgress + "%, rgb(189,189,189)" + volumeProgress + "%)";
  volumeRange.style.background = color;
};

var handleTimelineChange = function handleTimelineChange(event) {
  var value = event.target.value;
  video.currentTime = value;
};

var handleFullscreen = function handleFullscreen() {
  var fullscreen = document.fullscreenElement;

  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

var hideControls = function hideControls() {
  return videoControls.classList.remove("showing");
};

var handleMouseMove = function handleMouseMove() {
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

var handleMouseLeave = function handleMouseLeave() {
  controlsTimeout = setTimeout(hideControls, 3000);
};

var handleEnded = function handleEnded() {
  var id = videoContainer.dataset.id;
  fetch("/api/videos/".concat(id, "/view"), {
    method: "POST"
  });
};

video.addEventListener("click", handlePlayClick);
video.addEventListener("loadeddata", handleLoadedMetadata);
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