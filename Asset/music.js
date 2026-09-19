const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const musicEnabled = localStorage.getItem("musicEnabled");

function updateMusicButton(){
    if (music.paused){
        musicButton.textContent = "♫"; 

        musicButton.setAttribute(
            "aria-label", "Play Music"
        );
    } else {
        musicButton.textContent = "🔇"; 
        musicButton.setAttribute( "aria-label", "Mute music" ); 
    }
}