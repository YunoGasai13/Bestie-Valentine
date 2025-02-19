// ✉️ Open Envelope and Show Confetti Effect
function openEnvelope() {
    let envelope = document.querySelector('.envelope');
    envelope.classList.add('open');
    envelope.removeAttribute('onclick'); // Prevent re-closing
    createHeartConfetti();
}

// 🎉 Confetti Effect for Envelope
function createHeartConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 25; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random fall speed
        confettiContainer.appendChild(heart);
    }

    // Remove confetti after 5 seconds
    setTimeout(() => confettiContainer.remove(), 5000);
}

// 📌 Quiz Navigation (One Question at a Time)
function nextQuestion(questionNum) {
    document.getElementById(`question-${questionNum}`).classList.add("hidden");
    document.getElementById(`question-${questionNum + 1}`).classList.remove("hidden");
}

function prevQuestion(questionNum) {
    document.getElementById(`question-${questionNum}`).classList.add("hidden");
    document.getElementById(`question-${questionNum - 1}`).classList.remove("hidden");
}

// ✅ Enable "Next" Button After Selecting an Answer
function enableNext(questionNum) {
    document.getElementById(`next-${questionNum}`).disabled = false;
}

// 📊 Calculate Quiz Score & Show Modal
function calculateScore() {
    let totalQuestions = document.querySelectorAll('.question-block').length;
    let selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');

    // ✅ FIX: Ensure all questions are answered
    if (selectedAnswers.length < totalQuestions) {
        alert("Please answer all questions before submitting!");
        return;
    }

    let score = 0;
    selectedAnswers.forEach(answer => {
        score += parseInt(answer.value);
    });

    let resultText = "";
    if (score === 5) {
        resultText = "🥳 You're the ultimate bestie! I couldn't ask for a better friend! 💕";
    } else if (score >= 3) {
        resultText = "😆 Almost perfect! But we need to hang out more!";
    } else {
        resultText = "🤨 Hmm… are you even my best friend?! Jk, I still love you! 😂";
    }

    // ✅ Show result inside modal
    document.getElementById("modalText").innerText = resultText;
    document.getElementById("resultModal").style.display = "flex"; 

    // ✅ Store result in localStorage (optional)
    localStorage.setItem("quizResult", resultText);
}

// 🎯 Close modal and redirect to valentine.html
function closeModal() {
    document.getElementById("resultModal").style.display = "none";
    window.location.href = "valentine.html"; // Redirect to valentine.html
}

// ➡️ Redirection Functions
function goToValentine() {
    window.location.href = "valentine.html";
}

function goToCarousel() {
    window.location.href = "carousel.html";
}

function goBackHome() {
    window.location.href = "index.html";
}

// 💌 Move the "No" Button on Valentine Page
function moveNoButton() {
    let noButton = document.getElementById('noButton');
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 50);
    noButton.style.left = x + 'px';
    noButton.style.top = y + 'px';
}

// 🖼️ Image Carousel Logic
document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".carousel-item");
    let dotsContainer = document.getElementById("dots-container");

    if (images.length === 0) return;

    let currentSlide = 0;

    // Ensure first image is visible
    images.forEach((img, index) => img.style.display = index === 0 ? "block" : "none");

    // ⬅️➡️ Carousel Navigation
    function nextSlide() {
        images[currentSlide].style.display = "none";
        document.querySelectorAll(".dot")[currentSlide]?.classList.remove("active");

        currentSlide = (currentSlide + 1) % images.length;

        images[currentSlide].style.display = "block";
        document.querySelectorAll(".dot")[currentSlide]?.classList.add("active");
    }

    function prevSlide() {
        images[currentSlide].style.display = "none";
        document.querySelectorAll(".dot")[currentSlide]?.classList.remove("active");

        currentSlide = (currentSlide - 1 + images.length) % images.length;

        images[currentSlide].style.display = "block";
        document.querySelectorAll(".dot")[currentSlide]?.classList.add("active");
    }

    // ⏺️ Jump to Specific Slide
    function goToSlide(index) {
        images[currentSlide].style.display = "none";
        document.querySelectorAll(".dot")[currentSlide]?.classList.remove("active");

        currentSlide = index;

        images[currentSlide].style.display = "block";
        document.querySelectorAll(".dot")[currentSlide]?.classList.add("active");
    }

    // 🔵 Create Dots for Each Image in Carousel
    if (dotsContainer) {
        dotsContainer.innerHTML = ""; // Clear previous dots
        for (let i = 0; i < images.length; i++) {
            let dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.setAttribute("onclick", `goToSlide(${i})`);
            dotsContainer.appendChild(dot);
        }
    }

    // Attach functions globally
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    window.goToSlide = goToSlide;
});
