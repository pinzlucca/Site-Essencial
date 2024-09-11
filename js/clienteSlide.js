let currentSlide = 0;
const slides = document.querySelector('.slides-Clientes');
const totalSlides = document.querySelectorAll('.slideCliente').length;

function showSlide(index) {
slides.style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
currentSlide = (currentSlide + 1) % totalSlides;
showSlide(currentSlide);
}

setInterval(nextSlide, 4000);

document.addEventListener('DOMContentLoaded', () => {
showSlide(currentSlide);
});

//mobile

const slidesC = document.querySelectorAll(".slidesC img");
let slideIndex = 0;
let intervalId = null;

//initializeSlider()
document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){
    if(slidesC.length > 0){
        slidesC[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlideMobile, 4000);
    }
}

function showSlideMobile(index){
    if(index >= slidesC.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slidesC.length - 1;
    }

    slidesC.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slidesC[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    clearInterval(intervalId)
    slideIndex--;
    showSlideMobile(slideIndex);
}

function nextSlideMobile(){
    slideIndex++;
    showSlideMobile(slideIndex);
}