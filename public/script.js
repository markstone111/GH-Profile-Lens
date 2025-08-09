(async function () {
  const profileEl = document.getElementById("profile");
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn && logoutBtn.addEventListener("click", () => {
    window.location.href = "/logout";
  });

  function showError(msg) {
    profileEl.innerHTML = `<p class="error">${msg}</p>`;
  }

  try {
    // Get user data from server
    const userRes = await fetch("/api/user");
    if (userRes.status === 401) {
      showError("You are not logged in. <a href='/'>Go to home</a>");
      return;
    }
    const user = await userRes.json();

    // Get repos from server
    const reposRes = await fetch("/api/repos");
    const repos = reposRes.ok ? await reposRes.json() : [];

    profileEl.innerHTML = `
      <div class="profile-top">
        <img class="avatar" src="${user.avatar_url}" alt="${user.login}" />
        <div class="meta">
          <h2>${escapeHtml(user.name || user.login)}</h2>
          <p class="muted">${escapeHtml(user.bio || "")}</p>
          <p class="small">Followers: ${user.followers} • Following: ${user.following} • Public repos: ${user.public_repos}</p>
          ${user.email ? `<p class="small">Email: ${escapeHtml(user.email)}</p>` : ""}
          <p><a href="${user.html_url}" target="_blank" rel="noopener">View on GitHub</a></p>
        </div>
      </div>

      <h3 class="repos-title">Repositories (${Array.isArray(repos) ? repos.length : 0})</h3>
      <ul class="repo-list">
        ${Array.isArray(repos) && repos.length
          ? repos.map(r => `<li><a href="${r.html_url}" target="_blank" rel="noopener">${escapeHtml(r.name)}</a> <span class="muted small"> — ${escapeHtml(r.description || "")}</span></li>`).join("")
          : "<li class='muted'>No repositories found.</li>"}
      </ul>
    `;
  } catch (err) {
    console.error(err);
    showError("Something went wrong while fetching your profile.");
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/[&<>"']/g, s => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[s]));
  }
})();
