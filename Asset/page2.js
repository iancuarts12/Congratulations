const messages = document.querySelectorAll(".message2");
const nextButton = document.querySelector("[data-next-message]");

let currentIndex = 0;
let typing = false;


/* Type one paragraph */
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


/* Type an entire message */
async function typeMessage(message) {

    if (typing) return;

    typing = true;

    const paragraphs = message.querySelectorAll("p");

    for (const paragraph of paragraphs) {

        await typeLine(paragraph, 30);

        // Pause before typing the next line
        await new Promise(resolve => setTimeout(resolve, 150));

    }

    typing = false;

}


/* Prepare every message */
messages.forEach(message => {

    const paragraphs = message.querySelectorAll("p");

    paragraphs.forEach(paragraph => {

        // Save the original text
        paragraph.dataset.text = paragraph.textContent;

        // Hide it initially
        paragraph.style.visibility = "hidden";

    });

});

if (messages.length) {

    messages[0].classList.add("is-visible");

    typeMessage(messages[0]);

}


/* NEXT button */
if (messages.length && nextButton) {

    nextButton.addEventListener("click", () => {

        // Don't allow changing messages while one is typing
        if (typing) return;


        // Hide current message
        messages[currentIndex].classList.remove("is-visible");


        // Move to next message
        currentIndex = (currentIndex + 1) % messages.length;


        // Get the new message
        const nextMessage = messages[currentIndex];


        // Reset all paragraphs in the new message
        const paragraphs = nextMessage.querySelectorAll("p");

        paragraphs.forEach(paragraph => {

            paragraph.textContent = paragraph.dataset.text;
            paragraph.style.visibility = "hidden";

        });


        // Show the new message
        nextMessage.classList.add("is-visible");


        // Start typing
        typeMessage(nextMessage);

    });

}
