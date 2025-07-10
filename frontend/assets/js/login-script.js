document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const loginForm = document.querySelector('.log-in form');
    const registerForm = document.querySelector('.sign-up form');
    
    function toggleForms(isRegisterActive) {
        if (isRegisterActive) {
            container.classList.add("active");
            registerForm.querySelector('[name="email"]').setAttribute('autocomplete', 'new-email');
            registerForm.querySelector('[name="password"]').setAttribute('autocomplete', 'new-password');
            disableFormFields(loginForm);
            setTimeout(() => enableFormFields(registerForm), 600);

        } else {
            container.classList.remove("active");
            loginForm.querySelector('[name="email"]').setAttribute('autocomplete', 'username');
            loginForm.querySelector('[name="password"]').setAttribute('autocomplete', 'current-password');
            disableFormFields(registerForm);
            setTimeout(() => enableFormFields(loginForm), 600);
        }
        
        createSparkleEffect(isRegisterActive ? registerBtn : loginBtn);
        showNotification(isRegisterActive ? 'Switch to Register ✨' : 'Switch to Login 💖', 'info');
    }
    
    function disableFormFields(form) {
        form.querySelectorAll('input').forEach(input => {
            input.setAttribute('disabled', 'true');
            input.setAttribute('aria-hidden', 'true');
        });
    }
    
    function enableFormFields(form) {
        form.querySelectorAll('input').forEach(input => {
            input.removeAttribute('disabled');
            input.removeAttribute('aria-hidden');
        });
        const firstInput = form.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    disableFormFields(registerForm);
    loginForm.querySelector('[name="email"]').setAttribute('autocomplete', 'username');
    loginForm.querySelector('[name="password"]').setAttribute('autocomplete', 'current-password');
    

    if (registerBtn && loginBtn) {
        registerBtn.addEventListener('click', () => toggleForms(true));
        loginBtn.addEventListener('click', () => toggleForms(false));
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('[name="email"]');
            const password = this.querySelector('[name="password"]');
            
            if (validateLoginForm(email, password)) {
                createSparkleEffect(this.querySelector('button'));
                showNotification('Welcome back to B&M Cosmetics! ✨', 'success');
   
                setTimeout(() => {
                    console.log('Redirecting to dashboard...');
                }, 1500);
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('[name="email"]');
            const password = this.querySelector('[name="password"]');
            const confirmPassword = this.querySelector('[name="confirmPassword"]');
            const firstName = this.querySelector('[name="firstName"]');
            const lastName = this.querySelector('[name="lastName"]');
            
            if (validateRegisterForm(email, password, confirmPassword, firstName, lastName)) {
                createSparkleEffect(this.querySelector('button'));
                showNotification('Welcome to the B&M Cosmetics family! 💖', 'success');
                
                setTimeout(() => {
                    toggleForms(false);
                    showNotification('Please login with your new account ✨', 'info');
                }, 2000);
            }
        });
    }

    function validateLoginForm(email, password) {
        if (!email || !email.value.trim()) {
            showNotification('Please enter your email address', 'error');
            focusElement(email);
            return false;
        }
        
        if (!isValidEmail(email.value.trim())) {
            showNotification('Please enter a valid email address', 'error');
            focusElement(email);
            return false;
        }
        
        if (!password || !password.value.trim()) {
            showNotification('Please enter your password', 'error');
            focusElement(password);
            return false;
        }
        
        if (password.value.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            focusElement(password);
            return false;
        }
        
        return true;
    }
    
    function validateRegisterForm(email, password, confirmPassword, firstName, lastName) {
        if (!firstName || !firstName.value.trim()) {
            showNotification('Please enter your first name', 'error');
            focusElement(firstName);
            return false;
        }
        
        if (!lastName || !lastName.value.trim()) {
            showNotification('Please enter your last name', 'error');
            focusElement(lastName);
            return false;
        }
        
        if (!email || !email.value.trim()) {
            showNotification('Please enter your email address', 'error');
            focusElement(email);
            return false;
        }
        
        if (!isValidEmail(email.value.trim())) {
            showNotification('Please enter a valid email address', 'error');
            focusElement(email);
            return false;
        }
        
        if (!password || !password.value.trim()) {
            showNotification('Please enter a password', 'error');
            focusElement(password);
            return false;
        }
        
        if (password.value.length < 8) {
            showNotification('Password must be at least 8 characters long', 'error');
            focusElement(password);
            return false;
        }
        
        if (!confirmPassword || !confirmPassword.value.trim()) {
            showNotification('Please confirm your password', 'error');
            focusElement(confirmPassword);
            return false;
        }
        
        if (password.value !== confirmPassword.value) {
            showNotification('Passwords do not match', 'error');
            focusElement(confirmPassword);
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function focusElement(element) {
        if (element) {
            element.focus();
            element.style.borderColor = '#ff6b6b';
            element.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
            
            setTimeout(() => {
                element.style.borderColor = '';
                element.style.boxShadow = '';
            }, 2000);
        }
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const colors = {
            success: 'linear-gradient(135deg, #d4a574 0%, #e8c4a0 100%)',
            error: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
            info: 'linear-gradient(135deg, #74b9ff 0%, #81ecec 100%)'
        };
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: colors[type] || colors.info,
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '50px',
            fontWeight: '600',
            fontSize: '14px',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function createSparkleEffect(element) {
        const sparkles = [];
        const sparkleCount = 15;
        
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
                zIndex: '1000',
                boxShadow: '0 0 6px #d4a574'
            });
            
            const rect = element.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            sparkle.style.left = startX + 'px';
            sparkle.style.top = startY + 'px';
            
            document.body.appendChild(sparkle);
            sparkles.push(sparkle);
            
            const angle = (i / sparkleCount) * Math.PI * 2;
            const distance = 60 + Math.random() * 40;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            
            sparkle.animate([
                { 
                    transform: 'translate(0, 0) scale(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translate(${endX - startX}px, ${endY - startY}px) scale(1.5) rotate(180deg)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            };
        }
    }

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
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none'
        });
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    function createGlowEffect(element) {
        element.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.3)';
        element.style.borderColor = '#d4a574';
        element.style.transition = 'all 0.3s ease';
    }

    function removeGlowEffect(element) {
        element.style.boxShadow = '';
        element.style.borderColor = '';
    }

    function showPageLoader() {
        const loader = document.createElement('div');
        loader.id = 'pageLoader';
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
                    font-size: 2.5rem;
                    color: white;
                    text-align: center;
                    animation: pulse 1.5s ease-in-out infinite;
                ">
                    B&M Cosmetics
                    <div style="
                        font-family: 'Inter', sans-serif;
                        font-size: 1rem;
                        margin-top: 0.5rem;
                        opacity: 0.8;
                    ">Login Portal</div>
                    <div style="
                        width: 50px;
                        height: 3px;
                        background: white;
                        margin: 1.5rem auto;
                        border-radius: 2px;
                        animation: loading 1s ease-in-out infinite;
                    "></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            }, 500);
        }, 1000);
    }

    const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            createGlowEffect(this);
        });
        
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentElement.classList.remove('focused');
            }
            removeGlowEffect(this);
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
    
     const buttons = document.querySelectorAll('button, .btn, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 15px 35px rgba(212, 165, 116, 0.25)';
            this.style.transition = 'all 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(212, 165, 116, 0.15)';
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        @keyframes loading {
            0% { width: 0; }
            50% { width: 50px; }
            100% { width: 0; }
        }
        
        .notification {
            font-family: 'Inter', sans-serif;
            backdrop-filter: blur(10px);
        }
        
        .sparkle {
            animation: sparkle 1s ease-out forwards;
        }
        
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1.5) rotate(180deg);
                opacity: 0;
            }
        }
        
        /* Enhanced input focus styles */
        .input-group.focused label {
            color: #d4a574;
            transform: translateY(-20px) scale(0.85);
        }
        
        .input-group.has-value label {
            transform: translateY(-20px) scale(0.85);
        }
        
        input:focus {
            outline: none;
            border-color: #d4a574 !important;
            box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.15) !important;
        }
        
        /* Button hover enhancements */
        button:hover, .btn:hover {
            background: linear-gradient(135deg, #d4a574 0%, #e8c4a0 100%) !important;
            transform: translateY(-2px) scale(1.05) !important;
        }
        
        /* Smooth transitions for all interactive elements */
        input, button, .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
    `;
    document.head.appendChild(style);

    let mouseTrail = [];
    const trailLength = 8;
    
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY });
        
        if (mouseTrail.length > trailLength) {
            mouseTrail.shift();
        }
        
        if (Math.random() < 0.05) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });
    
    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        Object.assign(particle.style, {
            position: 'fixed',
            left: x + 'px',
            top: y + 'px',
            width: '2px',
            height: '2px',
            background: 'rgba(212, 165, 116, 0.4)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'scale(0)',
            transition: 'all 0.8s ease-out'
        });
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.transform = 'scale(1)';
            particle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 800);
    }

    showPageLoader();
    
    setTimeout(() => {
        showNotification('Welcome to B&M Cosmetics Login 💖', 'success');
    }, 1200);

    console.log('✨ B&M Cosmetics Login Portal loaded successfully! ✨');
});