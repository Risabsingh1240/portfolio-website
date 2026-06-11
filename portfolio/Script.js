/* ══════════════════════════════════════════
   RISAB SINGH PORTFOLIO — script.js
══════════════════════════════════════════ */

/* ── 1. NAVBAR: scroll state + active link ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });

/* ── 2. HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

/* ── 3. TYPEWRITER EFFECT ── */
const phrases = [
  'Java Applications.',
  'Web Experiences.',
  'Clean Code.',
  'Real Solutions.',
  'Cool Projects.',
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let twPause = false;
const twEl = document.getElementById('typewriter');

function typeWriter() {
  if (!twEl) return;

  const current = phrases[phraseIdx];

  if (twPause) {
    setTimeout(typeWriter, 1200);
    twPause = false;
    return;
  }

  if (!isDeleting) {
    charIdx++;
    twEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      twPause = true;
    }
    setTimeout(typeWriter, 85);
  } else {
    charIdx--;
    twEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
    setTimeout(typeWriter, 45);
  }
}
typeWriter();

/* ── 4. SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .edu-card, .about-text, .about-code, .contact-item, .contact-form, .detail-item'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── 5. SKILL BARS ANIMATION ── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      fill.style.width = width + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ── 6. CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim() || 'Message from Portfolio';
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill all required fields.', 'error');
    return;
  }

  // Compose mailto link
  const mailto = `mailto:singhrisab95@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailto;

  showToast('Opening your email client... 📧', 'success');
  contactForm.reset();
});

/* ── 7. TOAST NOTIFICATION ── */
function showToast(msg, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 0.85rem 1.5rem;
    border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    z-index: 9999;
    animation: toast-in 0.3s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    ${type === 'success'
      ? 'background: linear-gradient(135deg,#a855f7,#6366f1); color: #fff;'
      : 'background: rgba(239,68,68,0.9); color: #fff; border: 1px solid rgba(239,68,68,0.5);'}
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toast-in {
      from { opacity:0; transform: translateY(10px) scale(0.95); }
      to   { opacity:1; transform: translateY(0) scale(1); }
    }
    @keyframes toast-out {
      from { opacity:1; transform: translateY(0) scale(1); }
      to   { opacity:0; transform: translateY(10px) scale(0.95); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ── 8. SMOOTH SCROLL for all anchors ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 9. HERO SECTION – Parallax orbs on mouse move ── */
const hero = document.querySelector('.hero');
const orbs = document.querySelectorAll('.orb');

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const dx = (clientX / innerWidth - 0.5) * 20;
    const dy = (clientY / innerHeight - 0.5) * 20;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.5;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    orbs.forEach(orb => {
      orb.style.transform = '';
    });
  });
}

/* ── 10. FLOATING CARDS subtle parallax ── */
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  floatingCards.forEach((card, i) => {
    const speed = 0.05 + i * 0.02;
    card.style.transform = `translateY(${scrollY * speed * -1}px)`;
  });
}, { passive: true });

/* ── 11. PROFILE RING — glow on scroll proximity ── */
const profileRing = document.querySelector('.profile-ring');

if (profileRing) {
  const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        profileRing.style.filter = 'drop-shadow(0 0 30px rgba(168,85,247,0.4))';
      } else {
        profileRing.style.filter = '';
      }
    });
  }, { threshold: 0.5 });
  ringObserver.observe(profileRing);
}

/* ── 12. SKILL CARD — tilt effect on hover ── */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-4px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── 13. PROJECT CARD — spotlight effect ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(168,85,247,0.06), rgba(255,255,255,0.03) 40%, transparent 80%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

/* ── 14. YEAR in footer ── */
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
  yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
}

/* ── 15. Page Load entrance ── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});