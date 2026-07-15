// Injects the retro desktop shortcut icons into the DOM.
export function createDesktopShortcuts() {
  if (document.getElementById('desktop-shortcuts')) return;

  const container = document.createElement('div');
  container.id = 'desktop-shortcuts';

  container.innerHTML = `
    <div class="shortcut-icon" id="shortcut-showcase">
      <div class="icon-image-wrapper">
        <img src="https://alexmeub.com" alt="Showcase">
      </div>
      <span>My Showcase</span>
    </div>

    <div class="shortcut-icon" id="shortcut-oregon">
      <div class="icon-image-wrapper">
        <img src="https://alexmeub.com" alt="Oregon Trail">
      </div>
      <span>The Oregon Trail</span>
    </div>

    <div class="shortcut-icon" id="shortcut-doom">
      <div class="icon-image-wrapper">
        <img src="https://alexmeub.com" alt="Doom">
      </div>
      <span>Doom</span>
    </div>

    <div class="shortcut-icon" id="shortcut-resume">
      <div class="icon-image-wrapper">
        <img src="https://alexmeub.com" alt="Resume">
      </div>
      <span>Resume.doc</span>
    </div>
  `;

  document.body.appendChild(container);
}

// Builds the pop-up XP-style windows behind the non-resume icons.
// Resume.doc reuses the existing #resume-overlay from overlay.js instead of
// getting its own window here.
export function createAppWindows() {
  if (document.getElementById('app-windows')) return;

  const wrap = document.createElement('div');
  wrap.id = 'app-windows';

  wrap.innerHTML = `
    <!-- My Showcase Window -->
    <div id="window-showcase" class="app-overlay hidden">
      <div class="xp-window app-window">
        <div class="xp-title-bar">
          <div class="xp-title-text">
            <img src="https://alexmeub.com" alt="icon" class="xp-title-icon">
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

    <!-- Oregon Trail Window -->
    <div id="window-oregon" class="app-overlay hidden">
      <div class="xp-window app-window game-window">
        <div class="xp-title-bar">
          <div class="xp-title-text">
            <img src="https://alexmeub.com" alt="icon" class="xp-title-icon">
            The Oregon Trail
          </div>
          <div class="xp-window-controls">
            <button class="xp-btn-minimize">_</button>
            <button class="xp-btn-maximize">⬜</button>
            <button class="xp-btn-close" data-close="window-oregon">X</button>
          </div>
        </div>
        <div class="xp-window-body app-window-body game-window-body">
          <iframe
            src="https://archive.org/embed/oregon-trail-deluxe"
            title="The Oregon Trail"
            allowfullscreen
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>

    <!-- Doom Window -->
    <div id="window-doom" class="app-overlay hidden">
      <div class="xp-window app-window game-window">
        <div class="xp-title-bar">
          <div class="xp-title-text">
            <img src="https://alexmeub.com" alt="icon" class="xp-title-icon">
            Doom
          </div>
          <div class="xp-window-controls">
            <button class="xp-btn-minimize">_</button>
            <button class="xp-btn-maximize">⬜</button>
            <button class="xp-btn-close" data-close="window-doom">X</button>
          </div>
        </div>
        <div class="xp-window-body app-window-body game-window-body">
          <iframe
            src="https://archive.org/embed/DOOM_the_game"
            title="Doom"
            allowfullscreen
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>

    <!-- BUG FIX: monitorIcons.js has always tried to open "window-tickets"
         and "window-powershell" for the two on-screen monitor buttons, but
         neither window was ever created, so those buttons silently did
         nothing. Adding minimal placeholder windows for both. -->

    <!-- Tickets Window -->
    <div id="window-tickets" class="app-overlay hidden">
      <div class="xp-window app-window">
        <div class="xp-title-bar">
          <div class="xp-title-text">
            <img src="https://alexmeub.com" alt="icon" class="xp-title-icon">
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

    <!-- Powershell Window -->
    <div id="window-powershell" class="app-overlay hidden">
      <div class="xp-window app-window">
        <div class="xp-title-bar">
          <div class="xp-title-text">
            <img src="https://alexmeub.com" alt="icon" class="xp-title-icon">
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
    btn.addEventListener('click', () => {
      closeApp(btn.getAttribute('data-close'));
    });
  });
}

export function openApp(windowId) {
  // "resume-overlay" is a special case — it reuses the existing resume overlay
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

// Maps each shortcut icon id to the window it should open on click
const APP_TARGETS = {
  'shortcut-showcase': 'window-showcase',
  'shortcut-oregon': 'window-oregon',
  'shortcut-doom': 'window-doom',
  'shortcut-resume': 'resume-overlay',
};

export function initMonitorDesktop() {
  const icons = document.querySelectorAll('.shortcut-icon');

  icons.forEach(icon => {
    // Single click: highlight AND open the app, same as clicking an app icon
    icon.addEventListener('click', (event) => {
      event.stopPropagation(); // Stops click from bleeding into 3D scene
      icons.forEach(i => i.classList.remove('selected'));
      icon.classList.add('selected');

      const target = APP_TARGETS[icon.id];
      if (target) openApp(target);
    });
  });

  // Clear highlighting when clicking desktop blank canvas backgrounds
  window.addEventListener('click', () => {
    icons.forEach(i => i.classList.remove('selected'));
  });
}

// Global utility helper to show or hide shortcuts
export function toggleDesktopShortcuts(show = true) {
  const container = document.getElementById('desktop-shortcuts');
  if (!container) return;

  if (show) {
    container.classList.remove('hidden-shortcuts');
  } else {
    container.classList.add('hidden-shortcuts');
  }
}