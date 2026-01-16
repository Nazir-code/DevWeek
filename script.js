/* ========================================
   TECH COMMUNITY CLUB - JAVASCRIPT
   Form validation, localStorage, and UI logic
   ======================================== */

// ========== DATA STORAGE KEY ==========
const STORAGE_KEY = 'tcc_registrations';

// ========== DOM ELEMENTS ==========
const registrationForm = document.getElementById('registrationForm');
const registrationPage = document.getElementById('registrationPage');
const successPage = document.getElementById('successPage');
const successNameSpan = document.getElementById('successName');
const memberCountSpan = document.getElementById('memberCount');

// ========== EVENT LISTENERS ==========
// Listen for form submission
registrationForm.addEventListener('submit', handleFormSubmit);

// Real-time validation for email field (duplicate check)
document.getElementById('email').addEventListener('blur', validateEmail);

// ========== MAIN FUNCTIONS ==========

/**
 * Handle form submission
 * Validates form, checks for duplicates, saves data, shows success page
 */
function handleFormSubmit(event) {
    event.preventDefault();

    // Clear all previous error messages
    clearAllErrors();

    // Validate all form fields
    if (!validateForm()) {
        return; // Stop if validation fails
    }

    // Get form data as an object
    const userData = collectFormData();

    // Check if email already exists (prevent duplicates)
    if (isEmailRegistered(userData.email)) {
        showError('email', 'This email is already registered!');
        return;
    }

    // Save user to localStorage
    saveUserToStorage(userData);

    // Show success page
    showSuccessPage(userData.fullName);

    // Scroll to success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Collect all form data into a single object
 * Returns an object with user information
 */
function collectFormData() {
    const interests = getCheckedInterests();

    return {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim().toLowerCase(),
        whatsapp: document.getElementById('whatsapp').value.trim(),
        level: document.getElementById('level').value,
        interests: interests,
        motivation: document.getElementById('motivation').value.trim(),
        registeredAt: new Date().toISOString() // Timestamp for record-keeping
    };
}

/**
 * Get all checked interests (multiple selections)
 * Returns an array of selected interests
 */
function getCheckedInterests() {
    const checkboxes = document.querySelectorAll('input[name="interests"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// ========== VALIDATION FUNCTIONS ==========

/**
 * Validate entire form
 * Checks all required fields and returns true if all valid
 */
function validateForm() {
    let isValid = true;

    // Validate full name
    if (!validateRequired('fullName', 'Please enter your full name')) {
        isValid = false;
    }

    // Validate email
    if (!validateEmail()) {
        isValid = false;
    }

    // Validate phone number
    if (!validateRequired('whatsapp', 'Please enter your WhatsApp number')) {
        isValid = false;
    }

    // Validate level selection
    if (!validateRequired('level', 'Please select your experience level')) {
        isValid = false;
    }

    // Validate at least one interest selected
    if (!validateInterests()) {
        isValid = false;
    }

    // Validate motivation
    if (!validateRequired('motivation', 'Please tell us your motivation')) {
        isValid = false;
    }

    return isValid;
}

/**
 * Validate required field (not empty)
 */
function validateRequired(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();

    if (value === '' || value === undefined) {
        showError(fieldId, errorMessage);
        return false;
    }

    clearError(fieldId);
    return true;
}

/**
 * Validate email format and check for duplicates
 */
function validateEmail() {
    const emailField = document.getElementById('email');
    const email = emailField.value.trim();

    // Check if empty
    if (email === '') {
        showError('email', 'Please enter your email address');
        return false;
    }

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        return false;
    }

    clearError('email');
    return true;
}

/**
 * Validate that at least one interest is selected
 */
function validateInterests() {
    const checkboxes = document.querySelectorAll('input[name="interests"]:checked');

    if (checkboxes.length === 0) {
        showError('interests', 'Please select at least one interest');
        return false;
    }

    clearError('interests');
    return true;
}

// ========== ERROR HANDLING FUNCTIONS ==========

/**
 * Display error message for a field
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + 'Error');

    // Add error styling to field
    if (field && field.type !== 'hidden') {
        field.classList.add('error');
    }

    // Display error message
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

/**
 * Clear error message for a field
 */
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + 'Error');

    if (field) {
        field.classList.remove('error');
    }

    if (errorSpan) {
        errorSpan.textContent = '';
    }
}

/**
 * Clear all error messages in the form
 */
function clearAllErrors() {
    const errorSpans = document.querySelectorAll('.error-message');
    errorSpans.forEach(span => {
        span.textContent = '';
    });

    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
}

// ========== LOCAL STORAGE FUNCTIONS ==========

/**
 * Get all registered users from localStorage
 * Returns an array of user objects
 */
function getAllRegisteredUsers() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Save a new user to localStorage
 */
function saveUserToStorage(userData) {
    const allUsers = getAllRegisteredUsers();
    allUsers.push(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsers));
}

/**
 * Check if an email is already registered
 * Returns true if email exists, false otherwise
 */
function isEmailRegistered(email) {
    const allUsers = getAllRegisteredUsers();
    return allUsers.some(user => user.email === email.toLowerCase());
}

/**
 * Get total number of registered users
 */
function getTotalRegisteredUsers() {
    return getAllRegisteredUsers().length;
}

// ========== SUCCESS PAGE FUNCTIONS ==========

/**
 * Show success page and hide registration form
 */
function showSuccessPage(userName) {
    registrationPage.classList.add('hidden');
    successPage.classList.remove('hidden');

    // Display user's name in success message
    successNameSpan.textContent = userName;

    // Update total member count
    memberCountSpan.textContent = getTotalRegisteredUsers();
}

/**
 * Reset form and return to registration page
 * This allows another person to register
 */
function resetForm() {
    registrationForm.reset();
    clearAllErrors();

    registrationPage.classList.remove('hidden');
    successPage.classList.add('hidden');

    // Focus on first field for better UX
    document.getElementById('fullName').focus();
}

// ========== INITIALIZATION FUNCTION ==========

/**
 * Initialize the application on page load
 * This sets up initial state and displays member count
 */
function initializeApp() {
    console.log('TCC Registration Platform initialized');
    console.log(`Current registered members: ${getTotalRegisteredUsers()}`);
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ========== HELPFUL DEBUGGING FUNCTION (Optional) ==========
/**
 * View all registered users in console
 * Type: viewAllRegistrations() in browser console
 */
function viewAllRegistrations() {
    const allUsers = getAllRegisteredUsers();
    console.table(allUsers);
    return allUsers;
}

/**
 * Clear all registrations (useful for testing)
 * Type: clearAllRegistrations() in browser console
 */
function clearAllRegistrations() {
    localStorage.removeItem(STORAGE_KEY);
    console.log('All registrations cleared!');
}
