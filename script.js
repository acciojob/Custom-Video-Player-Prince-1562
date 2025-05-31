const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playButton = player.querySelector('.toggle');
const volumeControl = player.querySelector('input[name="volume"]');
const playbackRateControl = player.querySelector('input[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');

function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
        playButton.textContent = '❚ ❚';
    } else {
        video.pause();
        playButton.textContent = '►';
    }
}

function updateProgress() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function skip() {
    const skipTime = parseFloat(this.dataset.skip);
    video.currentTime += skipTime;
}

function handleVideoError() {
    alert("Video could not be loaded.");
}

video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', scrub);
volumeControl.addEventListener('change', handleRangeUpdate);
playbackRateControl.addEventListener('change', handleRangeUpdate);
skipButtons.forEach(button => button.addEventListener('click', skip));
video.addEventListener('error', handleVideoError);