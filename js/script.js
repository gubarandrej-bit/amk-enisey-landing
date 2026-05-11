// ========================================
// NAVIGATION SMOOTH SCROLL
// ========================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            // Add active class to current link
            link.classList.add('active');
        }
    });
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const object = document.getElementById('object').value;
        const message = document.getElementById('message').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Привет! Я заинтересован в аренде помещения.\n\nИмя: ${name}\nТелефон: ${phone}\nПочта: ${email}\nОбъект: ${object}\nСообщение: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Send via WhatsApp (if available) or email
        const phoneNumber = '73912235000';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Also send email via mailto
        const emailSubject = `Запр��с на аренду: ${object}`;
        const emailBody = whatsappMessage;
        const mailtoLink = `mailto:amk.arenda@amkenisey.ru?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.', 'success');
    });
}

// ========================================
// CONTACT FUNCTION (Called from HTML)
// ========================================

function contactForm(objectName) {
    const contactSection = document.getElementById('contacts');
    const objectSelect = document.getElementById('object');
    
    if (objectSelect) {
        objectSelect.value = objectName;
    }
    
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('name').focus();
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.object-card, .advantage-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// ========================================
// ACTIVE NAVIGATION HIGHLIGHT
// ========================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ========================================
// IMAGE ERROR HANDLING
// ========================================

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.backgroundColor = '#334155';
        this.style.color = '#cbd5e1';
        this.alt = 'Изображение недоступно';
    });
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
    // Skip navigation with Tab key (browser default)
    if (e.key === 'Escape') {
        // Close any open modals or notifications if needed
    }
});

// ========================================
// INITIALIZATION
// ========================================

console.log('АМК-Енисей Landing Page Loaded');
console.log('Contact: +7 (391) 223-50-00');
console.log('Email: amk.arenda@amkenisey.ru');
