// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const navbar = document.getElementById('navbar');
const downloadBtn = document.getElementById('download-resume');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(17, 17, 27, 0.95)';
    } else {
        navbar.style.background = 'rgba(17, 17, 27, 0.9)';
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Handle hero section separately for active nav
function updateActiveNavLinkWithHero() {
    const scrollPosition = window.scrollY;
    
    // Check if we're at the top (hero section)
    if (scrollPosition < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    } else {
        updateActiveNavLink();
    }
}

window.addEventListener('scroll', updateActiveNavLinkWithHero);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.education-item, .experience-item, .project-card, .skill-category, .contact-item, .achievement-item');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Staggered animation for skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    tag.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach(tag => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// TODO:

// Download Resume functionality
downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create resume content
    const resumeContent = "";
    
    // Create and download file
    const blob = new Blob([resumeContent], { type: 'document/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Vivian_Ludrick_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show feedback
    showDownloadFeedback();
});


function showDownloadFeedback() {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #89b4fa;
        color: #1e1e2e;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        animation: fadeInOut 3s ease;
    `;
    feedback.textContent = 'Resume downloaded successfully!';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        document.body.removeChild(feedback);
        document.head.removeChild(style);
    }, 3000);
}

// Typing effect for hero title (enhanced)
function typeWriter() {
    const heroName = document.querySelector('.hero-name');
    const text = 'VIVIAN LUDRICK';
    let index = 0;
    
    heroName.textContent = '';
    
    function type() {
        if (index < text.length) {
            heroName.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150);
        } else {
            // Add cursor blink effect temporarily
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            cursor.style.marginLeft = '5px';
            
            const blinkStyle = document.createElement('style');
            blinkStyle.textContent = `
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(blinkStyle);
            heroName.appendChild(cursor);
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.parentNode.removeChild(cursor);
                }
                document.head.removeChild(blinkStyle);
            }, 3000);
        }
    }
    
    type();
}

// Enhanced scroll-triggered animations
function createScrollAnimation() {
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .education-grid, .experience-content, .projects-grid, .skills-content, .contact-content');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        scrollObserver.observe(el);
    });
}

// Parallax effect for hero section
function createParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Project cards hover effect enhancement
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(137, 180, 250, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });
}

// Contact form animations
function enhanceContactItems() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.contact-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.contact-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Delay typing effect to ensure other animations load first
    setTimeout(typeWriter, 500);
    
    createScrollAnimation();
    createParallaxEffect();
    enhanceProjectCards();
    enhanceContactItems();
    
    // Initialize active nav link
    updateActiveNavLinkWithHero();
});

// Handle page resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top on logo click
document.querySelector('.nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Preload important elements
function preloadCriticalElements() {
    const criticalElements = document.querySelectorAll('.hero, .navbar, .section-title');
    criticalElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
}

// Initialize preloading
preloadCriticalElements();

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledNavUpdate = throttle(updateActiveNavLinkWithHero, 16);
const throttledNavbarBg = throttle(() => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(17, 17, 27, 0.95)';
    } else {
        navbar.style.background = 'rgba(17, 17, 27, 0.9)';
    }
}, 16);

window.addEventListener('scroll', throttledNavUpdate);
window.addEventListener('scroll', throttledNavbarBg);
