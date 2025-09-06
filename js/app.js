
// Editable flights array — update manually
// Each flight: { id, from, to, time, status }
// status can be: "on-time", "delayed", "ongoing"
const flights = [
  { id: "KE123", from: "ICN", to: "LAX", time: "09:40", status: "ongoing" },
  { id: "KE456", from: "ICN", to: "NRT", time: "11:30", status: "on-time" },
  { id: "KE789", from: "ICN", to: "SYD", time: "22:00", status: "delayed" },
  { id: "KE321", from: "ICN", to: "JFK", time: "13:15", status: "on-time" }
];

// Small set of media items for index/media page (editable)
const mediaItems = [
  { title: "Korean Air starts new seasonal route", date: "2025-08-01", excerpt: "New flights to XYZ announced.", link: "#" },
  { title: "Sustainability milestone achieved", date: "2025-07-18", excerpt: "Reducing emissions across fleet.", link: "#" },
  { title: "In-flight experience refreshed", date: "2025-06-10", excerpt: "Improved meals and entertainment.", link: "#" }
];

const statusMeta = {
  "on-time": { cls: "status-on-time", label: "On time" },
  "delayed": { cls: "status-delayed", label: "Delayed" },
  "ongoing": { cls: "status-ongoing", label: "Ongoing" }
};

function renderFlights(tab = "scheduled") {
  const container = document.getElementById('tab-content');
  if (!container) return;

  const filtered = (tab === 'ongoing') ? flights.filter(f=>f.status==='ongoing') : flights.filter(f=>f.status!=='ongoing');

  if (filtered.length === 0) {
    container.innerHTML = `<div class="card"><p>No ${tab} flights available.</p></div>`;
    return;
  }

  const rows = filtered.map(f => {
    const meta = statusMeta[f.status] || {cls:'', label:f.status};
    return `<tr>
      <td class="flight-no">${f.id}</td>
      <td>${f.from}</td>
      <td>${f.to}</td>
      <td>${f.time}</td>
      <td><span class="status-pill ${meta.cls}">${meta.label}</span></td>
    </tr>`;
  }).join('');

  container.innerHTML = `<div class="table-wrap"><table class="flight-table" aria-label="Flights">
    <thead><tr><th>Flight</th><th>From</th><th>To</th><th>Time</th><th>Status</th></tr></thead>
    <tbody>${rows}</tbody></table></div>`;
}

function renderMediaTeaser(){
  const wrap = document.getElementById('media-cards');
  if (!wrap) return;
  wrap.innerHTML = mediaItems.slice(0,3).map(m=>{
    return `<article class="card">
      <h4>${m.title}</h4>
      <small>${m.date}</small>
      <p>${m.excerpt}</p>
      <p><a href="${m.link}" class="link">Read more</a></p>
    </article>`;
  }).join('');
}

function renderMediaListing(){
  const wrap = document.getElementById('media-articles');
  if (!wrap) return;
  wrap.innerHTML = mediaItems.map(m=>{
    return `<article class="card">
      <h3>${m.title}</h3>
      <small>${m.date}</small>
      <p>${m.excerpt}</p>
      <p><a href="${m.link}" class="link">Read more</a></p>
    </article>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', ()=>{
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if (el) el.textContent = y;

  const mb = document.getElementById('mobile-menu-btn');
  if (mb){
    mb.addEventListener('click', ()=>{
      const nav = document.querySelector('.main-nav');
      const expanded = mb.getAttribute('aria-expanded') === 'true';
      mb.setAttribute('aria-expanded', String(!expanded));
      if (nav) nav.style.display = expanded ? '' : 'flex';
    });
  }

  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      tabBtns.forEach(b=>b.classList.remove('active'));
      tabBtns.forEach(b=>b.setAttribute('aria-selected','false'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      const tab = btn.dataset.tab || 'scheduled';
      renderFlights(tab);
    });
  });

  renderFlights('scheduled');
  renderMediaTeaser();
  renderMediaListing();
});
