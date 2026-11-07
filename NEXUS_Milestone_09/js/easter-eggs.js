(() => {
  const params = new URLSearchParams(window.location.search);
  const secret = (params.get('secret') || '').toLowerCase();
  const chaosRequested = params.get('theme') === 'chaos' || secret === 'chaos';
  const jokes = {
    potato: { title: 'POTATO PROTOCOL ACTIVATED', line: 'A potato has been promoted to system administrator.', button: 'Respect the potato' },
    alien: { title: 'ALIEN SUPPORT CONNECTED', line: 'They checked your ping. They are concerned.', button: 'Send them back' },
    '404': { title: 'BRAIN CELL NOT FOUND', line: 'The joke you were looking for has left the server.', button: 'Pretend this never happened' },
    chaos: { title: 'CHAOS MODE UNLOCKED', line: 'The design team has lost all adult supervision.', button: 'Release the chaos' }
  };

  const joke = jokes[secret];
  let audioContext;
  let muted = false;

  function makeSound() {
    if (muted) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioContext ||= new AudioContextClass();
      if (audioContext.state === 'suspended') audioContext.resume();
      const now = audioContext.currentTime;
      const master = audioContext.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.11, now + 0.025);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
      master.connect(audioContext.destination);

      // A short, original cartoon-ish descending wobble made with Web Audio.
      const osc = audioContext.createOscillator();
      const wobble = audioContext.createOscillator();
      const wobbleGain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(115, now + 0.62);
      wobble.type = 'sine';
      wobble.frequency.value = 8;
      wobbleGain.gain.value = 34;
      wobble.connect(wobbleGain).connect(osc.frequency);
      osc.connect(master);
      osc.start(now); wobble.start(now);
      osc.stop(now + 0.74); wobble.stop(now + 0.74);

      const pop = audioContext.createOscillator();
      const popGain = audioContext.createGain();
      pop.type = 'triangle';
      pop.frequency.setValueAtTime(180, now + 0.12);
      pop.frequency.exponentialRampToValueAtTime(65, now + 0.32);
      popGain.gain.setValueAtTime(0.0001, now);
      popGain.gain.setValueAtTime(0.045, now + 0.12);
      popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
      pop.connect(popGain).connect(audioContext.destination);
      pop.start(now + 0.12); pop.stop(now + 0.36);
    } catch (error) {
      // Audio is optional; the page remains fully usable if sound is blocked.
    }
  }

  function activateChaos() {
    document.documentElement.dataset.theme = 'chaos';
    document.body.classList.add('chaos-mode');
    localStorage.setItem('nexus-theme', 'chaos');
    const themeToggle = document.getElementById('themeToggle');
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) themeSelect.value = 'chaos';
    if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch back to the normal theme');
    document.title = 'NEXUS — CHAOS MODE';
  }

  if (chaosRequested) activateChaos();

  if (!joke && !chaosRequested) return;

  const panel = document.createElement('section');
  panel.className = 'easter-overlay';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'easterTitle');
  panel.innerHTML = `
    <div class="easter-card">
      <span class="easter-stamp">NEXUS // UNOFFICIAL DEPARTMENT</span>
      <div class="easter-emoji" aria-hidden="true">${secret === 'potato' ? '🥔' : secret === 'alien' ? '👽' : secret === '404' ? '🫠' : '🤡'}</div>
      <p class="easter-kicker">YOU FOUND A SECRET</p>
      <h2 id="easterTitle">${joke ? joke.title : 'WELCOME TO THE CHAOS'}</h2>
      <p>${joke ? joke.line : 'Normality has been temporarily disabled.'}</p>
      <div class="easter-actions">
        <button class="easter-primary" id="easterDismiss">${joke ? joke.button : 'Continue'}</button>
        <button class="easter-sound" id="easterSound">🔊 Play the weird sound</button>
        <button class="easter-mute" id="easterMute" aria-pressed="false">Mute</button>
      </div>
      <p class="easter-footnote">No potatoes, aliens or brain cells were harmed.</p>
    </div>`;
  document.body.append(panel);

  // Try once on entry. Most browsers require a visitor gesture; the sound button is the fallback.
  if (joke) makeSound();
  document.getElementById('easterSound').addEventListener('click', makeSound);
  document.getElementById('easterMute').addEventListener('click', event => {
    muted = !muted;
    event.currentTarget.textContent = muted ? 'Unmute' : 'Mute';
    event.currentTarget.setAttribute('aria-pressed', String(muted));
  });
  document.getElementById('easterDismiss').addEventListener('click', () => {
    if (secret === 'chaos' || chaosRequested) activateChaos();
    panel.classList.add('easter-leaving');
    window.setTimeout(() => panel.remove(), 260);
  });
})();
