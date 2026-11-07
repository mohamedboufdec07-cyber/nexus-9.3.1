(() => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Reveal sections as they enter the viewport.
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const dialog = document.getElementById("profileDialog");
  const openDialog = document.getElementById("createProfile");
  const closeDialog = document.getElementById("closeDialog");
  const form = document.getElementById("profileForm");
  const callsign = document.getElementById("callsign");
  const toast = document.getElementById("toast");

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2800);
  }

  openDialog.addEventListener("click", () => {
    dialog.showModal();
    window.setTimeout(() => callsign.focus(), 80);
  });
  closeDialog.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = callsign.value.trim();
    if (name.length < 3) {
      callsign.setCustomValidity("Your callsign must contain at least 3 characters.");
      callsign.reportValidity();
      return;
    }
    callsign.setCustomValidity("");
    localStorage.setItem("nexus-callsign", name);
    window.dispatchEvent(new Event("nexus:profile-updated"));
    dialog.close();
    form.reset();
    showToast(`Identity initialized. Welcome to NEXUS, ${name}.`);
  });

  callsign.addEventListener("input", () => callsign.setCustomValidity(""));
})();
