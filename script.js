// ===== Navigation Scroll Effect =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove shadow based on scroll
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop;
});

// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.backgroundColor = 'var(--startup-white)';
    navMenu.style.flexDirection = 'column';
    navMenu.style.padding = 'var(--spacing-md)';
    navMenu.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of sticky navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        }
    });
});

// ===== Scroll Animations =====
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

// Apply animations to elements
document.addEventListener('DOMContentLoaded', () => {
    // Particle Animation - Just rockets
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        // Create 3 initial rockets
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                
                particle.className = 'particle rocket';
                particle.textContent = '🚀';
                particle.style.left = (20 + Math.random() * 60) + '%'; // Keep rockets more centered
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.fontSize = (18 + Math.random() * 12) + 'px';
                
                container.appendChild(particle);
                
                // Remove particle after animation completes
                setTimeout(() => {
                    particle.remove();
                }, 20000);
            }, i * 3000); // Stagger particle creation
        }
        
        // Create new rocket periodically
        setInterval(() => {
            const particle = document.createElement('div');
            
            particle.className = 'particle rocket';
            particle.textContent = '🚀';
            particle.style.left = (20 + Math.random() * 60) + '%';
            particle.style.animationDelay = '0s';
            particle.style.fontSize = (18 + Math.random() * 12) + 'px';
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 20000);
        }, 6000); // Less frequent - every 6 seconds
    }
    
    createParticles();
    
    // Add animation classes to elements
    const animateElements = [
        '.advantage-card',
        '.builder-card',
        '.testimonial-card',
        '.column'
    ];
    
    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        });
    });
    
    // Stagger animations for cards
    document.querySelectorAll('.advantage-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.builder-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ===== WhatsApp CTA Tracking =====
document.querySelectorAll('[href="#"]').forEach(link => {
    if (link.textContent.includes('WhatsApp')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace with actual WhatsApp group link
            alert('WhatsApp link would open here. Please add the actual WhatsApp group invite link.');
            // window.location.href = 'https://chat.whatsapp.com/YOUR_GROUP_LINK';
        });
    }
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== Dynamic Year in Footer =====
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
}

// ===== Performance: Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// ===== Smooth Reveal on Page Load =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ===== Mobile Menu Close on Outside Click =====
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const isClickInsideMenu = navMenu?.contains(e.target);
        const isClickOnHamburger = hamburger?.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu?.style.display === 'flex') {
            navMenu.style.display = 'none';
        }
    }
});

// ===== Resize Handler =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu) {
            navMenu.style = '';
        }
    }, 250);
});