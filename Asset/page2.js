const messages = document.querySelectorAll(".message2");
const nextButton = document.querySelector("[data-next-message]");

if (messages.length && nextButton) {
    let index = 0;

    nextButton.addEventListener("click", () => {
        messages[index].classList.remove("is-visible");
        index = (index + 1) % messages.length;
        messages[index].classList.add("is-visible");
    });
}
