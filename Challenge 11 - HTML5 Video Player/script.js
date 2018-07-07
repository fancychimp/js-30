const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('#fullscreen');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let isFullscreen = false;

function handleFullscreen() {
  if (isFullscreen == false) {
    player.setAttribute("style", "max-width: none; width: 100%;");
    isFullscreen = true;
  } else if (isFullscreen == true) {
    player.setAttribute("style", "max-width: 750px; width: 100%;");
    isFullscreen = false;
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

fullscreenButton.addEventListener('click', handleFullscreen);
fullscreenButton.addEventListener('keyup', (e) => {
  if (e.key == 'Escape' && isFullscreen == true) {
    player.setAttribute("style", "max-width: 750px; width: 100%;");
    isFullscreen = false;
  }
})

let mousedown = false;

ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', mousedown && handleRange));
ranges.forEach(range => range.addEventListener('mousedown', () => mousedown = true));
ranges.forEach(range => range.addEventListener('mouseup', () => mousedown = false));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
