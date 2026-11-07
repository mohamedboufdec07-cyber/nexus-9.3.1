(() => {
  const $ = id => document.getElementById(id);
  const boot = $('bootScreen');
  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (boot) {
    if (sessionStorage.getItem('nexus-booted') || reduceQuery.matches) boot.remove();
    else window.addEventListener('load', () => window.setTimeout(() => { boot.classList.add('boot-done'); sessionStorage.setItem('nexus-booted','1'); window.setTimeout(() => boot.remove(), 650); }, 850), {once:true});
  }

  // Immersive holodeck assistant. This is a local demo, not a live AI service.
  const backdrop = $('terminalBackdrop'), input = $('terminalInput');
  const chat = $('assistantMessages');
  let terminalTransitioning = false;
  const openTerminal = () => {
    if (!backdrop || terminalTransitioning || !backdrop.hidden) return;
    terminalTransitioning = true;
    document.body.classList.remove('holo-exit');
    backdrop.hidden = false;
    // Give the browser a frame to paint the closed state before beginning the cinematic fade.
    backdrop.classList.remove('holo-visible');
    document.body.classList.add('modal-open', 'holodeck-preparing');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.body.classList.add('holodeck-active');
      document.body.classList.remove('holodeck-preparing');
      backdrop.classList.add('holo-visible');
      window.setTimeout(() => { input?.focus(); terminalTransitioning = false; }, 1050);
    }));
  };
  const closeTerminal = () => {
    if (!backdrop || terminalTransitioning || backdrop.hidden) return;
    terminalTransitioning = true;
    document.body.classList.add('holo-exit');
    document.body.classList.remove('holodeck-active');
    backdrop.classList.remove('holo-visible');
    window.setTimeout(() => {
      backdrop.hidden = true;
      document.body.classList.remove('modal-open', 'holodeck-preparing', 'holodeck-active', 'holo-exit');
      $('terminalOpen')?.focus();
      terminalTransitioning = false;
    }, 950);
  };
  $('terminalOpen')?.addEventListener('click', openTerminal);
  $('terminalClose')?.addEventListener('click', closeTerminal);
  backdrop?.addEventListener('click', e => { if (e.target === backdrop) closeTerminal(); });
  const addMessage = (message, who='bot') => {
    const wrap=document.createElement('div'); wrap.className=`assistant-message ${who==='user'?'user-message':'bot-message'}`;
    const tag=document.createElement('span'); tag.className='message-tag'; tag.textContent=who==='user'?'YOU':'NEXUS ASSISTANT';
    const p=document.createElement('p'); p.textContent=message; wrap.append(tag,p); chat.append(wrap); chat.scrollTop=chat.scrollHeight;
  };
  const commands = {
    help: () => 'I can show your local reputation, explain NEXUS, guide you around its sections, or run a few fictional console shortcuts. Try: reputation, explore, about, whoami, theme, joke, archive, help, or exit.',
    about: () => 'NEXUS is a reputation-driven digital ecosystem for learning, creating, discovering and collaborating. This assistant is currently a local prototype.',
    whoami: () => `Your local identity is ${localStorage.getItem('nexus-callsign') || 'GUEST'}. Your profile is stored in this browser only.`,
    reputation: () => { try { const d=JSON.parse(localStorage.getItem('nexus-reputation')||'{}'); return `Your local reputation profile is available. ${Object.keys(d).length?`Tracked categories: ${Object.keys(d).join(', ')}.`:'No reputation activity has been recorded yet.'} Open TRUST to inspect your profile.`; } catch { return 'Open TRUST to inspect your local reputation profile.'; } },
    explore: () => 'You can explore DISCOVER for resources, LEARN for skills, CREATE for projects, COLLABORATE for teamwork, CONTRIBUTE to record helpful actions, and TRUST for your reputation.',
    theme: () => `Your active visual theme is ${(document.documentElement.dataset.theme || 'chaos').toUpperCase()}. Use the theme selector in the main navigation to change it.`,
    joke: () => ['I would tell you a UDP joke, but you might not get it.','My circuits said take a break. I negotiated for 3 more milliseconds.','Your ideas are loading… surprisingly, no buffering detected.'][Math.floor(Math.random()*3)],
    archive: () => { unlockArchive(); return 'Archive access updated. Check the ARCHIVE section for unlocked content.'; },
    exit: () => { closeTerminal(); return ''; }
  };
  function unlockArchive(){ document.querySelectorAll('.archive-locked').forEach(el=>el.classList.add('archive-unlocked')); }
  function assistantReply(raw) {
    const text=raw.toLowerCase().trim();
    const cmd=text.replace(/^\//,'').split(/[\s,?.!]+/)[0];
    if(commands[cmd]) return commands[cmd]();
    if(/hello|hey|hi\b/.test(text)) return 'Hey! I am online and ready. Tell me what you want to work on, or ask me to show your reputation or explore NEXUS.';
    if(/reputation|trust|score|rank/.test(text)) return commands.reputation();
    if(/discover|explore|section|where/.test(text)) return commands.explore();
    if(/theme|color|appearance/.test(text)) return commands.theme();
    if(/help|can you do|capabilit/.test(text)) return commands.help();
    if(/create|project|idea/.test(text)) return 'For creating something, open CREATE. You can use it to shape ideas into projects. I can help you plan the next steps, but this prototype does not yet connect to an online AI service.';
    if(/learn|study|skill/.test(text)) return 'Head to LEARN to explore skills and personal progress. Tell me the subject or skill you are interested in and I can help you plan it right here.';
    if(/collaborat|team|people/.test(text)) return 'COLLABORATE is where the future shared-work spaces will live. Real multi-user collaboration needs the backend milestone.';
    return 'I can help you navigate NEXUS, explain its features, show your local reputation, or suggest ways to learn, create and collaborate. Try typing “help” to see the available shortcuts. (I am an offline demo assistant for now.)';
  }
  function sendMessage(raw) {
    if(!raw.trim()) return;
    addMessage(raw,'user'); input.value='';
    const response=assistantReply(raw);
    if(response) window.setTimeout(()=>addMessage(response,'bot'),320);
  }
  $('terminalForm')?.addEventListener('submit', e => { e.preventDefault(); sendMessage(input.value); });
  document.querySelectorAll('.assistant-suggestions [data-prompt]').forEach(btn=>btn.addEventListener('click',()=>sendMessage(btn.dataset.prompt)));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){if(!backdrop.hidden)closeTerminal();if(!$('settingsBackdrop').hidden)closeSettings();} if(e.ctrlKey && e.key==='`'){e.preventDefault();backdrop.hidden?openTerminal():closeTerminal();} });

  // Settings are stored locally. Audio is opt-in and generated without external files.
  const settings = $('settingsBackdrop');
  const defaults = {sound:false,events:true,glow:true,motion:reduceQuery.matches};
  let prefs; try{prefs={...defaults,...JSON.parse(localStorage.getItem('nexus-settings')||'{}')};}catch{prefs=defaults;}
  const controls = {sound:$('soundSetting'),events:$('eventsSetting'),glow:$('glowSetting'),motion:$('motionSetting')};
  function applyPrefs(){Object.entries(controls).forEach(([k,el])=>{el.checked=!!prefs[k];});document.body.classList.toggle('no-cursor-glow',!prefs.glow);document.body.classList.toggle('reduced-effects',!!prefs.motion);localStorage.setItem('nexus-settings',JSON.stringify(prefs));}
  applyPrefs();
  $('settingsOpen')?.addEventListener('click',()=>{settings.hidden=false;document.body.classList.add('modal-open');});
  function closeSettings(){settings.hidden=true;document.body.classList.remove('modal-open');$('settingsOpen')?.focus();}
  $('settingsClose')?.addEventListener('click',closeSettings);
  settings?.addEventListener('click',e=>{if(e.target===settings)closeSettings();});
  Object.entries(controls).forEach(([k,el])=>el?.addEventListener('change',()=>{prefs[k]=el.checked;applyPrefs();if(k==='sound'&&prefs.sound)playAmbient();else if(k==='sound'&&!prefs.sound)stopAmbient();}));
  let audioCtx, ambientOsc, ambientGain;
  function playAmbient(){try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;audioCtx ||= new AC();if(audioCtx.state==='suspended')audioCtx.resume();if(ambientOsc)return;ambientOsc=audioCtx.createOscillator();ambientGain=audioCtx.createGain();const filter=audioCtx.createBiquadFilter();ambientOsc.type='sine';ambientOsc.frequency.value=54;filter.type='lowpass';filter.frequency.value=110;ambientGain.gain.value=.012;ambientOsc.connect(filter).connect(ambientGain).connect(audioCtx.destination);ambientOsc.start();}catch{}}
  function stopAmbient(){if(ambientOsc){try{ambientOsc.stop();}catch{}ambientOsc=null;}}

  // Rare harmless visual anomalies; never interrupt controls or forms.
  const eventBox=$('cyberEvent'); const eventLines=['SIGNAL SPIKE DETECTED // probably just space weather.','SYSTEM-NULL: nice theme. questionable playlist.','NETWORK NOTICE: one potato has joined the lobby.','UNKNOWN PACKET: sending you +1 imaginary XP.'];
  if(!prefs.events || reduceQuery.matches) return;
  const scheduleEvent=()=>{const delay=45000+Math.random()*65000;setTimeout(()=>{if(prefs.events&&!document.hidden&&!backdrop.hidden&&settings.hidden){eventBox.textContent=eventLines[Math.floor(Math.random()*eventLines.length)];eventBox.classList.add('event-visible');setTimeout(()=>eventBox.classList.remove('event-visible'),4200);}scheduleEvent();},delay);};
  scheduleEvent();
})();
