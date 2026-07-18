export function createOverlay() {
  // Check if it already exists to prevent duplicate windows
  if (document.getElementById('resume-overlay')) return;
 
  // Create the main wrapper container
  const overlay = document.createElement('div');
  overlay.id = 'resume-overlay';
  overlay.className = 'hidden';
 
  // Inject the exact Windows XP design framework
  overlay.innerHTML = `
    <div class="xp-window tracked-window">
      
      <!-- Title Bar -->
      <div class="xp-title-bar">
        <div class="xp-title-text">
          <img src="https://alexmeub.com" alt="icon" class="xp-title-icon">
          John Freeman - IT Help Desk Portfolio
        </div>
        <div class="xp-window-controls">
          <button class="xp-btn-minimize">_</button>
          <button class="xp-btn-maximize">⬜</button>
          <button id="close-resume-btn" class="xp-btn-close">X</button>
        </div>
      </div>
 
      <!-- Window Workspace Area -->
      <div class="xp-window-body">
        
        <!-- Left Sidebar Navigation -->
        <aside class="xp-sidebar">
          <div class="profile-header">
            <h1>John Freeman</h1>
            <p class="showcase-tag">IT Support Specialist</p>
          </div>
          
          <nav class="xp-nav-links">
            <button class="nav-item active" data-target="home">HOME</button>
            <button class="nav-item" data-target="about">ABOUT</button>
            <button class="nav-item" data-target="experience">SKILLS</button>
            <button class="nav-item" data-target="projects">PROJECTS</button>
            <button class="nav-item" data-target="contact">CONTACT</button>
          </nav>
          
          <div class="sidebar-footer">
            © Copyright 2026 John Freeman
          </div>
        </aside>
 
        <!-- Right Main Content Space -->
        <main class="xp-content-pane">
          
          <!-- Home View Panel -->
          <div id="view-home" class="content-view active">
            <div class="welcome-hero">
              <h2>John Freeman</h2>
              <h3> It Help Desk Technician</h3>
              <div class="inline-nav">
                <span class="inline-link" data-target="about">ABOUT</span>
                <span class="inline-link" data-target="experience">EXPERIENCE</span>
                <span class="inline-link" data-target="projects">PROJECTS</span>
                <span class="inline-link" data-target="contact">CONTACT</span>
              </div>
            </div>
          </div>
 
          <!-- About View Panel -->
          <div id="view-about" class="content-view">
            <h2>About Me</h2>
            <p class="section-intro">I'm an IT Help Desk Technician passionate about solving technical problems and helping users. Through hands-on labs and personal projects, I've gained experience with Windows 10/11, VirtualBox, hardware troubleshooting, networking fundamentals, PowerShell, HTML, CSS, and JavaScript. I'm currently expanding my technical skills while preparing for an entry-level IT support career.</p>
          </div>
 
          <!-- Experience View Panel -->
          <div id="view-experience" class="content-view">
            <div class="resume-download-banner">
              <span>Looking for my resume?</span>
              <a href="/John_Ernest_Freeman_IT_Support_Resume.pdf"
                 class="xp-download-link"
                 download="John_Ernest_Freeman_IT_Support_Resume.pdf">
                 Click here to download it
              </a>
            </div>
 
            <div class="experience-block">
              <h2>Technical Skills</h2>
              <div class="job-meta">
                <span class="job-title">IT Help Desk & Technical Support</span>
                <span class="job-date">Current</span>
              </div>
              <a href="https://www.linkedin.com/in/john-freeman-0699b5326/" target="_blank" class="xp-site-link">
                LinkedIn Profile
              </a>
              <p class="job-desc">Through personal projects, virtual labs, and coursework, I have developed practical IT skills focused on troubleshooting, Windows administration, hardware support, networking fundamentals, and customer service.</p>
              <ul class="xp-bullet-list">
                <li>Windows 10 & Windows 11 installation, configuration, and troubleshooting.</li>
                <li>PC hardware upgrades, diagnostics, and maintenance.</li>
                <li>VirtualBox virtual machine setup and management.</li>
                <li>Basic networking including IP addressing, DNS, DHCP, and Wi-Fi troubleshooting.</li>
                <li>PowerShell scripting and Windows command-line tools.</li>
                <li>Microsoft 365, Office applications, GitHub, and Visual Studio Code.</li>
                <li>HTML, CSS, JavaScript, and basic web development.</li>
                <li>Strong customer service, communication, and problem-solving skills.</li>
              </ul>
            </div>
          </div>
 
          <!-- Projects View Panel -->
          <div id="view-projects" class="content-view">
            <h2>IT LABS</h2>
            <p class="section-intro"></p>
            
            <div class="project-card" data-target="software">
              <img src="/image/windows-11-removebg-preview.png" alt="Windows 11">
              <div class="card-text">
                <h3>Windows 11 Installation</h3>
                <p>IT LABS</p>
              </div>
            </div>
 
            <div class="project-card" data-target="music">
              <img src="/image/VirtualBox-removebg-preview.png" alt="VirtualBox">
              <div class="card-text">
                <h3>VirtualBox Virtual Machines</h3>
                <p>IT LABS</p>
              </div>
            </div>
 
            <div class="project-card" data-target="music">
              <img src="/image/Active_directory-removebg-preview.png" alt="icon">
              <div class="card-text">
                <h3>Active Directory Basics</h3>
                <p>IT LABS</p>
              </div>
            </div>
 
            <div class="project-card" data-target="music">
              <img src="/image/Printer_Troubleshooting-removebg-preview.png" alt="Printer Troubleshooting">
              <div class="card-text">
                <h3>Printer Troubleshooting</h3>
                <p>IT LABS</p>
              </div>
            </div>
 
            <div class="project-card" data-target="music">
              <img src="/image/Network_Troubleshooting-removebg-preview.png" alt="Network Troubleshooting">
              <div class="card-text">
                <h3>Network Troubleshooting</h3>
                <p>IT LABS</p>
              </div>
            </div>
 
            <div class="project-card" data-target="music">
              <img src="/image/Windows user account management.jpg" alt="icon">
              <div class="card-text">
                <h3>Windows User Account Management</h3>
                <p>IT LABS</p>
              </div>
            </div>
 
            <div class="project-card" data-target="music">
              <img src="/image/Power_automation-removebg-preview.png" alt="icon">
              <div class="card-text">
                <h3>PowerShell Automation</h3>
                <p>IT LABS</p>
              </div>
            </div>
          </div>
 
          <!-- Contact View Panel -->
          <div id="view-contact" class="content-view">
            <h2>Contact</h2>
            <p class="section-intro">I would love to chat! You can reach me via my personal email, or fill out the form below!</p>
            <p class="email-text">Email: <a href="mailto:john.ernest.freeman@gmail.com">john.ernest.freeman@gmail.com</a></p>
            
            <form class="xp-form" onsubmit="event.preventDefault();">
              <div class="form-group">
                <label>* Your name:</label>
                <input type="text" placeholder="Name" required>
              </div>
              <div class="form-group">
                <label>* Email:</label>
                <input type="email" placeholder="Email" required>
              </div>
              <div class="form-group">
                <label>* Message:</label>
                <textarea placeholder="Message" rows="4" required></textarea>
              </div>
              <div class="form-form-footer">
                <button type="submit" class="xp-submit-btn">Send Message</button>
              </div>
            </form>
          </div>
 
        </main>
      </div>
    </div>
  `;
 
  document.body.appendChild(overlay);
}