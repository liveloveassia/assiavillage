// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".area-card, .place-card, .about-image, .about-text"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial state for animation
window.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".area-card, .place-card, .about-image, .about-text"
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Trigger animation for elements already in view
  setTimeout(animateOnScroll, 100);
});

// Add scroll event listener for animation
window.addEventListener("scroll", animateOnScroll);

// Read More button functionality
const readMoreBtn = document.querySelector(".read-more-btn");
const additionalContent = document.querySelector(".additional-content");

readMoreBtn.addEventListener("click", () => {
  if (
    additionalContent.style.display === "none" ||
    additionalContent.style.display === ""
  ) {
    additionalContent.style.display = "block";
    readMoreBtn.textContent = "Read Less";
  } else {
    additionalContent.style.display = "none";
    readMoreBtn.textContent = "Read More";
  }
});