(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const STORAGE_KEY = 'nexus-reputation-v1';
  const categories = ['reliability','contribution','creativity','knowledge','collaboration'];
  const icons = {reliability:'✓',contribution:'✦',creativity:'✳',knowledge:'⌘',collaboration:'◎'};
  let state = {profile:null, skills:[], actions:[]};
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); if(saved && typeof saved === 'object') state = {...state,...saved}; } catch { /* use a clean local profile */ }
  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { toast('Local storage is unavailable in this browser.'); } };
  const toast = message => { const node=$('toast'); if(!node)return; node.textContent=message; node.classList.add('show'); setTimeout(()=>node.classList.remove('show'),2600); };
  const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const scoreFor = key => state.actions.filter(a=>a.category===key).length*10;
  const total = () => categories.reduce((sum,key)=>sum+scoreFor(key),0);
  function render(){
    const name=state.profile || 'GUEST USER';
    $('identityName').textContent=name.toUpperCase(); $('heroProfileName').textContent=name.toUpperCase();
    $('identityAvatar').textContent=name==='GUEST USER'?'NX':name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
    $('profileState').textContent=state.profile?'LOCAL ID ACTIVE':'GUEST MODE';
    $('identityTagline').textContent=state.profile?'Your NEXUS identity is active on this device.':'Create an identity to start your journey.';
    $('identityActions').textContent=String(state.actions.length).padStart(2,'0');
    $('identitySkills').textContent=String(state.skills.length).padStart(2,'0');
    $('identityLevel').textContent=String(1+Math.floor(total()/100)).padStart(2,'0');
    $('reputationScore').textContent=String(total()).padStart(3,'0');
    categories.forEach(key=>{const score=scoreFor(key);$('score'+key[0].toUpperCase()+key.slice(1)).textContent=String(score).padStart(2,'0');$('bar'+key[0].toUpperCase()+key.slice(1)).style.width=Math.min(100,score)+'%';});
    const list=$('activityList');
    if(!state.actions.length){list.innerHTML='<div class="empty-state"><span>◌</span><strong>NO ACTIVITY RECORDED</strong><p>Your recorded actions will appear here.</p></div>';return;}
    list.innerHTML=[...state.actions].reverse().map(a=>`<article class="activity-entry"><span class="activity-icon">${icons[a.category]||'✦'}</span><div><h4>${safe(a.title)}</h4><p>${safe(a.details||a.category.toUpperCase())}</p></div><span class="activity-points">+10 PTS</span></article>`).join('');
  }
  window.addEventListener('nexus:profile-updated',()=>{const name=localStorage.getItem('nexus-callsign');if(name){state.profile=name.slice(0,24);save();render();}});
  $('contributionForm')?.addEventListener('submit',event=>{event.preventDefault();const title=$('actionTitle').value.trim();if(!title)return;const category=$('actionType').value;if(!categories.includes(category))return;state.actions.push({id:Date.now(),title:title.slice(0,90),details:$('actionDetails').value.trim().slice(0,220),category,createdAt:new Date().toISOString()});save();render();event.currentTarget.reset();toast('Action recorded. Your local reputation has been updated.');});
  $('clearActivity')?.addEventListener('click',()=>{if(!state.actions.length)return;if(!confirm('Clear all locally recorded actions and reputation points? This cannot be undone.'))return;state.actions=[];save();render();toast('Local activity log cleared.');});
  render();
})();
