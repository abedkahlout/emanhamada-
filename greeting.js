// =========================================
// ☀️ تحية حسب الوقت
// =========================================
function setGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('dynamic-greeting');
    const iconEl = document.getElementById('greeting-icon');
    
    let greeting = '';
    let icon = '';
    let subText = '';
    
    
    if (greetingEl) greetingEl.textContent = greeting;
    if (iconEl) iconEl.textContent = icon;
    
    // إضافة رسالة ترحيبية ديناميكية
    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText && !welcomeText.dataset.greetingSet) {
        const greetingLine = document.createElement('p');
        greetingLine.className = 'greeting-line';
        greetingLine.innerHTML = `${icon} <span>${subText}</span>`;
        greetingLine.style.cssText = `
            color: var(--text-dark);
            font-size: 1rem;
            margin-bottom: 15px;
            font-weight: 500;
        `;
        welcomeText.parentNode.insertBefore(greetingLine, welcomeText);
        welcomeText.dataset.greetingSet = 'true';
    }
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', setGreeting);