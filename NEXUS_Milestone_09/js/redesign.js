// NEXUS Arena redesign: connects the new dossier card to the existing local profile.
document.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('dossierCallsign');
  const profileButton = document.getElementById('dossierProfile');
  const createButton = document.getElementById('createProfile');
  const sync = () => {
    const callsign = localStorage.getItem('nexus-callsign');
    if (name) name.textContent = callsign || 'UNKNOWN RECRUIT';
  };
  sync();
  window.addEventListener('storage', sync);
  if (profileButton && createButton) profileButton.addEventListener('click', () => createButton.click());
  document.addEventListener('nexus:profile-updated', sync);
});
