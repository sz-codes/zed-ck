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

// Typing effect in the editor preview
const codeElement = document.querySelector('.editor-preview pre code');
if (codeElement) {
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
    typeCode();
}

/* Function to trigger the tagline animation */
function triggerAnimation() {
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        // Remove the class to reset the animation state
        animatedText.classList.remove('animate');
        // Force reflow so the removal is fully processed
        void animatedText.offsetWidth;
        // Increase the delay to 500ms before re-adding the class
        setTimeout(() => {
            animatedText.classList.add('animate');
        }, 500);
    }
}

// Trigger the animation on window load after a 1-second delay
window.addEventListener('load', () => {
    setTimeout(triggerAnimation, 1000);
});

/* Intersection Observer for .feature-card & .ai-feature (fade-in) */
const featureObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};
const featureObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            obs.unobserve(entry.target);
        }
    });
}, featureObserverOptions);

document.querySelectorAll('.feature-card, .ai-feature').forEach(element => {
    element.classList.add('fade-out');
    featureObserver.observe(element);
});

/* Parallax and fade effects on scroll for hero text */
document.addEventListener('DOMContentLoaded', () => {
    const textContent = document.querySelector('.text-content');
    const ctaButtons = document.querySelector('.cta-buttons');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const progress = Math.min(scrollPosition / (windowHeight * 0.5), 1);

        // Apply parallax movement for text and CTA buttons
        if (textContent) textContent.style.transform = `translateY(${progress * 80}px)`;
        if (ctaButtons) ctaButtons.style.transform = `translateY(${progress * 120}px)`;

        // Fade out effect as you scroll
        if (textContent) textContent.style.opacity = 1 - progress * 1.2;
        if (ctaButtons) ctaButtons.style.opacity = 1 - progress * 1.5;
    });
});

/* Highlight active section in navbar while scrolling */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Adjust offset as needed
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav-links a[href*=' + sectionId + ']');
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

/* Replay Animation Button Event Listener */
const replayButton = document.getElementById('replayAnimation');
if (replayButton) {
    replayButton.addEventListener('click', triggerAnimation);
}

/* Intersection Observer for any .hidden-on-load elements (if used) */
document.addEventListener("DOMContentLoaded", () => {
    const hiddenOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const hiddenObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                hiddenObserver.unobserve(entry.target);
            }
        });
    }, hiddenOptions);

    document.querySelectorAll(".hidden-on-load").forEach(el => {
        hiddenObserver.observe(el);
    });
});

/* === NEW: Intersection Observer for #api-costs (line-by-line + table fade) === */
document.addEventListener('DOMContentLoaded', () => {
    const costSection = document.getElementById('api-costs');
    if (!costSection) return; // No cost section, do nothing

    const lines = costSection.querySelectorAll('.line');
    const tableContainer = costSection.querySelector('.table-container');


    // <h2 class="line fade-out">...</h2> etc.

    const costObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal each line in sequence
                lines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('fade-in');
                    }, index * 500); // 500ms delay between lines
                });

                // Reveal the table after all lines are shown
                setTimeout(() => {
                    tableContainer.classList.add('fade-in');
                }, lines.length * 500);

                // Stop observing once triggered
                obs.unobserve(costSection);
            }
        });
    }, { threshold: 0.2 });

    costObserver.observe(costSection);
});
