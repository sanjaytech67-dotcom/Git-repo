// Modern JavaScript for Mill Master Machinery

document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
    initializeCarousel();
    initializeSmoothScroll();
    initializeAOS();
});

/**
 * Initialize Bootstrap Form Validation
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

/**
 * Enhanced Carousel Functionality
 */
function initializeCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    // Auto-rotate carousel every 5 seconds
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true,
        pause: 'hover'
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') carouselInstance.prev();
        if (e.key === 'ArrowRight') carouselInstance.next();
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/**
 * Intersection Observer for Animations (AOS-like)
 */
function initializeAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .feature-box, .product-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Form Reset Functionality
 */
function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        form.classList.remove('was-validated');
    }
}

/**
 * Enhanced Form Submission with Feedback
 */
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (!form.classList.contains('needs-validation')) return;
    
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';

        // Restore button after submission
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 2000);
    }
}, true);

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show`;
    notification.setAttribute('role', 'alert');
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Add to top of page
    const container = document.querySelector('main') || document.body;
    container.insertBefore(notification, container.firstChild);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

/**
 * Mobile Menu Close on Link Click
 */
function closeMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        toggler.click();
    }
}

document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

/**
 * Active Navigation Link Highlighting
 */
function setActiveNavLink() {
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
window.addEventListener('load', setActiveNavLink);

/**
 * Performance Optimization - Lazy Loading for Images
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
window.addEventListener('load', initializeLazyLoading);

/**
 * Utility: Copy Text to Clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

/**
 * Utility: Validate Email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Utility: Validate Phone Number
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Track Page Views
 */
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title
        });
    }
}

window.addEventListener('load', trackPageView);

/**
 * Scroll to Top Button
 */
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #0d47a1;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    document.body.appendChild(button);
}

// Initialize scroll to top button
window.addEventListener('load', createScrollToTopButton);

/**
 * Console message for developers
 */
console.log('%cMill Master Machinery', 'color: #0d47a1; font-size: 20px; font-weight: bold;');
console.log('%cModernized Website v2.0', 'color: #28a745; font-size: 14px;');
console.log('%cFor inquiries: enquiry@millmasterindia.com', 'color: #666; font-size: 12px;');
