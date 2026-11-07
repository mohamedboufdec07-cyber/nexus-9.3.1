(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const picker = document.getElementById("themeSelect");
  const validThemes = ["chaos", "dark", "midnight", "crimson", "emerald", "sunset", "light"];
  const themeColors = {
    chaos: "#190d20", dark: "#08090c", midnight: "#071426",
    crimson: "#1b090f", emerald: "#071914", sunset: "#21100c", light: "#edf2f8"
  };

  const savedTheme = localStorage.getItem("nexus-theme");
  const initialTheme = validThemes.includes(savedTheme) ? savedTheme : "chaos";

  function applyTheme(theme) {
    if (!validThemes.includes(theme)) return;
    root.dataset.theme = theme;
    localStorage.setItem("nexus-theme", theme);
    if (picker) picker.value = theme;
    if (toggle) {
      const quickTarget = theme === "light" ? "chaos" : "light";
      toggle.setAttribute("aria-label", `Quick switch to ${quickTarget} theme`);
      toggle.setAttribute("title", `Quick switch to ${quickTarget} theme`);
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = themeColors[theme];
    document.title = theme === "chaos" ? "NEXUS — CHAOS Edition" :
      `NEXUS — ${theme[0].toUpperCase()}${theme.slice(1)} Theme`;
  }

  applyTheme(initialTheme);
  if (picker) picker.addEventListener("change", () => applyTheme(picker.value));
  if (toggle) toggle.addEventListener("click", () =>
    applyTheme(root.dataset.theme === "light" ? "chaos" : "light"));
})();
