// Main JavaScript file for Calquro.com
// Global utilities and interactive features

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeForms();
    initializeReviews();
    
    // Page-specific initializations
    if (document.getElementById('chatbot-container')) {
        initializeChatbot();
    }
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle with enhanced functionality
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Smooth scrolling for anchor links
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

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Scroll effects and parallax
function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Form handling
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Review form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(reviewForm);
            const reviewData = Object.fromEntries(formData);
            
            // Add review to local storage and display
            addReview(reviewData);
            reviewForm.reset();
            showNotification('Review added successfully!', 'success');
        });
    }
}

// Review system
function initializeReviews() {
    loadReviews();
}

function addReview(reviewData) {
    const reviews = getReviews();
    const newReview = {
        id: Date.now(),
        name: reviewData.name,
        rating: parseInt(reviewData.rating),
        comment: reviewData.comment,
        date: new Date().toLocaleDateString()
    };
    
    reviews.unshift(newReview);
    localStorage.setItem('calquro_reviews', JSON.stringify(reviews));
    displayReviews();
}

function getReviews() {
    return JSON.parse(localStorage.getItem('calquro_reviews') || '[]');
}

function displayReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;
    
    const reviews = getReviews().slice(0, 6); // Show only first 6 reviews
    
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="text-center">
                <p>No reviews yet. Be the first to leave a review!</p>
            </div>
        `;
        return;
    }
    
    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="review-card animate-on-scroll">
            <div class="review-rating">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </div>
            <p>"${review.comment}"</p>
            <div style="font-weight: 600; color: var(--text-primary);">
                - ${review.name}
            </div>
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">
                ${review.date}
            </div>
        </div>
    `).join('');
    
    // Re-initialize animations for new elements
    initializeAnimations();
}

function loadReviews() {
    // Add some default reviews if none exist
    const reviews = getReviews();
    if (reviews.length === 0) {
        const defaultReviews = [
            {
                id: 1,
                name: 'Sarah Johnson',
                rating: 5,
                comment: 'Amazing collection of calculators! The BMI calculator helped me track my fitness goals perfectly.',
                date: new Date(Date.now() - 86400000 * 2).toLocaleDateString()
            },
            {
                id: 2,
                name: 'Mike Chen',
                rating: 5,
                comment: 'The student calculator is incredibly useful for my engineering studies. Clean interface and accurate results.',
                date: new Date(Date.now() - 86400000 * 5).toLocaleDateString()
            },
            {
                id: 3,
                name: 'Emily Rodriguez',
                rating: 4,
                comment: 'Love the currency converter! It saves me time when planning international trips.',
                date: new Date(Date.now() - 86400000 * 10).toLocaleDateString()
            }
        ];
        
        localStorage.setItem('calquro_reviews', JSON.stringify(defaultReviews));
    }
    
    displayReviews();
}

// Chatbot functionality
function initializeChatbot() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('chat-messages');
    
    if (!chatInput || !sendButton || !messagesContainer) return;
    
    // Add welcome message
    addMessage('Hi! I\'m Calquro\'s AI assistant. I can help you with information about our calculators, tools, and website features. What would you like to know?', 'bot');
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = generateAIResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('calculator') || message.includes('tool')) {
            return 'We have 11 amazing calculators including Age Calculator, BMI Calculator, EMI Calculator, Currency Converter, and more! You can find them all on our Tools page. Which calculator interests you most?';
        }
        
        if (message.includes('bmi') || message.includes('health')) {
            return 'Our BMI Calculator helps you determine if your weight is in a healthy range. Simply enter your height and weight, and it will calculate your Body Mass Index with health recommendations.';
        }
        
        if (message.includes('age') || message.includes('birthday')) {
            return 'The Age Calculator can tell you your exact age in years, months, days, and even seconds! It\'s perfect for finding out how many days until your next birthday.';
        }
        
        if (message.includes('currency') || message.includes('money') || message.includes('exchange')) {
            return 'Our Currency Converter supports major world currencies with real-time exchange rates. Perfect for travel planning or international business calculations.';
        }
        
        if (message.includes('student') || message.includes('math') || message.includes('education')) {
            return 'The Student Calculator is a powerful scientific calculator perfect for students. It handles basic arithmetic, percentages, square roots, and more advanced mathematical operations.';
        }
        
        if (message.includes('blog') || message.includes('article')) {
            return 'Check out our blog section for helpful articles about calculations, financial tips, health insights, and technology guides. We regularly publish useful content for our users!';
        }
        
        if (message.includes('about') || message.includes('company') || message.includes('who')) {
            return 'Calquro.com is created by a passionate developer who wanted to provide free, easy-to-use calculators for everyone. You can learn more about us on the About page!';
        }
        
        if (message.includes('contact') || message.includes('support') || message.includes('help')) {
            return 'You can reach out to us through the Contact page. We\'d love to hear your feedback, suggestions, or answer any questions you might have!';
        }
        
        if (message.includes('password') || message.includes('generator') || message.includes('security')) {
            return 'Our Password Generator creates strong, secure passwords with customizable options. You can include numbers, symbols, and control the length for maximum security.';
        }
        
        // Default responses
        const defaultResponses = [
            'That\'s interesting! Is there anything specific about Calquro\'s calculators or features you\'d like to know more about?',
            'I\'d be happy to help! You can explore our various calculators, read our blog articles, or learn more about the site. What interests you?',
            'Thanks for your question! Feel free to browse our tools page to see all available calculators, or ask me about any specific calculator you need.',
            'Great question! Calquro offers a wide range of calculators and tools. Is there a particular calculation you need help with?'
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copied to clipboard!', 'success');
    });
}

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for use in other scripts
window.CalquroUtils = {
    showNotification,
    formatNumber,
    isValidEmail,
    copyToClipboard,
    debounce,
    throttle
};

// Image lazy loading functionality
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => {
            img.classList.add('lazy-load');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Performance optimization - preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'images/logo.jpg',
        'images/developer.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    preloadCriticalResources();
});