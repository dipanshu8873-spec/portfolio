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

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

});

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