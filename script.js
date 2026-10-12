const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }));
}

const form = document.getElementById('enquiry-form');
const message = document.getElementById('form-message');
if (form && message) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const summary = [
      'IIGM Admission Enquiry (draft only)',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Interest: ${data.get('course')}`,
      `Message: ${data.get('message') || 'Not provided'}`
    ].join('\\n');
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a');
    download.href = url;
    download.download = 'iigm-enquiry-draft.txt';
    download.click();
    URL.revokeObjectURL(url);
    message.textContent = 'Enquiry draft downloaded to your device. This demo does not send data to IIGM.';
  });
}
