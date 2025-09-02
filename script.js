// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = themeToggle.querySelector('i');

// Check for saved theme preference or use current HTML attribute or default to dark mode
const savedTheme = localStorage.getItem('theme');
const htmlTheme = document.documentElement.getAttribute('data-theme');
const currentTheme = savedTheme || htmlTheme || 'dark';
body.setAttribute('data-theme', currentTheme);
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Initialize navbar with correct theme colors
setTimeout(() => {
    updateNavbarOnScroll();
}, 100);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Update navbar immediately after theme change
    updateNavbarOnScroll();
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        moonIcon.className = 'fas fa-sun';
        moonIcon.style.color = '#fbbf24';
    } else {
        moonIcon.className = 'fas fa-moon';
        moonIcon.style.color = '#1f2937';
    }
}

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

// Navbar background change on scroll
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = body.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(71, 85, 105, 0.4)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(229, 229, 229, 0.9)';
        }
        navbar.style.boxShadow = currentTheme === 'dark' 
            ? '0 2px 20px rgba(0, 0, 0, 0.3)' 
            : '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(71, 85, 105, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(229, 229, 229, 0.8)';
        }
        navbar.style.boxShadow = currentTheme === 'dark' 
            ? '0 2px 20px rgba(0, 0, 0, 0.2)' 
            : '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', updateNavbarOnScroll);

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Professional Contact Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Handle both button clicks
    const sendButtons = contactForm.querySelectorAll('.btn-send');
    
    sendButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!firstName || !lastName || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Create email content
            const fullName = `${firstName} ${lastName}`;
            const emailSubject = `Portfolio Contact from ${fullName}`;
            const emailBody = `Hi Chia,

My name is ${fullName} and I found your portfolio. I'd like to get in touch with you.

Email: ${email}

Message:
${message}

Best regards,
${fullName}`;
            
            // Get the method from button data attribute
            const method = this.getAttribute('data-method');
            
            if (method === 'gmail') {
                // Gmail web interface
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=chiaranchber@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                window.open(gmailUrl, '_blank');
                showNotification('Opening Gmail... Thank you for reaching out!', 'success');
            } else {
                // Default email client (mailto)
                const mailtoLink = `mailto:chiaranchber@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                window.location.href = mailtoLink;
                showNotification('Opening your email client... Thank you for reaching out!', 'success');
            }
            
            // Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add animation on scroll for project cards
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

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add scroll reveal animation for sections
const revealElements = document.querySelectorAll('.about, .projects, .contact');

const revealObserver = new IntersectionObserver((entries) => {
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

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(element);
});

// Add skill tag animation
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
    }, index * 100);
});

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
    // Get the original text to preserve the suffix
    const originalText = element.textContent;
    const suffix = originalText.replace(/\d/g, '');
    
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    updateCounter();
}

// Initialize counter animations when about section is visible
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                if (!isNaN(target) && target > 0) {
                    animateCounter(stat, target);
                }
            });
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Project Carousel Functionality
function initializeProjectCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track) return;
    
    const cards = track.querySelectorAll('.project-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    
    // Create dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalCards - 1;
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalCards - 1));
        updateCarousel();
    }
    
    function nextSlide() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Initialize
    updateCarousel();
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectCarousel();
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeAnimatedCounters();
    initializeTypewriterEffect();
});

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll-triggered animations using Intersection Observer
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

// Parallax effects for hero section
function initializeParallaxEffects() {
    // Parallax effects disabled to keep hero content static
    return;
}

// Animated counters for stats
function initializeAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    const animateCounter = (counter) => {
        const originalText = counter.textContent;
        const target = parseInt(originalText.replace(/\D/g, ''));
        const suffix = originalText.replace(/\d/g, '');
        
        // Ensure we have a valid target number
        if (isNaN(target) || target <= 0) {
            console.warn('Invalid target number for counter:', originalText);
            return;
        }
        
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, stepTime);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Typewriter effect for hero text
function initializeTypewriterEffect() {
    const typewriterText = document.querySelector('.typewriter-text');
    if (!typewriterText) return;
    
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    typewriterText.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}
