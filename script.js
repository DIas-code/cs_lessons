/* ============================================================
   C# + .NET MAUI Course — Sidebar & Navigation Script
   ============================================================ */

const LESSONS = [
  // Part 1 — C# Basics
  { id: 'l01', num: 'L01', title: 'C# intro + program structure',    date: '06.02', part: 1, status: 'done' },
  { id: 'l02', num: 'L02', title: 'Variables, constants, data types', date: '13.02', part: 1, status: 'done' },
  { id: 'l03', num: 'L03', title: 'Console I/O + operations',         date: '20.02', part: 1, status: 'done' },
  { id: 'l04', num: 'L04', title: 'Conditional expressions',          date: '27.02', part: 1, status: 'done' },
  { id: 'l05', num: 'L05', title: 'Loops',                            date: '06.03', part: 1, status: 'done' },
  { id: 'l06', num: 'L06', title: 'Arrays',                           date: '13.03', part: 1, status: 'done' },
  { id: 'l07', num: 'L07', title: 'Methods',                          date: '20.03', part: 1, status: 'done' },
  { id: 'l08', num: 'L08', title: 'Arrays &amp; Methods practice',    date: '27.03', part: 1, status: 'done' },
  { id: 'l09', num: 'L09', title: 'Tasks review + Q&amp;A',           date: '03.04', part: 1, status: 'done' },

  // Part 2 — OOP
  { id: 'l10', num: 'L10', title: 'OOP pt.1 — Classes &amp; objects', date: '10.04', part: 2, status: 'today' },
  { id: 'l11', num: 'L11', title: 'OOP pt.2 — Inheritance &amp; interfaces', date: '17.04', part: 2, status: 'upcoming' },

  // Part 3 — .NET MAUI
  { id: 'l12', num: 'L12', title: 'MAUI intro + setup',               date: '24.04', part: 3, status: 'upcoming' },
  { id: 'l13', num: 'L13', title: 'UI components + navigation',       date: '08.05', part: 3, status: 'upcoming' },
  { id: 'l14', num: 'L14', title: 'Data binding + MVVM',              date: '15.05', part: 3, status: 'upcoming' },
  { id: 'l15', num: 'L15', title: 'MAUI + PostgreSQL connection',     date: '22.05', part: 3, status: 'upcoming' },
  { id: 'l16', num: 'L16', title: 'CRUD operations',                  date: '29.05', part: 3, status: 'upcoming' },
  { id: 'l17', num: 'L17', title: 'Final project work session',       date: '05.06', part: 3, status: 'upcoming' },

  // Part 4 — Final
  { id: 'l18', num: 'L18', title: 'Final project defense',            date: '12.06', part: 4, status: 'upcoming' },
];

const PARTS = [
  { num: 1, label: 'Part 1 — C# Basics',  cls: 'p1' },
  { num: 2, label: 'Part 2 — OOP',        cls: 'p2' },
  { num: 3, label: 'Part 3 — .NET MAUI',  cls: 'p3' },
  { num: 4, label: 'Part 4 — Final',      cls: 'p4' },
];

function buildSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const root       = document.body.dataset.root || './';
  const activePage = document.body.dataset.page || '';

  let html = `
    <div class="sidebar-header">
      <a href="${root}index.html" class="course-title">C# + .NET MAUI</a>
      <div class="course-subtitle">18 lessons &middot; Every Friday &middot; 80 min</div>
    </div>
    <nav class="sidebar-nav" aria-label="Course navigation">
  `;

  for (const part of PARTS) {
    const partLessons = LESSONS.filter(l => l.part === part.num);

    html += `<div class="nav-part">`;
    html += `<div class="part-label ${part.cls}">${part.label}</div>`;
    html += `<ul class="nav-list">`;

    for (const lesson of partLessons) {
      const isActive   = (activePage === lesson.id);
      const activeClass = isActive ? ' active' : '';
      const dot = (lesson.status === 'done' || lesson.status === 'today')
        ? `<span class="status-dot ${lesson.status}"></span>`
        : '';

      // From lessons/, we go to ../lessons/l0x.html
      // From root,     we go to    ./lessons/l0x.html
      const href = `${root}lessons/${lesson.id}.html`;

      html += `
        <li>
          <a href="${href}" class="nav-link${activeClass}" title="${lesson.num} — ${lesson.title}">
            <span class="lnum">${lesson.num}</span>
            <span class="lesson-text">${lesson.title}</span>
            ${dot}
          </a>
        </li>
      `;
    }

    html += `</ul></div>`;
  }

  html += `</nav>`;

  const isGrading = activePage === 'grading';
  html += `
    <div class="sidebar-footer">
      <a href="${root}grading.html" class="nav-link-grading${isGrading ? ' active' : ''}">
        <span aria-hidden="true">📊</span> Grading System
      </a>
    </div>
  `;

  sidebar.innerHTML = html;

  // ---- Hamburger toggle ----
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });
}

document.addEventListener('DOMContentLoaded', buildSidebar);
