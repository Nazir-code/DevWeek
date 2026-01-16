/* ========================================
   TECH COMMUNITY CLUB - MAIN SCRIPT
   Mobile menu, scroll animations, form validation
   ======================================== */

// ========== DOM ELEMENTS ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ========== MOBILE MENU TOGGLE ==========

/**
 * Handle hamburger menu click
 * Toggles mobile menu visibility
 */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/**
 * Close menu when a link is clicked
 * Improves mobile UX
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========== SCROLL ANIMATIONS ==========

/**
 * Intersection Observer for scroll animations
 * Animates elements when they enter viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = `${entry.target.classList.contains('slide-up') ? 'slideUp' : 'fadeIn'} 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in');
    animatedElements.forEach(element => {
        if (!element.classList.contains('fade-in') || !element.classList.contains('hero-content')) {
            observer.observe(element);
        }
    });
});

// ========== CONTACT FORM VALIDATION ==========

if (contactForm) {
    /**
     * Handle contact form submission
     * Validates all fields before submission
     */
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Clear previous error states
        clearFormErrors();

        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate fields
        let isValid = true;

        if (name === '') {
            showFieldError('name', 'Veuillez entrer votre nom complet');
            isValid = false;
        }

        if (email === '') {
            showFieldError('email', 'Veuillez entrer votre adresse email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Veuillez entrer une adresse email valide');
            isValid = false;
        }

        if (subject === '') {
            showFieldError('subject', 'Veuillez entrer un sujet');
            isValid = false;
        }

        if (message === '') {
            showFieldError('message', 'Veuillez entrer votre message');
            isValid = false;
        } else if (message.length < 10) {
            showFieldError('message', 'Le message doit contenir au moins 10 caractères');
            isValid = false;
        }

        if (isValid) {
            handleFormSuccess();
        }
    });
}

/**
 * Check if email format is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display error message for a field
 */
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');

    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
    }
}

/**
 * Clear all error states from form
 */
function clearFormErrors() {
    const formFields = contactForm.querySelectorAll('input, textarea');
    const errorMessages = contactForm.querySelectorAll('.error-message');

    formFields.forEach(field => {
        field.classList.remove('error');
    });

    errorMessages.forEach(error => {
        error.textContent = '';
    });
}

/**
 * Handle successful form submission
 * Shows success message and resets form
 */
function handleFormSuccess() {
    const feedbackElement = document.getElementById('formFeedback');

    // Display success message
    feedbackElement.textContent = '✓ Merci! Nous vous répondrons bientôt.';
    feedbackElement.classList.add('success');
    feedbackElement.classList.remove('error');

    // Reset form
    contactForm.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
        feedbackElement.textContent = '';
        feedbackElement.classList.remove('success');
    }, 5000);
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========

/**
 * Handle smooth scrolling for internal links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default for actual anchor links
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();

            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== ACTIVE NAV LINK INDICATOR ==========

/**
 * Update active navigation link based on current page
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');

        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ========== UTILITY: ADD DELAY CSS VARIABLE ==========

/**
 * Calculate stagger delay for animated elements
 */
document.querySelectorAll('[style*="--delay"]').forEach((element, index) => {
    if (!element.style.getPropertyValue('--delay')) {
        const delay = (index * 0.1) + 's';
        element.style.setProperty('--delay', delay);
    }
});

// ========== SCROLL TO TOP FUNCTIONALITY ==========

/**
 * Scroll to top when clicking on TCC logo
 */
document.querySelector('.nav-logo').addEventListener('click', (e) => {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ========== ACCESSIBILITY: KEYBOARD NAVIGATION ==========

/**
 * Handle escape key to close mobile menu
 */
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========== PAGE LOAD ANIMATION ==========

/**
 * Trigger fade-in animation on page load
 */
window.addEventListener('load', () => {
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        element.style.animation = 'fadeIn 0.8s ease-out forwards';
    });
});

// ========== PREVENT ANIMATION ON REDUCED MOTION PREFERENCE ==========

/**
 * Respect user's motion preferences
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-smooth', 'none');
}

// ========== CONSOLE UTILITIES (FOR DEVELOPMENT) ==========

/**
 * Log TCC platform info
 */
console.log('%c🚀 Plateforme Club de Technologie Communautaire', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBienvenue! La plateforme a été chargée avec succès.', 'font-size: 14px; color: #666;');
