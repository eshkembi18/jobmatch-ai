// static/js/post_job.js
document.getElementById('job-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = {
    title:       form.title.value,
    company:     form.company.value,
    location:    form.location.value,
    description: form.description.value
  };
  const statusEl = document.getElementById('status');
  statusEl.textContent = 'Posting…';

  try {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw await res.json();
    const { id } = await res.json();
    statusEl.textContent = `Job posted! ID = ${id}`;
    form.reset();
  } catch (err) {
    statusEl.textContent = `Error: ${err.error || err}`;
  }
});
