# NEXUS — Reputation Network (Milestone 09)

NEXUS has evolved from a gaming universe into a reputation-driven digital ecosystem. This milestone keeps the existing dark, cinematic interface, cyan/teal energy accents, glass panels, themes, ambient lighting, 3D background, navigation behavior, settings, and optional effects while replacing the gaming content with identity, reputation, discovery, and contribution tools.

## Run locally
1. Extract the ZIP.
2. Open the `NEXUS_Milestone_09` folder in Visual Studio Code.
3. Open `index.html` in a browser. VS Code Live Server is recommended.

## What's included
- NEXUS identity profile using the existing callsign/profile dialog.
- Holographic identity scan hero visual.
- Transparent reputation breakdown: reliability, contribution, creativity, knowledge, and collaboration.
- Local activity log with a contribution form.
- Reputation points update from actions explicitly recorded by the user (+10 demo points per entry).
- Local activity history and profile data saved in browser localStorage.
- Discovery spaces for learning, making, and collaboration.
- Responsive layout and reduced-motion support.

## Important prototype limits
- This is a front-end prototype. Profiles and reputation data stay in this browser and do not sync between devices or users.
- Contribution entries and points are self-reported demo data, not verified credentials. They do not grant real privileges.
- Real accounts, shared collaboration, moderation, evidence checks, appeals, and cross-device data require a secure backend. Never use this local score as a real-world trust or hiring signal.
- The system does not inspect private browsing, device activity, or behavior outside NEXUS.
- Existing themes, 3D background, settings, optional ambience, visual effects, and Easter eggs are retained from Milestone 08.

## Main files
- `index.html` — new NEXUS ecosystem layout.
- `css/nexus-ecosystem.css` — holographic interface and new component styling.
- `js/reputation.js` — local profile, contribution log, and transparent demo scoring.
- Existing `css/` and `js/` files — retained from Milestone 08.

## Milestone 09.1 — Holographic Assistant Terminal
- Opening the System/terminal control dims the main NEXUS interface and brings up a full-screen holographic room.
- Animated cyan monitors show a network map, NEXUS core, and identity-link display.
- A built-in assistant chat greets the user with: “Connection established. What do you want me to do for you today?”
- Includes quick prompt buttons and local demo responses for reputation, discovery, themes, help, and navigation.
- The assistant is an offline prototype, not a live AI service. It does not execute operating-system commands.
- Close with the X button, Escape, or Ctrl + `.
