// =============================
// Smooth Scroll
// =============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});

// =============================
// Dark / Light Mode
// =============================

const themeBtn = document.querySelector(".theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

    });
}

/* ================= Typing Animation ================= */

const words = [
  "MCA Student",
  "Cybersecurity Enthusiast",
  "Ethical Hacking Learner",
  "Web Developer",
  "Python Programmer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    if(!typing) return;

    const currentWord = words[wordIndex];

    if(!deleting){
        typing.textContent = currentWord.substring(0,charIndex++);
        if(charIndex > currentWord.length){
            deleting = true;
            setTimeout(typeEffect,1200);
            return;
        }
    }else{
        typing.textContent = currentWord.substring(0,charIndex--);
        if(charIndex < 0){
            deleting = false;
            wordIndex = (wordIndex+1)%words.length;
        }
    }

    setTimeout(typeEffect,deleting?50:100);
}

typeEffect();

/* ================= Certificate Auto-Slider ================= */

const certificateSlider = document.querySelector(".certificate-slider");
const sliderContainer = document.querySelector(".certificate-slider-container");
const prevBtn = document.querySelector(".slider-prev");
const nextBtn = document.querySelector(".slider-next");
const dots = document.querySelectorAll(".slider-dots .dot");
const certificates = document.querySelectorAll(".certificate-card");

let currentSlide = 0;
let slidesPerView = 4;
let autoSlideTimer = null;
let isHovering = false;

// Determine slides per view based on screen width
function updateSlidesPerView() {
    if (window.innerWidth <= 480) {
        slidesPerView = 1;
    } else if (window.innerWidth <= 768) {
        slidesPerView = 2;
    } else if (window.innerWidth <= 1200) {
        slidesPerView = 3;
    } else {
        slidesPerView = 4;
    }
}

// Calculate max slides
function getMaxSlides() {
    return Math.max(0, certificates.length - slidesPerView);
}

// Update dot indicators
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.remove("active");
        if (index === currentSlide) {
            dot.classList.add("active");
        }
    });
}

// Slide to specific position
function slideTo(index) {
    const maxSlides = getMaxSlides();
    currentSlide = Math.max(0, Math.min(index, maxSlides));
    
    const slideWidth = certificateSlider.querySelector(".certificate-card").offsetWidth;
    const gap = 25;
    const offset = -(currentSlide * (slideWidth + gap));
    
    certificateSlider.style.transform = `translateX(${offset}px)`;
    updateDots();
}

// Next slide
function nextSlide() {
    const maxSlides = getMaxSlides();
    if (currentSlide < maxSlides) {
        slideTo(currentSlide + 1);
    } else {
        slideTo(0);
    }
}

// Previous slide
function prevSlide() {
    if (currentSlide > 0) {
        slideTo(currentSlide - 1);
    } else {
        slideTo(getMaxSlides());
    }
}

// Auto slide function
function autoSlide() {
    if (!isHovering) {
        nextSlide();
    }
}

// Start auto sliding
function startAutoSlide() {
    autoSlideTimer = setInterval(autoSlide, 3500);
}

// Stop auto sliding
function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
}

// Event listeners
if (prevBtn && nextBtn && certificateSlider) {
    prevBtn.addEventListener("click", () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    // Pause on hover
    sliderContainer.addEventListener("mouseenter", () => {
        isHovering = true;
        stopAutoSlide();
    });

    sliderContainer.addEventListener("mouseleave", () => {
        isHovering = false;
        startAutoSlide();
    });

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            stopAutoSlide();
            slideTo(index);
            startAutoSlide();
        });
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        updateSlidesPerView();
        slideTo(Math.min(currentSlide, getMaxSlides()));
    });

    // Initialize
    updateSlidesPerView();
    startAutoSlide();
}

/* ================= Scroll Reveal ================= */

const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

const hiddenElements=document.querySelectorAll(

".about,.skills,.education,.certificates,.projects,.contact"

);

hiddenElements.forEach((el)=>{

el.classList.add("hidden");

observer.observe(el);

});

// =============================
// EmailJS Contact Form
// =============================

(function () {
    emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY"
    });
})();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";

        emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", contactForm)
            .then(() => {
                alert("Message sent successfully!");
                contactForm.reset();
            })
            .catch((error) => {
                alert("Failed to send message. Please try again.");
                console.error("EmailJS Error:", error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
            });
    });
}