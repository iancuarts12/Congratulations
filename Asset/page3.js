const slides = document.querySelectorAll(".slide"); 
const nextButton = document.querySelector("[data-next-image]"); 

let currentSlide = 0; if (slides.length && nextButton) { 
    nextButton.addEventListener("click", () => { 
        // Remove the active class from the current image 
        slides[currentSlide].classList.remove("active"); 
        
        // Move to the next image
        currentSlide++; 
        
        // Return to the first image 
        // after reaching the last one 
        if (currentSlide >= slides.length) { 
            currentSlide = 0; 
        } 
        
        // Show the new image 
        slides[currentSlide].classList.add("active"); 
    }); 
}