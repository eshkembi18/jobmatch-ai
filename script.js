document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobForm");
  const results = document.getElementById("results");

  if (!results) {
    const newResults = document.createElement("div");
    newResults.id = "results";
    form.insertAdjacentElement("afterend", newResults);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const skills = form.skills.value;
    const location = form.location.value;

    const output = `
      <div class="recommendations">
        <h3>AI-Powered Suggestions</h3>
        <div class="card">Software Engineer - ${location}</div>
        <div class="card">Data Analyst - Remote (Skill: ${skills})</div>
      </div>
    `;

    document.getElementById("results").innerHTML = output;
  });
});