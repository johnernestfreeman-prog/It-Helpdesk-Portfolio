function initializeXPDesktopSupport() {
  const navButtons = document.querySelectorAll('.nav-item');
  const inlineLinks = document.querySelectorAll('.inline-link');
  const contentViews = document.querySelectorAll('.content-view');

  // Unified Route Core Function
  function switchXPView(targetViewId) {
    // 1. Deactivate all active tabs/views
    contentViews.forEach(view => view.classList.remove('active'));
    navButtons.forEach(btn => btn.classList.remove('active'));

    // 2. Activate target content frame view
    const targetElement = document.getElementById(`view-${targetViewId}`);
    if (targetElement) {
      targetElement.classList.add('active');
      // Scroll workspace back to the top automatically
      document.querySelector('.xp-content-pane').scrollTop = 0;
    }

    // 3. Keep sidebar button states in sync
    navButtons.forEach(btn => {
      if (btn.getAttribute('data-target') === targetViewId) {
        btn.classList.add('active');
      }
    });
  }

  // Bind Sidebar Nav Buttons
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      switchXPView(target);
    });
  });

  // Bind Inline Text Route Links
  inlineLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-target');
      switchXPView(target);
    });
  });

  // BUG FIX: project-card elements had data-target attributes in the markup
  // (e.g. "software", "software-details") but nothing ever listened for
  // clicks on them, and no matching #view-* panels existed either — so they
  // were dead UI. Since there's no per-project detail view yet, clicking a
  // card now just jumps to the Projects tab itself rather than doing
  // nothing; swap this for real per-project views when that content exists.
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      switchXPView('projects');
    });
  });
}

// Invoke registration routing loops instantly on mount
document.addEventListener("DOMContentLoaded", initializeXPDesktopSupport);