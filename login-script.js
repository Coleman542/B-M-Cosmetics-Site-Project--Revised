const SUPABASE_URL = 'https://qenuqqsoafdsxqltydlf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlbnVxcXNvYWZkc3hxbHR5ZGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzY3MDksImV4cCI6MjA2NzcxMjcwOX0.LY72T3fXGPAr8thAVPKS6dsOlITTvlV7RqGKYpSeVDg';
let supabase;
if (window.supabase && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error('Supabase client library not loaded! Please add the CDN script to your HTML.');
}

function showNotification(message, type = 'info') {
    let toast = document.createElement('div');
    toast.className = `custom-toast custom-toast-${type}`;
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = type === 'error' ? '#e57373' : (type === 'success' ? '#81c784' : '#ffd54f');
    toast.style.color = '#222';
    toast.style.padding = '14px 28px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '1.1rem';
    toast.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
    toast.style.zIndex = 99999;
    toast.style.opacity = '0.97';
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = 'opacity 0.5s';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function createSparkleEffect(button) {
    if (!button) return;
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle-effect';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.left = '50%';
    sparkle.style.top = '50%';
    sparkle.style.transform = 'translate(-50%, -50%)';
    sparkle.style.width = '60px';
    sparkle.style.height = '60px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'radial-gradient(circle, #fffbe6 0%, #ffe0b2 60%, transparent 100%)';
    sparkle.style.opacity = '0.7';
    sparkle.style.zIndex = '10';
    sparkle.style.animation = 'sparkle-pop 0.7s cubic-bezier(0.4,0,0.2,1)';
    button.style.position = 'relative';
    button.appendChild(sparkle);
    setTimeout(() => {
        if (button.contains(sparkle)) button.removeChild(sparkle);
    }, 700);
}

if (!document.getElementById('sparkleEffectStyle')) {
    const style = document.createElement('style');
    style.id = 'sparkleEffectStyle';
    style.textContent = `
        @keyframes sparkle-pop {
            0% { opacity: 0.7; transform: scale(0.5) translate(-50%, -50%); }
            60% { opacity: 1; transform: scale(1.2) translate(-50%, -50%); }
            100% { opacity: 0; transform: scale(2) translate(-50%, -50%); }
        }
        .sparkle-effect { pointer-events: none; }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    function toggleForms(isRegisterActive) {
        if (isRegisterActive) {
            container.classList.add("active");
            registerForm.querySelector('[name="email"]').setAttribute('autocomplete', 'new-email');
            registerForm.querySelector('[name="password"]').setAttribute('autocomplete', 'new-password');
            enableFormFields(registerForm);
            disableFormFields(loginForm);
        } else {
            container.classList.remove("active");
            loginForm.querySelector('[name="email"]').setAttribute('autocomplete', 'username');
            loginForm.querySelector('[name="password"]').setAttribute('autocomplete', 'current-password');
            enableFormFields(loginForm);
            disableFormFields(registerForm);
        }
        createSparkleEffect(isRegisterActive ? registerBtn : loginBtn);
        showNotification(isRegisterActive ? 'Switch to Register ✨' : 'Switch to Login 💖', 'info');
    }

    function disableFormFields(form) {
        if (!form) return;
        form.querySelectorAll('input').forEach(input => {
            input.setAttribute('disabled', 'true');
            input.setAttribute('aria-hidden', 'true');
        });
    }
    function enableFormFields(form) {
        if (!form) return;
        form.querySelectorAll('input').forEach(input => {
            input.removeAttribute('disabled');
            input.removeAttribute('aria-hidden');
        });
        const firstInput = form.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
    enableFormFields(registerForm);
    enableFormFields(loginForm);
    const toggleRegisterBtn = document.querySelector('.toggle-panel.toggle-right #register');
    const toggleLoginBtn = document.querySelector('.toggle-panel.toggle-left #login');
    if (toggleRegisterBtn) {
        toggleRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleForms(true);
        });
    }
    if (toggleLoginBtn) {
        toggleLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleForms(false);
        });
    }

        function showPageLoaderLogin() {
        let loader = document.getElementById('pageLoaderLogin');
        if (loader) return;
        loader = document.createElement('div');
        loader.id = 'pageLoaderLogin';
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #d4a574 0%, #e8c4a0 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1);">
                <div style="
                    font-family: 'Playfair Display', serif;
                    font-size: 3rem;
                    color: white;
                    text-align: center;
                    animation: pulse 1.5s ease-in-out infinite;">
                    <span style="
                        font-family: 'Playfair Display', serif;
                        font-size: 3rem;
                        font-weight: 700;
                        color: white;
                        letter-spacing: 1px;">B&M Cosmetics</span>
                    <div style="
                        font-family: 'Inter', sans-serif;
                        font-size: 1.1rem;
                        margin-top: 0.5rem;
                        opacity: 0.8;">Loading...</div>
                    <div style="
                        width: 50px;
                        height: 3px;
                        background: white;
                        margin: 1.5rem auto;
                        border-radius: 2px;
                        animation: loading 1s ease-in-out infinite;"></div>
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
        }, 1200);
    }
    if (!document.getElementById('loginLoaderStyle')) {
        const style = document.createElement('style');
        style.id = 'loginLoaderStyle';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.02); }
            }
            @keyframes loading {
                0% { width: 0; }
                50% { width: 50px; }
                100% { width: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const showSignup = urlParams.get('signup') === '1';

    showPageLoaderLogin();
    if (showSignup) {
        showPageLoaderLogin();
        setTimeout(() => {
            toggleForms(true);
        }, 1200);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = this.querySelector('[name="email"]');
            const password = this.querySelector('[name="password"]');
            const confirmPassword = this.querySelector('[name="confirmPassword"]');
            const firstName = this.querySelector('[name="firstName"]');
            const lastName = this.querySelector('[name="lastName"]');
            console.debug('[Register] Form submit', { email: email.value, firstName: firstName.value, lastName: lastName.value });
            if (!email.value.trim()) {
                showNotification('Please enter your email address', 'error');
                email.focus();
                return;
            }
            if (!isValidEmail(email.value.trim())) {
                showNotification('Please enter a valid email address', 'error');
                email.focus();
                return;
            }
            if (!password.value.trim()) {
                showNotification('Please enter your password', 'error');
                password.focus();
                return;
            }
            if (password.value.length < 6) {
                showNotification('Password must be at least 6 characters long', 'error');
                password.focus();
                return;
            }
            if (password.value !== confirmPassword.value) {
                showNotification('Passwords do not match', 'error');
                confirmPassword.focus();
                return;
            }
            if (!firstName.value.trim() || !lastName.value.trim()) {
                showNotification('Please enter your first and last name', 'error');
                firstName.focus();
                return;
            }
            createSparkleEffect(this.querySelector('button'));
            const emailRedirectTo = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                ? 'http://127.0.0.1:5500/frontend/index.html'
                : 'https://github.com/Coleman542/B-M-Cosmetics-Site-Project--Revised/frontend/index.html';
            console.debug('[Register] Calling supabase.auth.signUp', { email: email.value.trim(), emailRedirectTo });
            const { error, data } = await supabase.auth.signUp({
                email: email.value.trim(),
                password: password.value.trim(),
                options: {
                    emailRedirectTo,
                    data: {
                        full_name: `${firstName.value.trim()} ${lastName.value.trim()}`
                    }
                }
            });
            console.debug('[Register] Supabase response', { error, data });
            if (error) {
                showNotification(error.message, 'error');
            } else {
                showNotification('Sign up successful! Please check your email for a verification link.', 'success');
                setTimeout(() => {
                    toggleForms(false); 
                }, 1200);
            }
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = this.querySelector('[name="email"]');
            const password = this.querySelector('[name="password"]');
            console.debug('[Login] Form submit', { email: email.value });
            if (!email.value.trim()) {
                showNotification('Please enter your email address', 'error');
                email.focus();
                return;
            }
            if (!isValidEmail(email.value.trim())) {
                showNotification('Please enter a valid email address', 'error');
                email.focus();
                return;
            }
            if (!password.value.trim()) {
                showNotification('Please enter your password', 'error');
                password.focus();
                return;
            }
            if (password.value.length < 6) {
                showNotification('Password must be at least 6 characters long', 'error');
                password.focus();
                return;
            }
            createSparkleEffect(this.querySelector('button'));
            console.debug('[Login] Calling supabase.auth.signInWithPassword', { email: email.value.trim() });
            const { error, data } = await supabase.auth.signInWithPassword({
                email: email.value.trim(),
                password: password.value.trim()
            });
            console.debug('[Login] Supabase response', { error, data });
            if (error) {
                showNotification(error.message, 'error');
            } else if (data.user && !data.user.confirmed_at) {
                showNotification('Please check your email and verify your account before logging in.', 'info');
            } else {
                showNotification('Welcome back!', 'success');
                setTimeout(() => {
                    window.location.href = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                        ? '/frontend/index.html'
                        : 'https://coleman542.github.io/B-M-Cosmetics-Site-Project--Revised/frontend/index.html';
                }, 1200);
            }
        });
    }

    function validateLoginForm(email, password) {
        if (!email || !email.value.trim()) {
            showNotification('Please enter your email address', 'error');
            email.focus();
            return false;
        }
        if (!isValidEmail(email.value.trim())) {
            showNotification('Please enter a valid email address', 'error');
            email.focus();
            return false;
        }
        if (!password || !password.value.trim()) {
            showNotification('Please enter your password', 'error');
            password.focus();
            return false;
        }
        if (password.value.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            password.focus();
            return false;
        }
        return true;
    }
    function validateRegisterForm(email, password, confirmPassword, firstName, lastName) {
        if (!email || !email.value.trim()) {
            showNotification('Please enter your email address', 'error');
            email.focus();
            return false;
        }
        if (!isValidEmail(email.value.trim())) {
            showNotification('Please enter a valid email address', 'error');
            email.focus();
            return false;
        }
        if (!password || !password.value.trim()) {
            showNotification('Please enter your password', 'error');
            password.focus();
            return false;
        }
        if (password.value.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            password.focus();
            return false;
        }
        if (password.value !== confirmPassword.value) {
            showNotification('Passwords do not match', 'error');
            confirmPassword.focus();
            return false;
        }
        if (!firstName.value.trim() || !lastName.value.trim()) {
            showNotification('Please enter your first and last name', 'error');
            firstName.focus();
            return false;
        }
        return true;
    }


    if (showSignup) {
        toggleForms(true);
    }
});