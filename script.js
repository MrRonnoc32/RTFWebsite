// Mobile nav toggle
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list');
if (menuBtn && navList){
  menuBtn.addEventListener('click', () => {
    const show = !navList.classList.contains('show');
    navList.classList.toggle('show', show);
    menuBtn.setAttribute('aria-expanded', String(show));
  });
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Speaking request form -> mailto
const requestForm = document.getElementById('request-form');
if (requestForm){
  requestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(requestForm);
    const subject = encodeURIComponent('Speaking Request');
    const body = encodeURIComponent(
      `Name: ${data.get('name') || ''}\n`+
      `Organization: ${data.get('org') || ''}\n`+
      `Email: ${data.get('email') || ''}\n`+
      `Event Date: ${data.get('date') || ''}\n\n`+
      `${data.get('details') || ''}`
    );
    window.location.href = `mailto:info@rachaeltfortune.com?subject=${subject}&body=${body}`;
  });
}

// Contact form -> mailto
const contactForm = document.getElementById('contact-form');
if (contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent('Website Contact');
    const body = encodeURIComponent(
      `From: ${data.get('from')}\n\n${data.get('message')}`
    );
    window.location.href = `mailto:info@rachaeltfortune.com?subject=${subject}&body=${body}`;
  });
}
