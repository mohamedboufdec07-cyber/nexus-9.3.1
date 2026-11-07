from pathlib import Path
p=Path('/mnt/data/NEXUS_Milestone_09/index.html')
s=p.read_text()
s=s.replace('NEXUS — enter a universe built for players. Discover, compete and evolve.','NEXUS — a reputation-driven digital ecosystem for learning, creating and collaborating.')
s=s.replace('<title>NEXUS — Arena Universe</title>','<title>NEXUS — Reputation Network</title>')
# navigation links
start=s.index('    <nav class="main-nav"')
end=s.index('    </nav>',start)+len('    </nav>')
s=s[:start]+'''    <nav class="main-nav" id="mainNav" aria-label="Main navigation">
      <a class="nav-link active" href="#top">Home</a>
      <a class="nav-link" href="#identity">Identity</a>
      <a class="nav-link" href="#reputation">Reputation</a>
      <a class="nav-link" href="#discover">Discover</a>
      <a class="nav-link" href="#contribute">Contribute</a>
      <a class="nav-link" href="#roadmap">Roadmap</a>
    </nav>'''+s[end:]
s=s.replace('>Terminal <span>⌁</span></button>','>System <span>⌁</span></button>')
main_start=s.index('  <main>')
main_end=s.index('  </main>',main_start)+len('  </main>')
main='''  <main>
    <section class="hero section-shell nexus-hero" aria-labelledby="heroTitle">
      <div class="hero-copy reveal">
        <div class="eyebrow"><span class="status-dot"></span> NEXUS INTELLIGENCE NETWORK / ONLINE</div>
        <h1 id="heroTitle">YOUR ACTIONS.<br><span class="gradient-text">YOUR SIGNAL.</span></h1>
        <p class="hero-description">A digital ecosystem built around what people create, learn and contribute. Build a transparent reputation, discover opportunities and find people who move ideas forward.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#identity">Initialize identity <span class="button-arrow">↗</span></a>
          <a class="text-link" href="#reputation"><span class="play-icon">◉</span> Explore the reputation system</a>
        </div>
        <div class="hero-proof"><div class="avatar-stack" aria-hidden="true"><span>N</span><span>X</span><span>+</span></div><p><strong>Built around contribution.</strong><br><span>Trust should be earned and explainable.</span></p></div>
      </div>
      <div class="hero-visual holo-visual reveal reveal-delay" aria-label="Abstract holographic identity interface">
        <div class="visual-grid"></div><div class="holo-frame"><div class="holo-topline"><span>NEXUS // IDENTITY SCAN</span><span class="live-chip"><i></i> LIVE PREVIEW</span></div>
          <div class="holo-center"><div class="holo-orbit"><div class="holo-core">NX</div></div><div class="holo-data"><small>NETWORK STATUS</small><strong>CONNECTED</strong><small>TRUST MODEL</small><strong>TRANSPARENT</strong><small>PROFILE</small><strong id="heroProfileName">GUEST USER</strong></div></div>
          <div class="holo-bottom"><span>REPUTATION IS BUILT THROUGH ACTION</span><span class="holo-bars">▂ ▄ ▆ ▇ ▅</span></div>
        </div><div class="visual-label label-top"><span>NODE 001</span><i></i> ACTIVE</div><div class="visual-label label-bottom"><span class="tiny-bars">▂ ▄ ▆ ▇</span> SIGNAL DETECTED</div>
      </div>
      <div class="hero-bottom-line"><span>SCROLL TO EXPLORE</span><span class="scroll-line"></span><span>01 / 06</span></div>
    </section>

    <section class="ticker" aria-label="NEXUS principles"><div class="ticker-track"><span>LEARN</span><b>✳</b><span>CREATE</span><b>✳</b><span>CONTRIBUTE</span><b>✳</b><span>COLLABORATE</span><b>✳</b><span>BUILD TRUST</span><b>✳</b><span>LEARN</span><b>✳</b><span>CREATE</span><b>✳</b><span>CONTRIBUTE</span><b>✳</b></div></section>

    <section class="content-section section-shell" id="identity">
      <div class="section-heading reveal"><div><span class="section-kicker">01 / PERSONAL NODE</span><h2>Your identity.<br><span class="muted-heading">Your own trajectory.</span></h2></div><p>NEXUS gives every member a personal space to track goals, skills and contributions. Your profile belongs to you.</p></div>
      <div class="identity-layout">
        <article class="identity-card reveal"><div class="identity-card-top"><span class="section-kicker">NEXUS ID / LOCAL PROFILE</span><span class="profile-state"><i></i><span id="profileState">GUEST MODE</span></span></div><div class="identity-main"><div class="identity-avatar" id="identityAvatar">NX</div><div><h3 id="identityName">GUEST USER</h3><p id="identityTagline">Create an identity to start your journey.</p></div></div><div class="identity-metrics"><div><strong id="identityLevel">01</strong><span>PROFILE LEVEL</span></div><div><strong id="identityActions">00</strong><span>RECORDED ACTIONS</span></div><div><strong id="identitySkills">00</strong><span>SKILLS ADDED</span></div></div><button class="button button-primary" id="createProfile">Create / edit identity ↗</button><p class="micro-note">Your prototype profile is stored on this device only.</p></article>
        <div class="identity-side reveal reveal-delay"><div class="side-info-card"><span class="info-icon">◈</span><div><h3>YOU CONTROL YOUR PROFILE</h3><p>Choose what to share. Private notes and personal goals stay local in this prototype.</p></div></div><div class="side-info-card"><span class="info-icon">⌖</span><div><h3>NO HIDDEN SCORING</h3><p>Every reputation change is tied to a visible action and an understandable rule.</p></div></div><div class="side-info-card"><span class="info-icon">⟁</span><div><h3>SKILLS ARE NOT STATUS</h3><p>Skills describe what you know. Reputation reflects recorded participation, not personal worth.</p></div></div></div>
      </div>
    </section>

    <section class="mission-section" id="reputation"><div class="mission-inner section-shell reputation-inner"><div class="mission-copy reveal"><span class="section-kicker">02 / REPUTATION ENGINE</span><h2>A signal built<br>on <span class="gradient-text">real actions.</span></h2><p>Your reputation is a transparent record of participation inside NEXUS. It is not a popularity score, and it never claims to measure someone's value.</p><div class="reputation-total"><strong id="reputationScore">000</strong><span>CONTRIBUTION POINTS<br><small>LOCAL PROTOTYPE SCORE</small></span></div></div>
      <div class="reputation-panel reveal reveal-delay"><div class="panel-top"><span><i class="status-dot"></i> REPUTATION BREAKDOWN</span><span class="panel-live">EXPLAINABLE MODEL</span></div><div class="rep-row"><div><span>RELIABILITY</span><strong id="scoreReliability">00</strong></div><div class="rep-track"><i id="barReliability"></i></div><small>Following through on goals</small></div><div class="rep-row"><div><span>CONTRIBUTION</span><strong id="scoreContribution">00</strong></div><div class="rep-track"><i id="barContribution"></i></div><small>Recording useful contributions</small></div><div class="rep-row"><div><span>CREATIVITY</span><strong id="scoreCreativity">00</strong></div><div class="rep-track"><i id="barCreativity"></i></div><small>Sharing original ideas</small></div><div class="rep-row"><div><span>KNOWLEDGE</span><strong id="scoreKnowledge">00</strong></div><div class="rep-track"><i id="barKnowledge"></i></div><small>Adding skills and learning notes</small></div><div class="rep-row"><div><span>COLLABORATION</span><strong id="scoreCollaboration">00</strong></div><div class="rep-track"><i id="barCollaboration"></i></div><small>Logging collaborative work</small></div><p class="micro-note">Scores are self-reported demo data, not verified credentials. They do not unlock real-world privileges.</p></div></div></section>

    <section class="loadout-section section-shell" id="discover"><div class="section-heading reveal"><div><span class="section-kicker">03 / DISCOVERY GRID</span><h2>Find your next<br><span class="muted-heading">useful direction.</span></h2></div><p>Explore practical paths inside the NEXUS concept. These spaces are designed to help people learn, make things and find collaborators.</p></div>
      <div class="mode-grid ecosystem-grid"><article class="mode-card mode-card-feature reveal"><div class="mode-art eco-art-learn"><span class="mode-index">SPACE_01</span><div class="eco-glyph">⌘</div><span class="mode-tag">KNOWLEDGE / SKILLS</span></div><div class="mode-copy"><div><span class="mode-type">LEARN // GROW</span><h3>THE KNOWLEDGE GRID</h3><p>Organize skills you want to develop, keep learning notes and map your next steps.</p></div><a class="mode-arrow" href="#contribute" aria-label="Go to contribution tools">↗</a></div></article>
      <article class="mode-card reveal reveal-delay"><div class="mode-art eco-art-create"><span class="mode-index">SPACE_02</span><div class="eco-glyph">✳</div><span class="mode-tag">IDEAS / PROJECTS</span></div><div class="mode-copy"><div><span class="mode-type">CREATE // BUILD</span><h3>THE MAKER SPACE</h3><p>Capture original ideas and turn them into small, achievable projects.</p></div><a class="mode-arrow" href="#contribute" aria-label="Go to contribution tools">↗</a></div></article>
      <article class="mode-card reveal"><div class="mode-art eco-art-connect"><span class="mode-index">SPACE_03</span><div class="eco-glyph">◎</div><span class="mode-tag">PEOPLE / TEAMWORK</span></div><div class="mode-copy"><div><span class="mode-type">CONNECT // SHARE</span><h3>THE COLLABORATION HUB</h3><p>Prepare project briefs and identify the skills you need from a team.</p></div><a class="mode-arrow" href="#contribute" aria-label="Go to contribution tools">↗</a></div></article></div>
    </section>

    <section class="community-section section-shell" id="contribute"><div class="section-heading reveal"><div><span class="section-kicker">04 / ACTION CONSOLE</span><h2>Make something<br><span class="muted-heading">that matters.</span></h2></div><p>Record a real action you completed. NEXUS will add it to your local activity history and update the relevant category using visible demo rules.</p></div>
      <div class="action-layout"><form class="contribution-form reveal" id="contributionForm"><div class="form-heading"><span class="section-kicker">LOG A CONTRIBUTION / LOCAL</span><span class="form-live"><i></i> READY</span></div><label for="actionTitle">WHAT DID YOU DO?</label><input id="actionTitle" maxlength="90" placeholder="e.g. Helped explain a difficult topic" required><label for="actionType">CATEGORY</label><select id="actionType" required><option value="contribution">Contribution</option><option value="reliability">Reliability</option><option value="creativity">Creativity</option><option value="knowledge">Knowledge</option><option value="collaboration">Collaboration</option></select><label for="actionDetails">SHORT NOTE <span>(OPTIONAL)</span></label><textarea id="actionDetails" rows="3" maxlength="220" placeholder="What was useful about this action?"></textarea><button class="button button-primary form-submit" type="submit">Record action ↗</button><p class="micro-note">Prototype scoring: +10 points per recorded action in its selected category. Entries are self-reported and stored locally.</p></form>
      <div class="activity-panel reveal reveal-delay"><div class="panel-top"><span><i class="status-dot"></i> ACTIVITY LOG</span><button class="clear-log" id="clearActivity" type="button">CLEAR LOCAL LOG</button></div><div id="activityList" class="activity-list"><div class="empty-state"><span>◌</span><strong>NO ACTIVITY RECORDED</strong><p>Your recorded actions will appear here.</p></div></div></div></div>
    </section>

    <section class="timeline-section" id="roadmap"><div class="section-shell"><div class="section-heading reveal"><div><span class="section-kicker">05 / EVOLUTION ROADMAP</span><h2>From prototype<br><span class="muted-heading">to real network.</span></h2></div><p>NEXUS is being built in stages. This version demonstrates the experience locally; shared accounts and verified trust require a secure backend.</p></div><div class="timeline-track"><article class="timeline-item reveal"><span class="timeline-node">01</span><div><span class="timeline-state">ONLINE // CURRENT</span><h3>IDENTITY & LOCAL REPUTATION</h3><p>Create a local profile, record actions and inspect transparent reputation categories.</p></div><time>NOW</time></article><article class="timeline-item reveal"><span class="timeline-node">02</span><div><span class="timeline-state timeline-planned">IN DEVELOPMENT</span><h3>PERSONALIZED EXPERIENCE</h3><p>Personal goals, skill paths, useful recommendations and adaptive dashboard modules.</p></div><time>NEXT</time></article><article class="timeline-item reveal"><span class="timeline-node">03</span><div><span class="timeline-state timeline-planned">PLANNED</span><h3>COMMUNITY & VERIFIED TRUST</h3><p>Real accounts, shared projects, moderation, appeals and evidence-backed contributions.</p></div><time>LATER</time></article></div></div></section>

    <section class="techlab-section section-shell"><div class="community-card reveal"><div class="community-orb"></div><div class="community-content"><span class="section-kicker">06 / SYSTEM PRINCIPLE</span><h2>Trust is built.<br><span class="gradient-text">Never assumed.</span></h2><p>NEXUS should explain its decisions, let people correct mistakes and keep personal data under user control. Reputation is context — not a judgment of a human being.</p><a class="button button-primary" href="#top">Return to interface <span class="button-arrow">↗</span></a></div><div class="community-side"><div class="side-stat"><strong>100%</strong><span>TRANSPARENCY GOAL</span></div><div class="side-stat"><strong>0</strong><span>HIDDEN PENALTIES</span></div><div class="side-caption">PEOPLE FIRST.<br>ALWAYS.</div></div></div></section>
  </main>'''
s=s[:main_start]+main+s[main_end:]
# profile modal copy
s=s.replace('PLAYER REGISTRATION / 001','NEXUS IDENTITY / 001').replace('Choose a callsign. Your player profile preview will be created on this device.','Choose a display name. Your local NEXUS identity will be saved on this device.').replace('PLAYER CALLSIGN','DISPLAY NAME').replace('Initialize profile ↗','Save identity ↗').replace('Prototype only — accounts and cloud saves arrive in a later milestone.','Prototype only — this is not a real account and does not sync across devices.')
# system terminal wording
s=s.replace('NEXUS // UNDERGROUND TERMINAL','NEXUS // SYSTEM CONSOLE').replace('recruit@nexus:~$','user@nexus:~$')
# add new script
s=s.replace('  <script src="js/redesign.js" defer></script>','  <script src="js/redesign.js" defer></script>\n  <script src="js/reputation.js" defer></script>')
p.write_text(s)
