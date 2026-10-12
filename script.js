// Mobile navigation
document.querySelectorAll('.menu-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const nav = button.parentElement.querySelector('.nav');
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? '×' : '☰';
  });
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  const nav = link.closest('.nav');
  if (nav) nav.classList.remove('open');
}));

// Admission enquiry demo: creates a local text file; no information is sent to a server.
const admissionForm = document.getElementById('admission-form');
if (admissionForm) {
  const params = new URLSearchParams(location.search);
  const requested = params.get('course');
  const courseSelect = document.getElementById('course');
  if (requested && courseSelect) {
    const match = Array.from(courseSelect.options).find(o => o.value.toLowerCase() === requested.toLowerCase() || o.text.toLowerCase().replace(/[^a-z]/g,'') === requested.toLowerCase().replace(/[^a-z]/g,''));
    if (match) courseSelect.value = match.value;
  }
  admissionForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(admissionForm);
    const content = ['IIGM Admission Enquiry — DEMO DRAFT', `Name: ${data.get('name')}`, `Phone: ${data.get('phone')}`, `Email: ${data.get('email') || 'Not provided'}`, `Course: ${data.get('course')}`, `Question: ${data.get('message') || 'Not provided'}`].join('\n');
    const url = URL.createObjectURL(new Blob([content], {type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href=url; a.download='iigm-admission-enquiry-demo.txt'; a.click(); URL.revokeObjectURL(url);
    document.getElementById('form-message').textContent = 'Demo enquiry draft downloaded. It has NOT been sent to IIGM.';
  });
}

// Fictional student result demonstration. Never use real student data in this static demo.
const resultForm = document.getElementById('result-form');
if (resultForm) {
  const demo = {
    roll: 'IIGM2026001',
    dob: '2005-08-15',
    name: 'Aarav Sharma (DEMO STUDENT)',
    program: 'Bachelor of Business Administration (BBA) — DEMO',
    semester: 'Semester II',
    exam: 'Sample Examination 2026',
    subjects: [
      ['Principles of Management', 78, 100],
      ['Business Communication', 82, 100],
      ['Financial Accounting', 74, 100],
      ['Business Economics', 69, 100],
      ['Computer Applications', 88, 100]
    ]
  };
  resultForm.addEventListener('submit', event => {
    event.preventDefault();
    const roll = document.getElementById('roll').value.trim().toUpperCase();
    const dob = document.getElementById('dob').value;
    const error = document.getElementById('result-error');
    const output = document.getElementById('result-card');
    const empty = document.getElementById('empty-result');
    if (roll !== demo.roll || dob !== demo.dob) {
      error.textContent = 'No demo result found. For the preview, use the sample roll number and date of birth shown below.';
      output.classList.add('hidden'); empty.classList.remove('hidden'); return;
    }
    error.textContent = '';
    const total = demo.subjects.reduce((sum, s) => sum + s[1], 0);
    const max = demo.subjects.reduce((sum, s) => sum + s[2], 0);
    const percent = (total / max * 100).toFixed(2);
    const status = demo.subjects.every(s => s[1] >= 35) ? 'PASS (DEMO)' : 'NEEDS REVIEW (DEMO)';
    output.innerHTML = `<div class="result-banner"><div class="result-mark">IIGM</div><div><small>INDIAN INSTITUTE OF INNOVATION &amp; GLOBAL MANAGEMENT</small><h2>Student Result Statement</h2><p>FICTIONAL DEMO — NOT AN OFFICIAL RESULT</p></div></div>
      <div class="student-meta"><div><small>Student name</small><b>${demo.name}</b></div><div><small>Roll number</small><b>${demo.roll}</b></div><div><small>Program</small><b>${demo.program}</b></div><div><small>Examination</small><b>${demo.exam}</b></div><div><small>Semester</small><b>${demo.semester}</b></div><div><small>Date of birth</small><b>15 Aug 2005 (DEMO)</b></div></div>
      <div class="table-wrap"><table class="marks-table"><thead><tr><th>Subject</th><th>Marks obtained</th><th>Maximum marks</th></tr></thead><tbody>${demo.subjects.map(s => `<tr><td>${s[0]}</td><td>${s[1]}</td><td>${s[2]}</td></tr>`).join('')}</tbody><tfoot><tr><th>Total</th><th>${total}</th><th>${max}</th></tr></tfoot></table></div>
      <div class="result-summary"><div><small>Percentage</small><strong>${percent}%</strong></div><div><small>Result status</small><strong>${status}</strong></div></div><p class="result-disclaimer">This result uses fictional data only to demonstrate the screen layout. It has no academic validity.</p><button class="btn btn-navy print-btn" onclick="window.print()">Print demo result</button>`;
    empty.classList.add('hidden'); output.classList.remove('hidden');
  });
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => {
    if (button.dataset.copy === 'roll') document.getElementById('roll').value = demo.roll;
    if (button.dataset.copy === 'dob') document.getElementById('dob').value = demo.dob;
  }));
}
