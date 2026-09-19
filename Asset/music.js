const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const navigationKey = "musicNavigation";
const enabledKey = "musicEnabled";
const timeKey = "musicTime";

music.volume = .3;

const wasNavigation =
    sessionStorage.getItem(navigationKey) === "true";

if (wasNavigation) {

    const savedTime =
        sessionStorage.getItem(timeKey);

    if (savedTime !== null) {
        music.currentTime = parseFloat(savedTime);
    }

} else {

    music.currentTime = 0;
}

sessionStorage.removeItem(navigationKey);

function updateMusicButton() {

    if (music.paused) {

        musicButton.textContent = "🔇";

        musicButton.setAttribute(
            "aria-label",
            "Play music"
        );

    } else {

        musicButton.textContent = "♫";

        musicButton.setAttribute(
            "aria-label",
            "Mute music"
        );
    }
}


musicButton.addEventListener("click", () => {

    if (music.paused) {

        music.play()
            .then(() => {

                sessionStorage.setItem(
                    enabledKey,
                    "true"
                );

                updateMusicButton();

            })
            .catch(error => {

                console.log(
                    "Unable to play music:",
                    error
                );

            });

    } else {

        music.pause();

        sessionStorage.setItem(
            enabledKey,
            "false"
        );

        updateMusicButton();
    }
});

setInterval(() => {

    if (!music.paused) {

        sessionStorage.setItem(
            timeKey,
            music.currentTime
        );
    }

}, 1000);

document.querySelectorAll("a[href]").forEach(link => {

    link.addEventListener("click", () => {

        sessionStorage.setItem(
            navigationKey,
            "true"
        );

        sessionStorage.setItem(
            timeKey,
            music.currentTime
        );
    });

});


const musicEnabled =
    sessionStorage.getItem(enabledKey);

if (musicEnabled === "true") {

    music.play()
        .then(() => {

            updateMusicButton();

        })
        .catch(() => {

            updateMusicButton();

        });

} else {

    updateMusicButton();
}