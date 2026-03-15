async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Could not fetch ${file}`);
    let data = await res.text();
    const container = document.getElementById(id);
    if (!container) return;

    // Dynamically fix paths in the loaded HTML based on basePath
    // This fixes images and links that use relative paths like "../assets/" or "../pages/"
    if (basePath) {
        // Fix image sources
        data = data.replace(/src="\.\.\//g, `src="${basePath}/`);
        // Fix anchor hrefs (excluding external links)
        data = data.replace(/href="\.\.\//g, `href="${basePath}/`);
    }

    container.innerHTML = data;

    // Execute scripts in the loaded HTML
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  } catch (error) {
    console.error("Error loading component:", error);
  }
}

// Dynamically determine the base path from the script itself
const scriptTag = document.currentScript;
const scriptSrc = scriptTag.src;
const scriptsIndex = scriptSrc.lastIndexOf('/assets/js/');
// If served from root, basePath will be empty. Otherwise, it will be the URL prefix.
const basePath = scriptsIndex !== -1 ? scriptSrc.substring(0, scriptsIndex) : '';

document.addEventListener("DOMContentLoaded", () => {
  // Load components using absolute-ish paths
  loadComponent("navbar-placeholder", `${basePath}/components/navbar.html`);
  loadComponent("footer-placeholder", `${basePath}/components/footer.html`);
});
