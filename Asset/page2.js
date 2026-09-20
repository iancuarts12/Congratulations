const messages = document.querySelectorAll(".message2");
const nextButton = document.querySelector("[data-next-message]") || document.getElementById("nextButton");
const progressTracker = document.getElementById("progressTracker");
const herImage = document.querySelector(".her img");

let currentIndex = 0;
let typing = false;

if (messages.length && progressTracker) {
    messages.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("progress-dot");
        if (index === 0) dot.classList.add("active");
        progressTracker.appendChild(dot);
    });
}

function typeLine(element, speed = 30) {
    return new Promise(resolve => {
        const text = element.dataset.text;
        element.textContent = "";
        element.style.visibility = "visible";
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

async function typeMessage(message) {
    if (typing) return;
    typing = true;
    
    if (nextButton) {
        nextButton.disabled = true;
        nextButton.classList.remove("is-ready");
        nextButton.classList.add("is-locked");
    }
    
    message.classList.remove("typing-complete");

    const paragraphs = message.querySelectorAll("p");
    for (const paragraph of paragraphs) {
        await typeLine(paragraph, 30);
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    typing = false;
    
    message.classList.add("typing-complete");
    if (nextButton) {
        nextButton.disabled = false;
        nextButton.classList.remove("is-locked");
        nextButton.classList.add("is-ready");
    }
}

function updateUIProgress(index) {
    const dots = document.querySelectorAll(".progress-dot");
    dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === index);
    });

    if (herImage) {
        herImage.classList.add("refresh-pop");
        setTimeout(() => herImage.classList.remove("refresh-pop"), 600);
    }
}

messages.forEach(message => {
    const paragraphs = message.querySelectorAll("p");
    paragraphs.forEach(paragraph => {
        paragraph.dataset.text = paragraph.textContent;
        paragraph.style.visibility = "hidden";
    });
});

if (messages.length) {
    messages[0].classList.add("is-visible");
    typeMessage(messages[0]);
}

if (messages.length && nextButton) {
    nextButton.addEventListener("click", () => {
        if (typing) return;

        messages[currentIndex].classList.remove("is-visible");

        currentIndex = (currentIndex + 1) % messages.length;

        const nextMessage = messages[currentIndex];

        const paragraphs = nextMessage.querySelectorAll("p");
        paragraphs.forEach(paragraph => {
            paragraph.textContent = paragraph.dataset.text;
            paragraph.style.visibility = "hidden";
        });

        nextMessage.classList.add("is-visible");

        updateUIProgress(currentIndex);
        typeMessage(nextMessage);
    });
}
