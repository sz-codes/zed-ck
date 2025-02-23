// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Typing effect in the editor preview
const codeElement = document.querySelector('.editor-preview pre code');
const originalText = codeElement.innerHTML;
let currentIndex = 0;
function typeCode() {
    codeElement.innerHTML = originalText.slice(0, currentIndex);
    currentIndex++;
    if (currentIndex <= originalText.length) {
        setTimeout(typeCode, 50);
    } else {
        setTimeout(() => {
            currentIndex = 0;
            typeCode();
        }, 5000);
    }
}

// Trigger animations on load
window.addEventListener('load', () => {
    typeCode();
    // Trigger the tagline animation by adding the 'animate' class
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        animatedText.classList.add('animate');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('.feature-card, .ai-feature').forEach(element => {
    element.classList.add('fade-out');
    observer.observe(element);
});

// Parallax and fade effects on scroll for hero text
document.addEventListener('DOMContentLoaded', () => {
    const animatedText = document.querySelector('.animated-text');
    const heroContent = document.querySelector('.hero-content');
    const textContent = document.querySelector('.text-content');
    const ctaButtons = document.querySelector('.cta-buttons');
    let hasAnimated = false;
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight));
    }
    function handleAnimation() {
        if (!hasAnimated && isInViewport(animatedText)) {
            animatedText.classList.add('animate');
            hasAnimated = true;
        }
    }
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const progress = Math.min(scrollPosition / (windowHeight * 0.5), 1);
        textContent.style.transform = `translateY(${progress * 80}px)`;
        ctaButtons.style.transform = `translateY(${progress * 120}px)`;
        textContent.style.opacity = 1 - progress * 1.2;
        ctaButtons.style.opacity = 1 - progress * 1.5;
        handleAnimation();
    });
    setTimeout(handleAnimation, 100);
});

// Additional inline CSS for fade animations and parallax effects injected via JS
const style = document.createElement('style');
style.textContent = `
.fade-out {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in {
  opacity: 1;
  transform: translateY(0);
}
.scroll-down {
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}
.scroll-up {
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;
}
.text-content,
.cta-buttons {
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
  opacity 0.4s ease-out;
  will-change: transform, opacity;
}
`;
document.head.appendChild(style);
