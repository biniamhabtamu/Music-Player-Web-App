document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progressBar = document.getElementById('progress-bar');
    const playlistItems = document.querySelectorAll('#playlist .list-group-item');
    const currentTimeElement = document.getElementById('current-time');
    const durationElement = document.getElementById('duration');

    let isPlaying = false;
    let currentTrackIndex = 0;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function loadTrack(index) {
        const track = playlistItems[index];
        audio.src = track.getAttribute('data-src');
        document.querySelector('#playlist .active')?.classList.remove('active');
        track.classList.add('active');
        audio.currentTime = 0; // Reset the current time to start
    }

    function playPause() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="bi bi-play-circle"></i>';
        } else {
            audio.play();
            playPauseBtn.innerHTML = '<i class="bi bi-pause-circle"></i>';
        }
        isPlaying = !isPlaying;
    }

    function updateProgressBar() {
        if (audio.duration) {
            const value = (audio.currentTime / audio.duration) * 100;
            progressBar.value = value;
            currentTimeElement.textContent = formatTime(audio.currentTime);
            durationElement.textContent = formatTime(audio.duration);
        }
    }

    function setProgress() {
        const newTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = newTime;
    }

    playPauseBtn.addEventListener('click', playPause);

    prevBtn.addEventListener('click', () => {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
        } else {
            currentTrackIndex = playlistItems.length - 1; // Loop to last track
        }
        loadTrack(currentTrackIndex);
        playPause();
    });

    nextBtn.addEventListener('click', () => {
        if (currentTrackIndex < playlistItems.length - 1) {
            currentTrackIndex++;
        } else {
            currentTrackIndex = 0; // Loop to first track
        }
        loadTrack(currentTrackIndex);
        playPause();
    });

    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playPause();
        });
    });

    audio.addEventListener('timeupdate', updateProgressBar);

    progressBar.addEventListener('input', setProgress);

    // Load the first track initially
    loadTrack(currentTrackIndex);
});
