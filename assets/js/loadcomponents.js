async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Could not fetch ${file}`);
    const data = await res.text();
    const container = document.getElementById(id);
    if (!container) return;

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
const basePath = scriptSrc.substring(0, scriptSrc.lastIndexOf('/components/'));

document.addEventListener("DOMContentLoaded", () => {
  // Use absolute paths to ensure they work from subdirectories
  loadComponent("navbar-placeholder", `${basePath}/components/navbar.html`);
  loadComponent("footer-placeholder", `${basePath}/components/footer.html`);
});
