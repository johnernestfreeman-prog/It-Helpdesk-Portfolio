// Injects the retro desktop shortcut icons into the DOM.
export function createDesktopShortcuts() {
  if (document.getElementById('desktop-shortcuts')) return;
  
  const container = document.createElement('div');
  container.id = 'desktop-shortcuts';
  container.innerHTML = `
    <div class="shortcut-icon" id="shortcut-this-pc">
      <div class="icon-image-wrapper">
        <img src="/image/My-PC.png" alt="This PC">
      </div>
      <span>This PC</span>
    </div>
    <div class="shortcut-icon" id="shortcut-tickets">
      <div class="icon-image-wrapper">
        <img src="/image/Downloads.png" alt="IT Ticket">
      </div>
      <span>IT Tickets</span>
    </div>
    <div class="shortcut-icon" id="shortcut-projects">
      <div class="icon-image-wrapper">
        <img src="/image/My-Documents.png" alt="Project">
      </div>
      <span>Projects</span>
    </div>
    <div class="shortcut-icon" id="shortcut-resume">
      <div class="icon-image-wrapper">
        <img src="/image/My-Resume.png" alt="Resume">
      </div>
      <span>Resume.doc</span>
    </div>
  `;
  document.body.appendChild(container);
}

// Builds the pop-up XP-style windows behind the non-resume icons.
export function createAppWindows() {
  if (document.getElementById('app-windows')) return;

  const wrap = document.createElement('div');
  wrap.id = 'app-windows';
  wrap.innerHTML = `
    <!-- My Showcase Window (Projects) -->
    <div id="window-showcase" class="app-overlay hidden">
      <div class="xp-window app-window">
        <div class="xp-title-bar">
          <div class="xp-title-text">
            <img src="/images/My-Resume.png" alt="icon" class="xp-title-icon">
            My Showcase
          </div>
          <div class="xp-window-controls">
            <button class="xp-btn-minimize">_</button>
            <button class="xp-btn-maximize">⬜</button>
            <button class="xp-btn-close" data-close="window-showcase">X</button>
          </div>
        </div>
        <div class="xp-window-body app-window-body">
          <h2>My Showcase</h2>
          <p class="section-intro">A few things I've built. (Swap this placeholder content for your real project write-ups and links.)</p>
          <div class="project-card">
            <div class="card-text">
              <h3>Project One</h3>
              <p>DESCRIPTION GOES HERE</p>
            </div>
          </div>
          <div class="project-card">
            <div class="card-text">
              <h3>Project Two</h3>
              <p>DESCRIPTION GOES HERE</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- This PC Window -->
    <div id="window-pc" class="app-overlay hidden">
      <div class="xp-window app-window game-window">
        <div class="xp-title-bar">
          <div class="xp-title-text">
            <img src="/images/My-PC.png" alt="icon" class="xp-title-icon">
            This PC
          </div>
          <div class="xp-window-controls">
            <button class="xp-btn-minimize">_</button>
            <button class="xp-btn-maximize">⬜</button>
            <button class="xp-btn-close" data-close="window-pc">X</button>
          </div>
        </div>
        <div class="xp-window-body app-window-body game-window-body">
          <iframe src="about:blank" title="This PC" allowfullscreen loading="lazy"></iframe>
        </div>
      </div>
    </div>

    <!-- Tickets Window -->
    <div id="window-tickets" class="app-overlay hidden">
      <div class="xp-window app-window">
        <div class="xp-title-bar">
          <div class="xp-title-text">
            <img src="/images/Downloads.png" alt="icon" class="xp-title-icon">
            IT Ticket Queue
          </div>
          <div class="xp-window-controls">
            <button class="xp-btn-minimize">_</button>
            <button class="xp-btn-maximize">⬜</button>
            <button class="xp-btn-close" data-close="window-tickets">X</button>
          </div>
        </div>
        <div class="xp-window-body app-window-body">
          <h2>Ticket Queue</h2>
          <p class="section-intro">PLACEHOLDER — swap in real ticket/support content here.</p>
        </div>
      </div>
    </div>

    <!-- PowerShell Window -->
    <div id="window-powershell" class="app-overlay hidden">
      <div class="xp-window app-window">
        <div class="xp-title-bar">
          <div class="xp-title-text">
            <img src="/images/PowerShell.png" alt="icon" class="xp-title-icon">
            PowerShell
          </div>
          <div class="xp-window-controls">
            <button class="xp-btn-minimize">_</button>
            <button class="xp-btn-maximize">⬜</button>
            <button class="xp-btn-close" data-close="window-powershell">X</button>
          </div>
        </div>
        <div class="xp-window-body app-window-body">
          <h2>PowerShell</h2>
          <p class="section-intro">PLACEHOLDER — swap in a real terminal/console component here.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  // Wire up every close button inside the app windows
  wrap.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      closeApp(btn.getAttribute('data-close'));
    });
  });
}

export function openApp(windowId) {
  if (windowId === 'resume-overlay') {
    const overlay = document.getElementById('resume-overlay');
    if (overlay) overlay.classList.remove('hidden');
    return;
  }
  const win = document.getElementById(windowId);
  if (win) win.classList.remove('hidden');
}

export function closeApp(windowId) {
  const win = document.getElementById(windowId);
  if (win) win.classList.add('hidden');
}

// FIXED: Maps your shortcut icon HTML element IDs to the matching Window element IDs
const APP_TARGETS = {
  'shortcut-this-pc': 'window-pc',
  'shortcut-tickets': 'window-tickets',
  'shortcut-projects': 'window-showcase',
  'shortcut-resume': 'resume-overlay',
};

export function initMonitorDesktop() {
  const icons = document.querySelectorAll('.shortcut-icon');
  icons.forEach(icon => {
    icon.addEventListener('click', (event) => {
      event.stopPropagation();
      icons.forEach(i => i.classList.remove('selected'));
      icon.classList.add('selected');
      
      const target = APP_TARGETS[icon.id];
      if (target) openApp(target);
    });
  });

  window.addEventListener('click', () => {
    icons.forEach(i => i.classList.remove('selected'));
  });
}

export function toggleDesktopShortcuts(show = true) {
  const container = document.getElementById('desktop-shortcuts');
  if (!container) return;
  if (show) {
    container.classList.remove('hidden-shortcuts');
  } else {
    container.classList.add('hidden-shortcuts');
  }
}