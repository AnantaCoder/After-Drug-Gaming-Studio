import { startTHREE } from './three'

const btn = document.getElementById("play")
btn.addEventListener('click', (() => {
    
})());

document.addEventListener('mousehover', () => {

})

document.addEventListener('dblclick', function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

/**
 * Progress Bar
 */
document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const progressContainer = document.getElementById("progress-container");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById('background-music');

    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;

        if (progress >= 100) {
            clearInterval(loadingInterval);
            progressContainer.style.opacity = "0";

            setTimeout(() => {
                progressContainer.style.display = "none";
                mainContent.style.display = "block";
                startTHREE();
                
                try {
                    music.play().catch(() => {
                        //play music automatically
                        music.play();

                    });
                } catch (error) {
                    console.log("Error playing audio:", error);
                }
            }, 500);
        }
    }, 30); 

    // music controls 
    let isPlaying = false;
    btn.onclick = () => {
        if (isPlaying) {
            music.pause();
        } else {
            music.play();
        }
        isPlaying = !isPlaying;
    };
});