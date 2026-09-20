const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    setTimeout(()=>{
        loader.classList.add("hidden");
    }, 1000);
});