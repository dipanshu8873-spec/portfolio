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

/* ================= Certificate Carousel ================= */

const certCarousel = document.querySelector(".cert-carousel");
const certSlides = document.querySelectorAll(".cert-slide");
const certPrevBtn = document.querySelector(".cert-nav-prev");
const certNextBtn = document.querySelector(".cert-nav-next");
const certDots = document.querySelectorAll(".cert-dot");
const certProgressFill = document.querySelector(".cert-progress-fill");
const certMainContainer = document.querySelector(".cert-main-container");

let currentCertIndex = 0;
let certAutoSlideTimer = null;

const totalCertificates = certSlides.length;

// Show certificate slide
function showCertSlide(index) {
    // Update slides
    certSlides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
            slide.classList.add("active");
        }
    });

    // Update dots
    certDots.forEach((dot, i) => {
        dot.classList.remove("active");
        if (i === index) {
            dot.classList.add("active");
        }
    });

    // Update progress bar
    const progress = ((index + 1) / totalCertificates) * 100;
    certProgressFill.style.width = progress + "%";
}

// Next certificate
function nextCertificate() {
    currentCertIndex = (currentCertIndex + 1) % totalCertificates;
    showCertSlide(currentCertIndex);
}

// Previous certificate
function prevCert() {
    currentCertIndex = (currentCertIndex - 1 + totalCertificates) % totalCertificates;
    showCertSlide(currentCertIndex);
}

// Start auto sliding
function startCertAutoSlide() {
    if (!certAutoSlideTimer) {
        certAutoSlideTimer = setInterval(nextCertificate, 2000);
    }
}

// Stop auto sliding
function stopCertAutoSlide() {
    if (certAutoSlideTimer) {
        clearInterval(certAutoSlideTimer);
        certAutoSlideTimer = null;
    }
}

// Event listeners
if (certPrevBtn && certNextBtn && certCarousel) {
    // Navigation buttons
    certPrevBtn.addEventListener("click", () => {
        stopCertAutoSlide();
        prevCert();
        startCertAutoSlide();
    });

    certNextBtn.addEventListener("click", () => {
        stopCertAutoSlide();
        nextCertificate();
        startCertAutoSlide();
    });

    // Pause on hover
    certMainContainer.addEventListener("mouseenter", () => {
        stopCertAutoSlide();
    });

    certMainContainer.addEventListener("mouseleave", () => {
        startCertAutoSlide();
    });

    // Dot click
    certDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            stopCertAutoSlide();
            currentCertIndex = index;
            showCertSlide(currentCertIndex);
            startCertAutoSlide();
        });
    });

    // Initialize
    showCertSlide(0);
    startCertAutoSlide();
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