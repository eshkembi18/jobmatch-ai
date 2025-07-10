// static/js/script.js
window.addEventListener('DOMContentLoaded', () => {
  const listEl   = document.getElementById('job-list');
  const input    = document.getElementById('search');
  const btn      = document.getElementById('search-btn');

  async function loadJobs(q = '') {
    const url = q
      ? `/api/jobs?q=${encodeURIComponent(q)}`
      : '/api/jobs';
    const res = await fetch(url);
    const data = await res.json();
    const jobs = Array.isArray(data) ? data : data.jobs;

    listEl.innerHTML = '';
    if (jobs.length === 0) {
      listEl.innerHTML = '<li>No jobs found.</li>';
      return;
    }
    jobs.forEach(job => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${job.title}</strong> @ ${job.company}<br>
        <em>${job.location}</em><br>
        ${job.description}
      `;
      listEl.appendChild(li);
    });
  }

  // initial load
  loadJobs();

  // bind search
  btn.addEventListener('click', () => {
    loadJobs(input.value);
  });
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') loadJobs(input.value);
  });
});
