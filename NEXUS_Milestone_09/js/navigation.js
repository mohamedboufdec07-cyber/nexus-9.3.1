(() => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const links = [...document.querySelectorAll(".nav-link")];
  const header = document.querySelector(".site-header");

  // Smart sliding navigation: hide while moving down, reveal while moving up.
  let lastScrollY = window.scrollY;
  let scrollTicking = false;
  const updateHeader = () => {
    const currentY = window.scrollY;
    const menuOpen = nav.classList.contains("open");
    if (currentY < 70 || menuOpen || currentY < lastScrollY - 3) {
      header.classList.remove("header-hidden");
    } else if (currentY > lastScrollY + 5) {
      header.classList.add("header-hidden");
    }
    header.classList.toggle("header-scrolled", currentY > 24);
    lastScrollY = currentY;
    scrollTicking = false;
  };
  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateHeader);
      scrollTicking = true;
    }
  }, { passive: true });

  // A restrained pointer glow adds depth without competing with the content.
  let pointerFrame = false;
  window.addEventListener("pointermove", event => {
    if (pointerFrame || event.pointerType === "touch") return;
    pointerFrame = true;
    window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      pointerFrame = false;
    });
  }, { passive: true });

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    header.classList.remove("header-hidden");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      links.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const sections = [...document.querySelectorAll("main section[id], main section:not([id])")];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id || "top";
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));
})();
