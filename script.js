// ==========================================
// KILLED BY AI - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initCounters();
    initNavigation();
    initScrollToTop();
    initFToPayRespects();
    initGraveAnimations();
});

// ==========================================
// FLOATING PARTICLES
// ==========================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ==========================================
// LIVE COUNTERS
// ==========================================
function initCounters() {
    const chatgptLaunch = new Date('2022-11-30');
    const now = new Date();
    
    // Days since ChatGPT launch
    const daysSince = Math.floor((now - chatgptLaunch) / (1000 * 60 * 60 * 24));
    
    // Estimated queries (rough estimate: 1.5 billion/day across all AI)
    const queriesTrillions = (daysSince * 1.5 / 1000).toFixed(1);
    
    // Affected jobs estimate (McKinsey: 300M jobs affected)
    const affectedJobs = 300;
    
    // Unanswered SO questions growth
    const soUnanswered = Math.floor(3500000 + (daysSince * 500));

    // Animate counters
    animateCounter('days-counter', daysSince);
    animateCounter('queries-counter', queriesTrillions, true);
    animateCounter('jobs-counter', affectedJobs);
    animateCounter('stackoverflow-counter', soUnanswered);
}

function animateCounter(elementId, targetValue, isFloat = false) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = targetValue / steps;
    
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current += increment;
        
        if (step >= steps) {
            current = targetValue;
            clearInterval(timer);
        }

        if (isFloat) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current).toLocaleString('tr-TR');
        }
    }, stepDuration);
}

// ==========================================
// NAVIGATION TABS
// ==========================================
function initNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active tab on scroll
    const sections = document.querySelectorAll('.cemetery-section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('href') === '#' + current) {
                tab.classList.add('active');
            }
        });
    });
}

// ==========================================
// SCROLL TO TOP
// ==========================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTop');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// F TO PAY RESPECTS
// ==========================================
function initFToPayRespects() {
    let fCount = 0;
    const fCounterElement = document.getElementById('fCounter');
    const fCountDisplay = fCounterElement?.querySelector('.f-count');

    document.addEventListener('keydown', function(e) {
        if (e.key === 'f' || e.key === 'F') {
            // Increment counter
            fCount++;
            if (fCountDisplay) {
                fCountDisplay.textContent = fCount;
            }
            if (fCounterElement) {
                fCounterElement.classList.add('visible');
            }

            // Create floating F
            const floatingF = document.createElement('div');
            floatingF.className = 'floating-f';
            floatingF.textContent = 'F';
            floatingF.style.left = (Math.random() * 80 + 10) + '%';
            floatingF.style.top = (Math.random() * 80 + 10) + '%';
            document.body.appendChild(floatingF);

            // Remove after animation
            setTimeout(() => {
                floatingF.remove();
            }, 2000);

            // Play sound (optional - uncomment if you add sound file)
            // const audio = new Audio('/sounds/f.mp3');
            // audio.volume = 0.3;
            // audio.play();
        }
    });

    // Also allow clicking on graves to pay respects
    document.querySelectorAll('.grave').forEach(grave => {
        grave.addEventListener('dblclick', function() {
            fCount++;
            if (fCountDisplay) {
                fCountDisplay.textContent = fCount;
            }
            if (fCounterElement) {
                fCounterElement.classList.add('visible');
            }

            // Visual feedback
            this.classList.add('respected');
            setTimeout(() => {
                this.classList.remove('respected');
            }, 500);
        });
    });
}

// ==========================================
// GRAVE ANIMATIONS (Intersection Observer)
// ==========================================
function initGraveAnimations() {
    const graves = document.querySelectorAll('.grave');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    graves.forEach(grave => {
        observer.observe(grave);
    });
}

// ==========================================
// UTILITY: Format Numbers
// ==========================================
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ==========================================
// EASTER EGG: Konami Code
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.classList.add('party-mode');
    
    // Create confetti effect
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 30);
    }

    // Show message
    const message = document.createElement('div');
    message.className = 'easter-egg-message';
    message.innerHTML = '🎉 AI henüz bunu bulamadı! İnsan zekası hala çalışıyor! 🎉';
    document.body.appendChild(message);

    setTimeout(() => {
        document.body.classList.remove('party-mode');
        message.remove();
    }, 5000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 4000);
}

// ==========================================
// DARK/LIGHT MODE TOGGLE (if needed)
// ==========================================
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    toggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ==========================================
// SHARE FUNCTIONALITY
// ==========================================
function shareGrave(platform, graveTitle) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`🪦 ${graveTitle} - AI tarafından öldürüldü. Killed by AI Dijital Mezarlık'ta gör:`);

    let shareUrl;
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        default:
            // Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link kopyalandı!');
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// ==========================================
// LAZY LOADING FOR IMAGES
// ==========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log(`
🪦 KILLED BY AI 🪦
═══════════════════════════════════════

   Buraya kadar geldiysen...
   
   a) Developer'sın ve inspect element açtın
   b) AI sana söyledi buraya bakmayı
   c) Rastgele F12'ye bastın

   Her durumda: Tebrikler, hala meraklısın.
   AI bunu öldüremedi. Henüz.

   GitHub: github.com/user/killed-by-ai
   
═══════════════════════════════════════
`);