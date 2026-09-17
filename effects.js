// =========================================
// ✨ تأثير Ripple الذهبي
// =========================================
function initRippleEffect() {
    document.querySelectorAll('button, .nav-item, .save-date-btn').forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-gold');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(218, 165, 32, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleGold 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// إضافة keyframes للـ Ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleGold {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);


// =========================================
// 🌸 بتلات ورد عند النهاية
// =========================================
let endPetalsShown = false;

function initEndPetals() {
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / 
            (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 85 && !endPetalsShown) {
            endPetalsShown = true;
            triggerFallingPetals();
        }
    });
}

function triggerFallingPetals() {
    const container = document.createElement('div');
    container.id = 'end-petals-container';
    container.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 9998;
        overflow: hidden;
    `;
    document.body.appendChild(container);
    
    const colors = ['#ffb7c5', '#ffc0cb', '#ff69b4', '#db7093', '#f4a460'];
    
    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        const size = Math.random() * 10 + 6;
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 2 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        petal.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            top: -20px;
            border-radius: 50% 0 50% 50%;
            opacity: 0.7;
            animation: fallPetal ${duration}s ease-in ${delay}s forwards;
        `;
        
        container.appendChild(petal);
    }
    
    // إزالة بعد 4 ثوانٍ
    setTimeout(() => container.remove(), 4000);
}

const petalsStyle = document.createElement('style');
petalsStyle.textContent = `
    @keyframes fallPetal {
        0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0.7;
        }
        100% {
            transform: translateY(100vh) rotate(720deg) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(petalsStyle);


// =========================================
// ⭐ شرارات عند أول لمس
// =========================================
let firstTouchDone = false;

function initFirstTouchSparkle() {
    document.addEventListener('touchstart', handleFirstTouch, { once: true });
    document.addEventListener('click', handleFirstTouch, { once: true });
}

function handleFirstTouch(e) {
    if (firstTouchDone) return;
    firstTouchDone = true;
    
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    
    createTouchSparkles(x, y);
}

function createTouchSparkles(x, y) {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(container);
    
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 12;
        const distance = Math.random() * 60 + 20;
        const size = Math.random() * 4 + 2;
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, #ffd700, #daa520);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 10px #daa520;
            animation: sparkleBurst 0.8s ease-out forwards;
            --angle: ${angle}rad;
            --distance: ${distance}px;
        `;
        
        container.appendChild(sparkle);
    }
    
    setTimeout(() => container.remove(), 800);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);


// =========================================
// 📳 اهتزازات مختلفة
// =========================================
function vibrate(type) {
    if (!navigator.vibrate) return;
    
    switch(type) {
        case 'open':
            navigator.vibrate(50);
            break;
        case 'qr':
            navigator.vibrate([50, 100, 50]);
            break;
        case 'gift':
            navigator.vibrate([100, 50, 100, 50, 100]);
            break;
        case 'light':
            navigator.vibrate(30);
            break;
        case 'strong':
            navigator.vibrate([80, 50, 80]);
            break;
    }
}

// ربط الاهتزازات بالأزرار
function initVibrations() {
    // زر OPEN (الستارة)
    const startBtn = document.getElementById('start-invitation');
    if (startBtn) {
        startBtn.addEventListener('click', () => vibrate('open'));
    }
    
    // زر QR
    const btnQR = document.getElementById('btn-qr');
    if (btnQR) {
        btnQR.addEventListener('click', () => vibrate('qr'));
    }
    
    // زر الهدية
    const btnGift = document.getElementById('btn-gift');
    if (btnGift) {
        btnGift.addEventListener('click', () => vibrate('gift'));
    }
    
    // زر الموقع
    const btnLocation = document.getElementById('btn-location');
    if (btnLocation) {
        btnLocation.addEventListener('click', () => vibrate('light'));
    }
    
    // زر المشاركة
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', () => vibrate('light'));
    }
}


// =========================================
// 👋 رسالة عند المغادرة
// =========================================
let reachedEnd = false;

function initExitMessage() {
    // تتبع الوصول للنهاية
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / 
            (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 80) reachedEnd = true;
    });
    
    // رسالة عند المغادرة
    window.addEventListener('beforeunload', (e) => {
        if (!reachedEnd) {
            e.preventDefault();
            e.returnValue = 'نتمنى أن نراكم في يومنا الجميل 🤍';
        }
    });
    
    // رسالة ناعمة عند تبديل التبويب (للجوال)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && !reachedEnd) {
            document.title = 'نتمنى أن نراكم في يومنا الجميل 🤍';
        } else {
            document.title = 'فرح شهد وأحمد';
        }
    });
}


// =========================================
// 🚀 تشغيل كل التأثيرات
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initRippleEffect();
    initEndPetals();
    initFirstTouchSparkle();
    initVibrations();
    initExitMessage();
});