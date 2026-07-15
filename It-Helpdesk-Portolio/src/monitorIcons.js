import { openApp } from "./monitorDesktop.js";
 
// BUG FIX: previously this file was statically imported in main.js BEFORE
// its HTML (#resumeBtn etc.) was inserted into the DOM, so every
// getElementById() below returned null and `.onclick = ...` threw. main.js
// now dynamically imports this file only after inserting the HTML. Adding
// optional chaining here too, so if this ever runs before the markup exists
// again, it fails quietly instead of throwing and killing the module.
 
document.getElementById("resumeBtn")?.addEventListener("click", () => {
  openApp("resume-overlay");
});
 
document.getElementById("projectsBtn")?.addEventListener("click", () => {
  openApp("window-showcase");
});
 
document.getElementById("ticketsBtn")?.addEventListener("click", () => {
  openApp("window-tickets");
});
 
document.getElementById("powershellBtn")?.addEventListener("click", () => {
  openApp("window-powershell");
});