/* ==================== DEVWEEK - Modern JavaScript ==================== */

/**
 * DEVWEEK Event Website - JavaScript
 * Handles navigation, animations, form validation, and interactive features
 */

// ==================== DOM Elements ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.logo');

// ==================== NAVIGATION ==================== 

/**
 * Toggle hamburger menu
 */
function toggleHamburger() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Close menu when link is clicked
 */
function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

/**
 * Close menu when clicking outside
 */
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        closeMenu();
    }
});

/**
 * Close menu with Escape key
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

/**
 * Update active nav link based on current page
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Scroll to top when logo is clicked
 */
if (logo) {
    logo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== SCROLL ANIMATIONS ====================

/**
 * Observe elements for scroll-based animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatableElements = document.querySelectorAll(
        '.feature-card, .program-card, .speaker-card, .event-card, .about-card, .stat-item'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// ==================== FORM VALIDATION ====================

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = field.nextElementSibling;
    
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

/**
 * Clear field error
 */
function clearError(field) {
    field.classList.remove('error');
    const errorElement = field.nextElementSibling;
    
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.classList.remove('show');
    }
}

/**
 * Validate form fields
 */
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'Ce champ est obligatoire');
            isValid = false;
        } else {
            clearError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            showFieldError(input, 'Adresse email invalide');
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (validateForm(form)) {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Save to localStorage (optional)
        const existingData = JSON.parse(localStorage.getItem('devweekUsers') || '[]');
        existingData.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('devweekUsers', JSON.stringify(existingData));

        // Show success message
        showSuccessMessage(form);
    }
}

/**
 * Show success message after form submission
 */
function showSuccessMessage(form) {
    const formContainer = form.closest('.form-container');
    const formHTML = form.innerHTML;
    
    form.innerHTML = `
        <div class="success-message fade-in">
            <div class="success-icon">✓</div>
            <h3>Merci!</h3>
            <p>Votre message a été reçu avec succès. Nous vous répondrons bientôt.</p>
            <button type="button" class="btn btn-primary btn-sm" onclick="window.location.reload()">
                Retour
            </button>
        </div>
    `;

    // Store original HTML for potential reset
    form.dataset.originalHtml = formHTML;
}

// ==================== ATTACH EVENT LISTENERS ====================

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleHamburger);
    }

    // Nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);

        // Clear error on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    clearError(input);
                }
            });

            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    showFieldError(input, 'Ce champ est obligatoire');
                } else if (input.type === 'email' && !isValidEmail(input.value)) {
                    showFieldError(input, 'Adresse email invalide');
                } else {
                    clearError(input);
                }
            });
        });
    });
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Get current page name
 */
function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
}

/**
 * Add staggered animation delays to elements
 */
function addStaggeredDelays(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.setProperty('--delay', `${index * 0.1}s`);
    });
}

// ==================== INITIALIZATION ====================

/**
 * Initialize all features when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DEVWEEK initialized');

    // Update active nav link
    updateActiveNavLink();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize event listeners
    initEventListeners();

    // Add staggered delays to cards
    addStaggeredDelays('.feature-card');
    addStaggeredDelays('.program-card');
    addStaggeredDelays('.speaker-card');
    addStaggeredDelays('.event-card');
    addStaggeredDelays('.about-card');

    // Log reduced motion preference
    if (prefersReducedMotion()) {
        console.log('🎬 Reduced motion is enabled');
    }
});

// ==================== DEVWEEK SPECIFIC FEATURES ====================

/**
 * Count registered users (from localStorage)
 */
function getRegisteredUsersCount() {
    const users = JSON.parse(localStorage.getItem('devweekUsers') || '[]');
    return users.length;
}

/**
 * Get statistics dashboard
 */
function getDashboardStats() {
    return {
        participants: getRegisteredUsersCount() + 500,
        speakers: 20,
        workshops: 15,
        days: 5
    };
}

/**
 * Update stats on dashboard (if exists)
 */
function updateStatsDisplay() {
    const stats = getDashboardStats();
    
    // Update participant count
    const participantStat = document.querySelector('[data-stat="participants"]');
    if (participantStat) {
        participantStat.textContent = stats.participants;
    }
}

// ==================== PAGE-SPECIFIC CODE ====================

// Initialize page-specific features based on current page
const currentPage = getCurrentPage();

if (currentPage === 'index.html' || currentPage === '') {
    // Homepage specific features
    document.addEventListener('DOMContentLoaded', () => {
        updateStatsDisplay();
    });
}

if (currentPage === 'inscription.html') {
    // Registration page specific features
    document.addEventListener('DOMContentLoaded', () => {
        const registrationForm = document.querySelector('.registration-form');
        if (registrationForm) {
            console.log('✍️ Registration form loaded');
        }
    });
}

// ==================== ERROR HANDLING ====================

/**
 * Global error handler
 */
window.addEventListener('error', (e) => {
    console.error('❌ Error:', e.message);
});

// ==================== CONSOLE LOG ====================
console.log('%c🚀 DEVWEEK - La Semaine des Développeurs', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cCode • Learn • Build • Connect', 'font-size: 14px; color: #8b5cf6;');
