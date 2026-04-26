/* ============================================
   ECOWASTE PRO - COMPLETE JAVASCRIPT
   ============================================ */

// === WhatsApp Configuration ===
const WHATSAPP_NUMBER = '2347030151024';

function sendToWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// === Preloader ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});

// === Navbar ===
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to top
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// === Toast Notification ===
function showToast(message, type = 'success', duration = 4000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const icons = {
        success: '<i class="fas fa-check-circle"></i>',
        error: '<i class="fas fa-exclamation-circle"></i>',
        info: '<i class="fas fa-info-circle"></i>'
    };

    toast.className = `toast show ${type}`;
    toast.innerHTML = `${icons[type] || ''} ${message}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// === Password Toggle ===
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// === Testimonial Slider ===
let currentTestimonial = 0;
function showTestimonial(index) {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    if (cards.length === 0) return;

    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentTestimonial = index;
    cards[index].classList.add('active');
    dots[index].classList.add('active');
}

// Auto-slide testimonials
setInterval(() => {
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length > 0) {
        currentTestimonial = (currentTestimonial + 1) % cards.length;
        showTestimonial(currentTestimonial);
    }
}, 5000);

// === Counter Animation ===
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        updateCounter();
    });
}

// Intersection Observer for counters
const statsSection = document.getElementById('stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// === Pricing Toggle ===
const pricingToggle = document.getElementById('pricingToggle');
if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
        const amounts = document.querySelectorAll('.amount');
        const periods = document.querySelectorAll('.period');
        amounts.forEach(amount => {
            const monthly = parseInt(amount.dataset.monthly);
            const yearly = parseInt(amount.dataset.yearly);
            if (pricingToggle.checked) {
                amount.textContent = yearly.toLocaleString();
            } else {
                amount.textContent = monthly.toLocaleString();
            }
        });
        periods.forEach(period => {
            period.textContent = pricingToggle.checked ? '/year' : '/month';
        });
    });
}

// === Form Handlers ===

// Helper: Build WhatsApp message from form data
function buildFormMessage(formTitle, formData) {
    let message = `📋 *${formTitle}*\n`;
    message += `📅 Date: ${new Date().toLocaleString()}\n`;
    message += `─────────────────\n`;

    for (const [key, value] of formData.entries()) {
        if (value && key !== 'password' && key !== 'confirmPassword') {
            const label = key.replace(/([A-Z])/g, ' $1')
                            .replace(/^./, str => str.toUpperCase())
                            .replace(/_/g, ' ');
            message += `▫️ *${label}:* ${value}\n`;
        }
    }

    message += `─────────────────\n`;
    message += `✅ Sent via EcoWaste Pro`;
    return message;
}

// Registration Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const message = buildFormMessage('NEW USER REGISTRATION', formData);

        showToast('🎉 Registration successful! Redirecting to WhatsApp...', 'success');
        
        // Save user data locally
        const userData = Object.fromEntries(formData.entries());
        delete userData.password;
        localStorage.setItem('ecowasteUser', JSON.stringify(userData));

        setTimeout(() => {
            sendToWhatsApp(message);
        }, 1500);

        registerForm.reset();
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const message = buildFormMessage('CONTACT MESSAGE', formData);

        showToast('📨 Message sent! Opening WhatsApp...', 'success');

        setTimeout(() => {
            sendToWhatsApp(message);
        }, 1500);

        contactForm.reset();
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(newsletterForm);
        const email = formData.get('email');
        const message = `📰 *NEWSLETTER SUBSCRIPTION*\n📧 Email: ${email}\n📅 Date: ${new Date().toLocaleString()}\n✅ Via EcoWaste Pro`;

        showToast('✅ Subscribed to newsletter!', 'success');
        sendToWhatsApp(message);
        newsletterForm.reset();
    });
}

// Schedule Pickup Form
const pickupForm = document.getElementById('pickupForm');
if (pickupForm) {
    pickupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(pickupForm);
        const message = buildFormMessage('🚛 NEW PICKUP REQUEST', formData);

        // Generate tracking ID
        const trackingId = 'EWP-' + Date.now().toString(36).toUpperCase();
        
        // Save pickup to local storage
        const pickups = JSON.parse(localStorage.getItem('pickups') || '[]');
        const pickupData = Object.fromEntries(formData.entries());
        pickupData.trackingId = trackingId;
        pickupData.status = 'Pending';
        pickupData.createdAt = new Date().toISOString();
        pickups.push(pickupData);
        localStorage.setItem('pickups', JSON.stringify(pickups));

        const fullMessage = message + `\n🔖 *Tracking ID:* ${trackingId}`;

        showToast(`✅ Pickup scheduled! Tracking ID: ${trackingId}`, 'success', 6000);

        setTimeout(() => {
            sendToWhatsApp(fullMessage);
        }, 2000);

        pickupForm.reset();
    });
}

// Complaint Form
const complaintForm = document.getElementById('complaintForm');
if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(complaintForm);
        const ticketId = 'TKT-' + Date.now().toString(36).toUpperCase();
        const message = buildFormMessage('⚠️ COMPLAINT/FEEDBACK', formData) + `\n🎫 *Ticket ID:* ${ticketId}`;

        // Save complaint
        const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        const complaintData = Object.fromEntries(formData.entries());
        complaintData.ticketId = ticketId;
        complaintData.status = 'Open';
        complaintData.createdAt = new Date().toISOString();
        complaints.push(complaintData);
        localStorage.setItem('complaints', JSON.stringify(complaints));

        showToast(`📝 Complaint submitted! Ticket: ${ticketId}`, 'success', 6000);

        setTimeout(() => {
            sendToWhatsApp(message);
        }, 2000);

        complaintForm.reset();
    });
}

// Payment Form
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(paymentForm);
        const refId = 'PAY-' + Date.now().toString(36).toUpperCase();
        const message = buildFormMessage('💳 PAYMENT SUBMISSION', formData) + `\n🧾 *Reference:* ${refId}`;

        // Save payment
        const payments = JSON.parse(localStorage.getItem('payments') || '[]');
        const paymentData = Object.fromEntries(formData.entries());
        paymentData.referenceId = refId;
        paymentData.status = 'Processing';
        paymentData.createdAt = new Date().toISOString();
        payments.push(paymentData);
        localStorage.setItem('payments', JSON.stringify(payments));

        showToast(`💰 Payment submitted! Reference: ${refId}`, 'success', 6000);

        setTimeout(() => {
            sendToWhatsApp(message);
        }, 2000);

        paymentForm.reset();
    });
}

// Community Event Registration
const eventForm = document.getElementById('eventForm');
if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(eventForm);
        const message = buildFormMessage('🌍 COMMUNITY EVENT REGISTRATION', formData);

        showToast('🎉 Event registration successful!', 'success');

        setTimeout(() => {
            sendToWhatsApp(message);
        }, 1500);

        eventForm.reset();
    });
}

// Profile Update Form
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(profileForm);
        const message = buildFormMessage('👤 PROFILE UPDATE REQUEST', formData);

        // Update local storage
        const userData = Object.fromEntries(formData.entries());
        localStorage.setItem('ecowasteUser', JSON.stringify(userData));

        showToast('✅ Profile updated successfully!', 'success');

        setTimeout(() => {
            sendToWhatsApp(message);
        }, 1500);
    });
}

// Report Issue Form
const reportForm = document.getElementById('reportForm');
if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(reportForm);
        const reportId = 'RPT-' + Date.now().toString(36).toUpperCase();
        const message = buildFormMessage('📊 WASTE REPORT SUBMISSION', formData) + `\n📑 *Report ID:* ${reportId}`;

        showToast(`📊 Report submitted! ID: ${reportId}`, 'success');

        setTimeout(() => {
            sendToWhatsApp(message);
        }, 1500);

        reportForm.reset();
    });
}

// === Sidebar Toggle (Dashboard Pages) ===
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarClose = document.querySelector('.sidebar-close');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

// Close sidebar on outside click
document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('active')) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// === Payment Method Selection ===
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
        method.classList.add('selected');
        const input = method.querySelector('input[type="radio"]');
        if (input) input.checked = true;
    });
});

// === Load User Data ===
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('ecowasteUser') || '{}');
    const userNameElements = document.querySelectorAll('.user-name');
    const userEmailElements = document.querySelectorAll('.user-email');
    const userAvatarElements = document.querySelectorAll('.user-avatar');

    if (userData.firstName) {
        userNameElements.forEach(el => {
            el.textContent = `${userData.firstName} ${userData.lastName || ''}`;
        });
        userAvatarElements.forEach(el => {
            el.textContent = (userData.firstName[0] || '') + (userData.lastName ? userData.lastName[0] : '');
        });
    }
    if (userData.email) {
        userEmailElements.forEach(el => {
            el.textContent = userData.email;
        });
    }

    return userData;
}

// === Load Pickup History ===
function loadPickupHistory() {
    const pickups = JSON.parse(localStorage.getItem('pickups') || '[]');
    const tableBody = document.getElementById('pickupTableBody');
    if (!tableBody) return;

    if (pickups.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center" style="padding: 40px;">
                    <i class="fas fa-inbox" style="font-size: 3rem; color: var(--gray); display: block; margin-bottom: 10px;"></i>
                    <p class="text-muted">No pickups scheduled yet</p>
                    <a href="schedule-pickup.html" class="btn btn-primary btn-sm" style="margin-top: 10px;">Schedule Now</a>
                </td>
            </tr>`;
        return;
    }

    tableBody.innerHTML = pickups.reverse().map(pickup => `
        <tr>
            <td><strong>${pickup.trackingId}</strong></td>
            <td>${pickup.wasteType || 'General'}</td>
            <td>${pickup.pickupDate || 'N/A'}</td>
            <td>${pickup.address || 'N/A'}</td>
            <td><span class="status status-${pickup.status.toLowerCase()}">${pickup.status}</span></td>
            <td>
                <a href="track-pickup.html?id=${pickup.trackingId}" class="btn btn-sm btn-outline">
                    <i class="fas fa-eye"></i> Track
                </a>
            </td>
        </tr>
    `).join('');
}

