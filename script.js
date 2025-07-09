
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobForm");
  const results = document.getElementById("results") || createResultsContainer(form);

  //  JOB FORM SUBMISSION HANDLER
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const keyword = form.skills.value;
    const res = await fetch(`/jobs?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    const jobHTML = data
      .map(
        (job) => `<div class="card">${job.title} - ${job.location}</div>`
      )
      .join("");

    results.innerHTML = `
      <div class="recommendations">
        <h3>AI-Powered Recommendations</h3>
        ${jobHTML}
      </div>
    `;
  });

  //  LOAD COMPANIES ON PAGE LOAD
  fetch("/companies")
    .then((res) => res.json())
    .then((companies) => {
      const container = document.getElementById("companyList");
      if (container) {
        container.innerHTML = companies
          .map(
            (c) => `
              <div class="company-card">
                <h4>${c.name}</h4>
                <p>Industry: ${c.industry} | Location: ${c.location}</p>
                <p>Size: ${c.size} | Culture: ${c.values.join(", ")}</p>
                <p>Openings: ${c.openings}</p>
              </div>
            `
          )
          .join("");
      }
    });

  //  RESUME UPLOAD HANDLER
  const resumeForm = document.getElementById("resumeForm");
  const uploadMsg = document.getElementById("uploadMsg");

  if (resumeForm && uploadMsg) {
    resumeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(resumeForm);

      const res = await fetch("/resume/upload", {
        method: "POST",
        body: formData,
      });

      const msg = await res.json();
      uploadMsg.innerText = msg.message || msg.error;
    });
  }
});

function createResultsContainer(form) {
  const div = document.createElement("div");
  div.id = "results";
  form.insertAdjacentElement("afterend", div);
  return div;
}
