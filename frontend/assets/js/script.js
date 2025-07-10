document.addEventListener('DOMContentLoaded', function() {
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(212, 165, 116, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    
    const animateElements = document.querySelectorAll('.featured-products, .brand-story, .featured-product');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    
    const featuredProducts = document.querySelectorAll('.featured-product');
    featuredProducts.forEach(product => {
        product.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(1deg)';
            this.style.boxShadow = '0 30px 70px rgba(212, 165, 116, 0.25)';
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(212, 165, 116, 0.15)';
        });
    });

    
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing! 💖', 'success');
                newsletterInput.value = '';
                
                createSparkleEffect(this);
            } else {
                showNotification('Please enter a valid email address', 'error');
                newsletterInput.focus();
            }
        });
        
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? 'linear-gradient(135deg, #d4a574 0%, #e8c4a0 100%)' : '#ff6b6b',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '50px',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    function createSparkleEffect(element) {
        const sparkles = [];
        const sparkleCount = 12;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            Object.assign(sparkle.style, {
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: '#d4a574',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '1000'
            });
            
            const rect = element.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            sparkle.style.left = startX + 'px';
            sparkle.style.top = startY + 'px';
            
            document.body.appendChild(sparkle);
            sparkles.push(sparkle);
            
            const angle = (i / sparkleCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            
            sparkle.animate([
                { 
                    transform: 'translate(0, 0) scale(0)',
                    opacity: 1
                },
                { 
                    transform: `translate(${endX - startX}px, ${endY - startY}px) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                document.body.removeChild(sparkle);
            };
        }
    }

    const ctaButtons = document.querySelectorAll('.cta-button, .login-btn, .learn-more-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
            
            if (this.classList.contains('cta-button')) {
                setTimeout(() => {
                    showNotification('Welcome to B&M Cosmetics! ✨', 'success');
                }, 200);
            }
        });
    });

    function createRippleEffect(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        Object.assign(ripple.style, {
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            left: x + 'px',
            top: y + 'px',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none'
        });
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification {
            font-family: 'Inter', sans-serif;
        }
        
        .sparkle {
            animation: sparkle 0.8s ease-out forwards;
        }
        
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(180deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        element.style.animationDelay = randomDelay + 's';
        element.style.animationDuration = randomDuration + 's';
        
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });

    const brandStorySection = document.querySelector('.brand-story');
    const brandStoryBackground = document.querySelector('.brand-story-background');
    
    if (brandStorySection && brandStoryBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (isElementInViewport(brandStorySection)) {
                brandStoryBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #d4a574 0%, #e8c4a0 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            ">
                <div style="
                    font-family: 'Playfair Display', serif;
                    font-size: 3rem;
                    color: white;
                    text-align: center;
                    animation: pulse 1.5s ease-in-out infinite;
                ">
                    B&M Cosmetics
                    <div style="
                        width: 50px;
                        height: 3px;
                        background: white;
                        margin: 1rem auto;
                        border-radius: 2px;
                        animation: loading 1s ease-in-out infinite;
                    "></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            @keyframes loading {
                0% { width: 0; }
                50% { width: 50px; }
                100% { width: 0; }
            }
        `;
        document.head.appendChild(loadingStyle);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
                const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.classList.add('slide-in');
        }
            }, 500);
        }, 1500);
    });

    let mouseTrail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY });
        
        if (mouseTrail.length > trailLength) {
            mouseTrail.shift();
        }
        
        if (Math.random() < 0.1) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });
    
    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        Object.assign(particle.style, {
            position: 'fixed',
            left: x + 'px',
            top: y + 'px',
            width: '3px',
            height: '3px',
            background: 'rgba(212, 165, 116, 0.6)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'scale(0)',
            transition: 'all 0.5s ease-out'
        });
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.transform = 'scale(1)';
            particle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 500);
    }

    console.log('🌟 B&M Cosmetics website loaded successfully! ✨');
});

console.log('%c✨ Welcome to B&M Cosmetics! ✨', 'color: #d4a574; font-size: 20px; font-weight: bold;');