// ========================================
// DARK MODE / LIGHT MODE TOGGLE
// ========================================

const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const savedMode = localStorage.getItem('theme-mode') || 'light';

// ========================================
// MOBILE HAMBURGER MENU TOGGLE
// ========================================

const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    hamburgerBtn.classList.add('open');
    body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('open');
    body.style.overflow = '';
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Touch support for hamburger
    hamburgerBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Touch support for overlay
    sidebarOverlay.addEventListener('touchend', (e) => {
        e.preventDefault();
        closeSidebar();
    });
}

// Initialize theme
if (savedMode === 'dark') {
    body.classList.add('dark-mode');
    updateModeIcon();
}

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
    updateModeIcon();
});

// Touch support for mode toggle
modeToggle.addEventListener('touchend', (e) => {
    e.preventDefault();
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
    updateModeIcon();
});

function updateModeIcon() {
    const icon = modeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========================================
// COLOR THEME SWITCHING
// ========================================

const colorButtons = document.querySelectorAll('.color-btn');
const savedColor = localStorage.getItem('theme-color') || 'red';

// Initialize color theme
if (savedColor !== 'red') {
    body.classList.add(`theme-${savedColor}`);
    updateColorButtons();
}

colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        
        // Remove all theme classes
        body.classList.remove('theme-red', 'theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
        
        // Add new theme (skip red as it's default)
        if (color !== 'red') {
            body.classList.add(`theme-${color}`);
        }
        
        localStorage.setItem('theme-color', color);
        updateColorButtons();
    });

    // Touch support for color buttons
    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        const color = btn.getAttribute('data-color');
        
        // Remove all theme classes
        body.classList.remove('theme-red', 'theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
        
        // Add new theme (skip red as it's default)
        if (color !== 'red') {
            body.classList.add(`theme-${color}`);
        }
        
        localStorage.setItem('theme-color', color);
        updateColorButtons();
    });
});

function updateColorButtons() {
    colorButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-color') === localStorage.getItem('theme-color')) {
            btn.classList.add('active');
        }
    });
}

// ========================================
// DOWNLOAD CV
// ========================================

function downloadCV() {
  const link = document.createElement('a');
  link.href = 'TamboliHRResume.pdf';
  link.download = 'TamboliHRResume.pdf';
  link.click();
}

// ========================================
// SMOOTH NAVIGATION & ACTIVE LINK
// ========================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function updateActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 300) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scroll on link click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Mobile pe sidebar band karo nav link click ke baad
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });

    // Touch support for nav links
    link.addEventListener('touchend', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Mobile pe sidebar band karo nav link click ke baad
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const message = inputs[2].value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        // Show success
        showFormSuccess();
        
        // Reset form
        contactForm.reset();
        
        // Log form data (in production, send to backend)
        console.log('Form submitted:', { name, email, message });
    });
}

function showFormSuccess() {
    const button = contactForm.querySelector('.btn-submit');
    const originalText = button.textContent;
    
    button.textContent = '✓ Message Sent Successfully!';
    button.style.background = 'linear-gradient(135deg, #00d084, #00a366)';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
    }, 3000);
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#ff4444' : '#00d084'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInAlert 0.3s ease forwards;
        font-weight: 600;
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutAlert 0.3s ease forwards';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// ==========================================================================================================
// TYPING EFFECT WITH BACKSPACE
// =========================================================================================================

const typingText = document.getElementById('typingText');
const typingRoles = [
    'Full Stack Developer',
    'Web Designer',
    'Creative Coder',
    'Problem Solver'
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenRoles = 2000;

function typeRole() {
    const currentRole = typingRoles[currentRoleIndex];
    
    if (!isDeleting) {
        // Typing mode
        if (currentCharIndex < currentRole.length) {
            typingText.textContent += currentRole[currentCharIndex];
            currentCharIndex++;
            setTimeout(typeRole, typingSpeed);
        } else {
            // Start deleting after delay
            isDeleting = true;
            setTimeout(typeRole, delayBetweenRoles);
        }
    } else {
        // Deleting mode
        if (currentCharIndex > 0) {
            currentCharIndex--;
            typingText.textContent = currentRole.substring(0, currentCharIndex);
            setTimeout(typeRole, deletingSpeed);
        } else {
            // Move to next role
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % typingRoles.length;
            setTimeout(typeRole, 500);
        }
    }
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeRole, 500);
});

// =========================================================================================================
// KEYBOARD SHORTCUTS
// =========================================================================================================

document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme (dark/light)
    if (e.key.toLowerCase() === 't' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        modeToggle.click();
    }
});

// =========================================================================================================
// PAGE LOAD ANIMATIONS
// =========================================================================================================

window.addEventListener('load', () => {
    body.style.opacity = '1';
});

// =========================================================================================================
// UTILITY FUNCTIONS
// =========================================================================================================

// Debounce
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Throttle
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =========================================================================================================
// CONSOLE MESSAGE
// =========================================================================================================

console.log(
    '%c🎨 Welcome to Tamboli Hassan\'s Portfolio!',
    'font-size: 18px; font-weight: bold; color: #ff4444; text-shadow: 0 0 10px rgba(255,68,68,0.3);'
);

console.log(
    '%c✨ Made with love by MH_CODER',
    'font-size: 14px; color: #666; font-style: italic;'
);

console.log(
    '%c🚀 Keyboard Tip: Press "T" to toggle Dark/Light mode',
    'font-size: 12px; color: #0066ff;'
);

// =========================================================================================================
// INITIALIZATION
// =========================================================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Portfolio loaded successfully');
    updateActiveLink();
    updateColorButtons();
    updateModeIcon();
});

// CSS animations for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInAlert {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutAlert {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// =========================================================================================================
// PREVENT DEFAULT TOUCH DELAYS
// =========================================================================================================

// Ensure all clickable elements respond to touch immediately
document.addEventListener('touchstart', function() {}, false);