// === Load Complaints ===
function loadComplaints() {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const tableBody = document.getElementById('complaintTableBody');
    if (!tableBody) return;

    if (complaints.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center" style="padding: 40px;">
                    <p class="text-muted">No complaints filed</p>
                </td>
            </tr>`;
        return;
    }

    tableBody.innerHTML = complaints.reverse().map(complaint => `
        <tr>
            <td><strong>${complaint.ticketId}</strong></td>
            <td>${complaint.category || 'General'}</td>
            <td>${complaint.subject || 'N/A'}</td>
            <td><span class="status status-${complaint.status === 'Open' ? 'pending' : 'completed'}">${complaint.status}</span></td>
            <td>${new Date(complaint.createdAt).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// === Load Payments ===
function loadPayments() {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const tableBody = document.getElementById('paymentTableBody');
    if (!tableBody) return;

    if (payments.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center" style="padding: 40px;">
                    <p class="text-muted">No payment history</p>
                </td>
            </tr>`;
        return;
    }

    tableBody.innerHTML = payments.reverse().map(payment => `
        <tr>
            <td><strong>${payment.referenceId}</strong></td>
            <td>₦${parseInt(payment.amount || 0).toLocaleString()}</td>
            <td>${payment.paymentMethod || 'N/A'}</td>
            <td><span class="status status-${payment.status === 'Processing' ? 'progress' : 'completed'}">${payment.status}</span></td>
            <td>${new Date(payment.createdAt).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// === Dashboard Chart ===
function initChart() {
    const chartContainer = document.querySelector('.chart-bar-container');
    if (!chartContainer) return;

    const data = [
        { label: 'Jan', value: 65 },
        { label: 'Feb', value: 45 },
        { label: 'Mar', value: 78 },
        { label: 'Apr', value: 55 },
        { label: 'May', value: 90 },
        { label: 'Jun', value: 70 },
        { label: 'Jul', value: 85 },
        { label: 'Aug', value: 60 },
        { label: 'Sep', value: 75 },
        { label: 'Oct', value: 95 },
        { label: 'Nov', value: 80 },
        { label: 'Dec', value: 88 }
    ];

    chartContainer.innerHTML = data.map(d => `
        <div class="chart-bar" style="height: ${d.value}%;" title="${d.label}: ${d.value}%">
            <span>${d.label}</span>
        </div>
    `).join('');
}

// === Eco Points ===
function getEcoPoints() {
    return parseInt(localStorage.getItem('ecoPoints') || '1250');
}

function updateEcoPoints(points) {
    const current = getEcoPoints();
    localStorage.setItem('ecoPoints', current + points);
}

function loadEcoPoints() {
    const pointsElements = document.querySelectorAll('.eco-points-value');
    pointsElements.forEach(el => {
        el.textContent = getEcoPoints().toLocaleString();
    });
}

// === Redeem Reward ===
function redeemReward(rewardName, pointsCost) {
    const currentPoints = getEcoPoints();
    if (currentPoints < pointsCost) {
        showToast('❌ Not enough eco-points!', 'error');
        return;
    }

    localStorage.setItem('ecoPoints', currentPoints - pointsCost);
    loadEcoPoints();

    const message = `🎁 *REWARD REDEMPTION*\n🏆 Reward: ${rewardName}\n💎 Points Used: ${pointsCost}\n💰 Remaining Points: ${currentPoints - pointsCost}\n📅 Date: ${new Date().toLocaleString()}\n✅ Via EcoWaste Pro`;

    showToast(`🎉 ${rewardName} redeemed successfully!`, 'success');

    setTimeout(() => {
        sendToWhatsApp(message);
    }, 1500);
}

// === Notification System ===
function addNotification(title, message, type = 'info') {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.unshift({
        id: Date.now(),
        title,
        message,
        type,
        read: false,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('notifications', JSON.stringify(notifications.slice(0, 50)));
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const unread = notifications.filter(n => !n.read).length;
    const badges = document.querySelectorAll('.notification-bell .badge');
    badges.forEach(badge => {
        badge.textContent = unread;
        badge.style.display = unread > 0 ? 'flex' : 'none';
    });
}

function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const container = document.getElementById('notificationList');
    if (!container) return;

    if (notifications.length === 0) {
        container.innerHTML = `
            <div class="text-center p-20">
                <i class="fas fa-bell-slash" style="font-size: 3rem; color: var(--gray); margin-bottom: 10px;"></i>
                <p class="text-muted">No notifications yet</p>
            </div>`;
        return;
    }

    const typeIcons = {
        info: 'fa-info-circle text-primary',
        success: 'fa-check-circle text-success',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle text-danger'
    };

    container.innerHTML = notifications.map(n => `
        <div class="notification-item ${n.read ? 'read' : 'unread'}" data-id="${n.id}">
            <div class="notification-icon">
                <i class="fas ${typeIcons[n.type] || typeIcons.info}"></i>
            </div>
            <div class="notification-content">
                <h4>${n.title}</h4>
                <p>${n.message}</p>
                <span class="notification-time">${getTimeAgo(n.createdAt)}</span>
            </div>
        </div>
    `).join('');
}

function getTimeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

// === Initialize on Page Load ===
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    loadPickupHistory();
    loadComplaints();
    loadPayments();
    loadEcoPoints();
    loadNotifications();
    updateNotificationBadge();
    initChart();

    // Add sample notifications if empty
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    if (notifications.length === 0) {
        addNotification('Welcome to EcoWaste Pro! 🎉', 'Your account is ready. Start scheduling pickups today!', 'success');
        addNotification('Eco Tip 🌿', 'Separate your waste into organic, recyclable, and non-recyclable categories.', 'info');
        addNotification('Community Event 🌍', 'Join our neighborhood cleanup this Saturday at 9 AM!', 'info');
    }

    // Set minimum date for date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
});

// === Admin Quick Actions ===
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        localStorage.clear();
        showToast('🗑️ All data cleared!', 'info');
        setTimeout(() => location.reload(), 1500);
    }
}

function exportData() {
    const data = {
        user: JSON.parse(localStorage.getItem('ecowasteUser') || '{}'),
        pickups: JSON.parse(localStorage.getItem('pickups') || '[]'),
        complaints: JSON.parse(localStorage.getItem('complaints') || '[]'),
        payments: JSON.parse(localStorage.getItem('payments') || '[]'),
        notifications: JSON.parse(localStorage.getItem('notifications') || '[]'),
        ecoPoints: getEcoPoints()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecowaste-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('📥 Data exported successfully!', 'success');
}

// === Generic Form Handler for any form with data-whatsapp attribute ===
document.querySelectorAll('form[data-whatsapp]').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const title = form.getAttribute('data-whatsapp') || 'FORM SUBMISSION';
        const message = buildFormMessage(title, formData);

        showToast('✅ Form submitted successfully!', 'success');

        setTimeout(() => {
            sendToWhatsApp(message);
        }, 1500);

        form.reset();
    });
});

// === Particles (Hero section) ===
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(0, 184, 148, ${Math.random() * 0.3});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        container.appendChild(particle);
    }
}
createParticles();

console.log('✅ EcoWaste Pro initialized successfully!');