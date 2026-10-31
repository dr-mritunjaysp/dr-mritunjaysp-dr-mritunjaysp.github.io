(() => {
  const dialog = document.querySelector("#developer-profile");
  document.querySelector("#developer-profile-link").addEventListener("click", () => dialog.showModal());
  document.querySelector("#developer-profile-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  // Keep canvas shortcuts inactive while the profile is open; Escape still closes it.
  document.addEventListener("keydown", (event) => {
    if (dialog.open) event.stopPropagation();
  }, true);
  new ResizeObserver(() => window.dispatchEvent(new Event("resize"))).observe(document.querySelector("#developer-footer"));
})();
