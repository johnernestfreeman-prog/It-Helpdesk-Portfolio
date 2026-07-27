# 🖥️ IT Help Desk — 3D Interactive Portfolio
 
An interactive 3D portfolio site built with Three.js, styled as a Windows XP-era office desk. Visitors click into the workstation to explore projects, resume, and contact info — just like sitting down at the desk yourself.
 
![Tech Stack](https://skillicons.dev/icons?i=vite,js,html,css)
 
---
 
## 📸 Preview
 
<!-- Replace with your own screenshot, saved in a /screenshots folder in this repo -->

 
**[🚀 Visit Live Site](https://it-helpdesk-portfolio.netlify.app/)**
 
---
 
## ✨ Features
 
- 🖱️ **Clickable Workstation** — click the desk's triple-monitor setup to zoom into the scene
- 🎥 **Camera Zoom Transitions** — smooth GSAP-powered camera movement from room view to desktop view
- 🪟 **Windows XP-Style Overlay** — resume and project details displayed in a nostalgic XP window
- 📂 **Desktop Shortcuts** — clickable icons (Contact Me, My CV, My Projects, About) that appear once zoomed in
- 🖨️ **Downloadable Resume** — resume available as a PDF directly from the desktop
- 🎨 **Fully 3D Environment** — desk, chair, monitors, and props modeled and lit in Three.js
---
 
## 🛠️ Tech Stack
 
| Layer | Technology |
|---|---|
| 3D Rendering | Three.js |
| Build Tool | Vite |
| Animation | GSAP |
| Language | JavaScript, HTML, CSS |
| Hosting | Netlify |
 
---
 
## 🚀 Getting Started
 
### Prerequisites
- Node.js (v18+ recommended)
### Installation
 
```bash
# Clone the repo
git clone https://github.com/YOUR_GITHUB_USERNAME/It-Helpdesk-Portfolio.git
cd It-Helpdesk-Portfolio
 
# Install dependencies
npm install
```
 
### Run Locally
 
```bash
npm run dev
```
 
The site will be available at `http://localhost:5173` (Vite's default port).
 
### Build for Production
 
```bash
npm run build
```
 
Outputs a static `dist/` folder ready to deploy to Netlify, GitHub Pages, or any static host.
 
---
 
## 📁 Project Structure
 
```
It-Helpdesk-Portfolio/
├── src/
│   ├── scenes/          # Three.js scene setup, camera, lighting
│   ├── models/          # 3D assets (desk, monitors, chair, props)
│   ├── ui/               # XP-style window overlay, desktop icons
│   └── main.js          # Entry point
├── public/
│   ├── resume.pdf
│   └── assets/
├── index.html
├── vite.config.js
├── .gitattributes        # ensures binary files (PDFs) aren't corrupted by CRLF conversion
└── package.json
```
 
---
 
## 🎯 Roadmap / What's Next
 
- [ ] Add a "skip to plain view" option for visitors who prefer a fast, non-3D version
- [ ] Add loading progress indicator for 3D assets on slower connections
- [ ] Mobile/touch controls for the camera zoom interaction
- [ ] Additional desktop apps (e.g. a mini terminal, a notes app)
---
 
## 🏷️ License
 
This project is open source and available under the [MIT License](LICENSE).
 
---
 
<div align="center">
*Built by John Freeman — Always learning. Always building. Always improving.*
 
</div>
