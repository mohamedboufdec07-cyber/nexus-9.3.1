// NEXUS dark-glass 3D environment. Chrome spheres, soft studio lighting,
// gentle float and pointer parallax. Gracefully falls back when WebGL/CDN is unavailable.
const canvas = document.getElementById("nexus3D");
if (canvas) {
  try {
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, .1, 100);
    camera.position.set(0, 0, 15);
    const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"low-power"});
    renderer.setClearColor(0x000000,0);
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1,1.35));
    renderer.setSize(innerWidth,innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    scene.add(new THREE.AmbientLight(0x9da2ad, .62));
    const key = new THREE.PointLight(0xffffff, 190, 42, 2);
    key.position.set(-5,6,8); scene.add(key);
    const fill = new THREE.PointLight(0x9ca5b7, 85, 36, 2);
    fill.position.set(6,1,5); scene.add(fill);
    const rim = new THREE.PointLight(0xffffff, 130, 34, 2);
    rim.position.set(0,-5,-1); scene.add(rim);

    const group = new THREE.Group(); scene.add(group);
    const sphereGeo = new THREE.SphereGeometry(1,64,48);
    const chrome = new THREE.MeshPhysicalMaterial({
      color:0x777b84, metalness:.78, roughness:.19,
      clearcoat:1, clearcoatRoughness:.12,
      envMapIntensity:1.15
    });
    const softChrome = chrome.clone(); softChrome.color.set(0x626670); softChrome.roughness=.24;
    const spheres = [
      {p:[-5.0,2.25,-2.2],s:1.28,m:chrome,phase:.2},
      {p:[5.1,1.35,-3.0],s:.82,m:softChrome,phase:2.1},
      {p:[0,-4.15,-2.5],s:1.48,m:chrome,phase:4.0},
      {p:[-6.8,-3.0,-5.5],s:.48,m:softChrome,phase:1.1},
      {p:[6.9,-3.2,-5.0],s:.58,m:chrome,phase:3.2}
    ].map(o=>{
      const mesh=new THREE.Mesh(sphereGeo,o.m);
      mesh.position.set(...o.p); mesh.scale.setScalar(o.s);
      mesh.userData={baseY:o.p[1],phase:o.phase}; group.add(mesh); return mesh;
    });

    // Sparse, barely visible dust gives the space depth without clutter.
    const count=innerWidth<650?180:340, pos=new Float32Array(count*3);
    for(let i=0;i<count;i++){
      pos[i*3]=(Math.random()-.5)*19;
      pos[i*3+1]=(Math.random()-.5)*12;
      pos[i*3+2]=-7-Math.random()*8;
    }
    const dustGeo=new THREE.BufferGeometry(); dustGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0xc4c8d1,size:.018,transparent:true,opacity:.28}));
    scene.add(dust);

    const pointer={x:0,y:0,tx:0,ty:0};
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduced) addEventListener('pointermove',e=>{
      if(e.pointerType==='touch')return;
      pointer.tx=(e.clientX/innerWidth-.5)*.42;
      pointer.ty=(e.clientY/innerHeight-.5)*.28;
    },{passive:true});
    const themeWatch=new MutationObserver(()=>{
      const light=document.documentElement.dataset.theme==='light';
      scene.background=null;
      renderer.toneMappingExposure=light?1.0:1.15;
      key.intensity=light?120:190; fill.intensity=light?55:85;
      dust.material.opacity=light?.14:.28;
    });
    themeWatch.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
    let frame=0,active=!document.hidden;
    document.addEventListener('visibilitychange',()=>active=!document.hidden);
    function resize(){
      camera.aspect=innerWidth/innerHeight;
      camera.position.z=innerWidth<650?17:15;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.35));
      renderer.setSize(innerWidth,innerHeight);
      group.scale.setScalar(innerWidth<650?.78:1);
    }
    addEventListener('resize',resize,{passive:true}); resize();
    function animate(t){
      frame=requestAnimationFrame(animate); if(!active)return;
      if(!reduced){
        pointer.x+=(pointer.tx-pointer.x)*.025; pointer.y+=(pointer.ty-pointer.y)*.025;
        group.rotation.y=pointer.x*.12; group.rotation.x=pointer.y*.08;
        spheres.forEach(s=>{s.position.y=s.userData.baseY+Math.sin(t*.00035+s.userData.phase)*.10; s.rotation.y+=.0008;});
        dust.rotation.y+=.000035;
      }
      renderer.render(scene,camera);
    }
    animate(0);
    addEventListener('pagehide',()=>{cancelAnimationFrame(frame);renderer.dispose();sphereGeo.dispose();chrome.dispose();softChrome.dispose();dustGeo.dispose();dust.material.dispose();themeWatch.disconnect();},{once:true});
  } catch(err) { console.info('NEXUS 3D unavailable; CSS design remains active.',err); canvas.hidden=true; }
}
