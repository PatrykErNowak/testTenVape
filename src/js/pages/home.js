// Video
const headerVideoEl = document.querySelector('.header__video-c video');

headerVideoEl.playbackRate = 0.8;

// Change video quality depends of screen size
const videoQuality = window.screen.height > 1080 ? '1080' : window.screen.height > 720 ? '720' : '';
headerVideoEl.src = `./src/video/header-${videoQuality}p.mp4`;
