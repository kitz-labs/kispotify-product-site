(function(){
  "use strict";
  const $=function(s,r){return (r||document).querySelector(s);};
  const $$=function(s,r){return Array.from((r||document).querySelectorAll(s));};

  const menuToggle=$(".menu-toggle"), mobileNav=$("#mobileNav");
  if(menuToggle&&mobileNav){
    menuToggle.addEventListener("click",function(){
      const open=menuToggle.getAttribute("aria-expanded")==="true";
      menuToggle.setAttribute("aria-expanded",String(!open));
      mobileNav.classList.toggle("open",!open);
      document.body.classList.toggle("menu-open",!open);
    });
    $$("#mobileNav a").forEach(function(link){
      link.addEventListener("click",function(){
        menuToggle.setAttribute("aria-expanded","false");
        mobileNav.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const progress=$("#scrollProgress");
  function updateProgress(){
    if(!progress)return;
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    progress.style.width=Math.min(100,(window.scrollY/max)*100)+"%";
  }
  window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();

  const glow=$("#cursorGlow");
  if(glow&&matchMedia("(pointer:fine)").matches){
    window.addEventListener("pointermove",function(e){
      glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";
    },{passive:true});
  }

  const commandWindow=$("#commandWindow");
  if(commandWindow&&matchMedia("(pointer:fine)").matches&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
    commandWindow.addEventListener("pointermove",function(e){
      const r=commandWindow.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      commandWindow.style.transform="perspective(1500px) rotateY("+(x*4-2)+"deg) rotateX("+(-y*3+.8)+"deg)";
    });
    commandWindow.addEventListener("pointerleave",function(){
      commandWindow.style.transform="perspective(1500px) rotateY(-2deg) rotateX(.8deg)";
    });
  }

  const demoSets={
    afro:{prompt:"Afro House Rooftop Sunset · 2 Stunden · 80% bekannte Songs",title:"Rooftop Sunset · Afro House",name:"Rooftop Sunset · 80% Familiar",score:"94",tags:["42 Songs","120 Min","Afro House","80% bekannt"],tracks:[["Move","Adam Port, Stryv","97"],["Thandaza","Keinemusik","95"],["Muyè","Rampa, &ME","94"],["Abalele","Kabza De Small","92"],["Yamore","MoBlack, Benja, Franc Fala","90"]]},
    schlager:{prompt:"Schlager Party · 3 Stunden · bekannte Hits zum Mitsingen",title:"Schlager Party · Singalong",name:"Schlager Party · Best Known",score:"96",tags:["54 Songs","180 Min","Schlager","92% bekannt"],tracks:[["Atemlos durch die Nacht","Helene Fischer","98"],["Warum hast du nicht nein gesagt","Roland Kaiser","97"],["Ein Stern","DJ Ötzi, Nik P.","96"],["Verdammt, ich lieb dich","Matthias Reim","95"],["Cordula Grün","Josh.","94"]]},
    rock:{prompt:"Classic Rock · 2 Stunden · bekannte Gitarren-Hymnen",title:"Classic Rock · Essentials",name:"Classic Rock · Crowd Favorites",score:"95",tags:["34 Songs","120 Min","Classic Rock","90% bekannt"],tracks:[["Don't Stop Believin'","Journey","98"],["Another One Bites the Dust","Queen","97"],["Sweet Child O' Mine","Guns N' Roses","96"],["Summer of '69","Bryan Adams","95"],["The Boys Are Back in Town","Thin Lizzy","92"]]},
    dnb:{prompt:"Drum & Bass · 90 Minuten · energetic · modern & known",title:"Drum & Bass · High Energy",name:"DNB · Modern Energy",score:"93",tags:["31 Songs","90 Min","Drum & Bass","72% bekannt"],tracks:[["Baddadan","Chase & Status","97"],["Disconnect","Becky Hill, Chase & Status","95"],["Afterglow","Wilkinson","94"],["Ready To Fly","Sub Focus, Dimension","93"],["Desire","Sub Focus, Dimension","91"]]},
    jazz:{prompt:"Dinner Jazz · 2 Stunden · elegant · warm · unobtrusive",title:"Dinner Jazz · Warm Evening",name:"Dinner Jazz · Elegant Flow",score:"95",tags:["36 Songs","120 Min","Jazz","68% bekannt"],tracks:[["The Look of Love","Diana Krall","96"],["Come Away With Me","Norah Jones","95"],["My Funny Valentine","Chet Baker","94"],["Feeling Good","Nina Simone","93"],["Blue in Green","Miles Davis","91"]]},
    pop:{prompt:"Pop Hits · 2 Stunden · upbeat · bekannte Songs · international",title:"Pop Hits · Feel Good",name:"Pop Hits · High Familiarity",score:"94",tags:["40 Songs","120 Min","Pop","90% bekannt"],tracks:[["Espresso","Sabrina Carpenter","97"],["Blinding Lights","The Weeknd","97"],["As It Was","Harry Styles","96"],["Levitating","Dua Lipa","95"],["Flowers","Miley Cyrus","94"]]}
  };

  const tours={
    engine:{eyebrow:"PLAYLIST ENGINE",title:"Von natürlicher Sprache zur validierten Playlist.",text:"Genre, Stimmung, Dauer, Anlass, Künstler oder Bekanntheitsgrad werden als Intent strukturiert und anschließend in eine prüfbare Playlist-Vorschau übersetzt.",points:["Musikwünsche in natürlicher Sprache","Genre- und Mood-Kontext","Bekanntheitsgrad und Dauer","Flow vor der Erstellung"],head:["Playlist Plan","PREVIEW READY"],rows:[["✦","Intent erkannt","Afro House · Sunset · 120 Min","READY"],["⌕","Search Strategy","Known + relevant tracks","DONE"],["✓","Validation","Dedupe · Artist limit","PASS"],["↝","Flow","Energy curve sorted","94/100"]]},
    quality:{eyebrow:"QUALITY GATE",title:"Qualität wird vor dem Spotify-Write sichtbar.",text:"Die Vorschau trennt Planung und produktive Aktion. So können Track-Auswahl, Duplikate, Artist-Verteilung und musikalischer Flow vorab geprüft werden.",points:["Preview vor Publish","Dedupe und Wiederholungsregeln","Genre-/Mood-Match","Qualitätsscore als Signal"],head:["Quality Gate","PASS"],rows:[["✓","Genre Match","Target aligned","96"],["✓","Familiarity","Requested ratio","88"],["✓","Artist Spread","Repeat limit","PASS"],["✓","Flow","Energy progression","93"]]},
    autodj:{eyebrow:"AUTO-DJ",title:"Musikfluss über Tagesphasen und Regeln steuern.",text:"Auto-DJ verbindet Playlist-Kontext, Tagesphase, Energie und Wiederholungsregeln. Automationen bleiben mit Status und Kontext nachvollziehbar.",points:["Daypart-Kontext","Queue- und Energie-Regeln","Bekanntheit je Zeitfenster","Kontrollierte Updates"],head:["Auto-DJ","4 RULES"],rows:[["11","Brunch Warm-Up","Acoustic · Soul","LOW"],["16","Afternoon Lounge","Nu Disco · Chill House","MID"],["19","Dinner Prime","Modern Classics · Soul","MID+"],["22","Late Night","House · Known Hits","HIGH"]]},
    events:{eyebrow:"EVENT RADAR",title:"Events werden zu vorbereiteten Musik-Jobs.",text:"Anlass, Datum und Musikprofil können in einen klaren Workflow überführt werden: Plan, Preview, Freigabe und optional zeitgesteuerte Automation.",points:["Event-Kontext","Vorab-Playlists","Specials und Feiertage","Status statt Blindflug"],head:["Event Radar","3 UPCOMING"],rows:[["FR","Rooftop Closing","Afro House · Sunset","PREVIEW"],["SA","Dinner Night","Soul · Jazz · Classics","READY"],["SO","Brunch Session","Feel Good · Pop","PLAN"]]}
  };

  function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c];});}

  function renderTour(key){
    const t=tours[key];if(!t)return;
    $("#tourEyebrow").textContent=t.eyebrow;$("#tourTitle").textContent=t.title;$("#tourText").textContent=t.text;
    $("#tourPoints").innerHTML=t.points.map(function(x){return '<div class="tour-point"><i>✓</i><span>'+esc(x)+'</span></div>';}).join("");
    $("#tourVisual").innerHTML='<div class="visual-head"><strong>'+esc(t.head[0])+'</strong><span>'+esc(t.head[1])+'</span></div>'+t.rows.map(function(r){return '<div class="visual-row"><i>'+esc(r[0])+'</i><div><strong>'+esc(r[1])+'</strong><small>'+esc(r[2])+'</small></div><em>'+esc(r[3])+'</em></div>';}).join("");
  }
  $$("[data-tour]").forEach(function(btn){
    btn.addEventListener("click",function(){
      $$("[data-tour]").forEach(function(b){b.classList.remove("active");b.setAttribute("aria-selected","false");});
      btn.classList.add("active");btn.setAttribute("aria-selected","true");renderTour(btn.dataset.tour);
    });
  });

  function renderDemo(set){
    if(!set)return;
    $("#demoPrompt").value=set.prompt;$("#demoTitle").textContent=set.title;$("#resultName").textContent=set.name;$("#resultScore").textContent=set.score;
    $("#resultMeta").innerHTML=set.tags.map(function(x){return "<span>"+esc(x)+"</span>";}).join("");
    $("#resultTracks").innerHTML=set.tracks.map(function(t,i){return '<div class="preview-track"><b>'+String(i+1).padStart(2,"0")+'</b><div><strong>'+esc(t[0])+'</strong><small>'+esc(t[1])+'</small></div><em>'+esc(t[2])+'</em></div>';}).join("");
    $("#demoQuality").textContent="QUALITY PASS";$("#resultFoot").textContent="Dedupe aktiv · Artist-Limit aktiv · Flow sortiert";
  }
  function chooseSet(text){
    const i=String(text||"").toLowerCase();
    if(i.includes("schlager"))return demoSets.schlager;if(i.includes("rock")||i.includes("gitar"))return demoSets.rock;if(i.includes("drum")||i.includes("dnb"))return demoSets.dnb;if(i.includes("jazz"))return demoSets.jazz;if(i.includes("pop")||i.includes("charts"))return demoSets.pop;if(i.includes("afro")||i.includes("house"))return demoSets.afro;
    return {prompt:String(text||"Individuelle Playlist"),title:"AI Playlist · Custom Intent",name:"Individuelle Playlist · Preview",score:"92",tags:["AI Preview","Genre erkannt","Flow sortiert","Dedupe aktiv"],tracks:[["Track Match 01","AI Search Result","96"],["Track Match 02","AI Search Result","94"],["Track Match 03","AI Search Result","93"],["Track Match 04","AI Search Result","91"],["Track Match 05","AI Search Result","90"]]};
  }
  $$(".preset-row [data-demo]").forEach(function(btn){
    btn.addEventListener("click",function(){
      $$(".preset-row [data-demo]").forEach(function(b){b.classList.remove("active");});btn.classList.add("active");renderDemo(demoSets[btn.dataset.demo]);
    });
  });
  $("#demoRun")&&$("#demoRun").addEventListener("click",function(){
    const input=$("#demoPrompt").value.trim();if(!input){$("#demoPrompt").focus();return;}
    $$(".preset-row [data-demo]").forEach(function(b){b.classList.remove("active");});$("#demoQuality").textContent="ANALYSING…";setTimeout(function(){renderDemo(chooseSet(input));},360);
  });
  $("#demoPrompt")&&$("#demoPrompt").addEventListener("keydown",function(e){if((e.metaKey||e.ctrlKey)&&e.key==="Enter"){e.preventDefault();$("#demoRun").click();}});
  $("#fakeCreate")&&$("#fakeCreate").addEventListener("click",function(){$("#demoQuality").textContent="DEMO · READ ONLY";$("#resultFoot").textContent="Keine Spotify-Daten verändert · Produktivsystem separat öffnen";});

  function setHealth(ok,latency){
    const full=ok?"Spotify System live":"Live-System verfügbar",short=ok?"Online":"Verfügbar";
    if($("#navHealth"))$("#navHealth").textContent=ok?"System live":"Status";if($("#heroHealth"))$("#heroHealth").textContent=full;if($("#floatHealth"))$("#floatHealth").textContent=short;if($("#floatLatency"))$("#floatLatency").textContent=latency?"Healthcheck · "+latency+" ms":"Read-only Healthcheck";
  }
  (function(){
    const started=performance.now();
    fetch("https://spotify.kitzlabs.ai/api/health",{method:"GET",mode:"cors",cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("offline");return r.text();}).then(function(){setHealth(true,Math.max(1,Math.round(performance.now()-started)));}).catch(function(){setHealth(false,null);});
  })();

  const revealItems=$$(".reveal");
  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){const delay=parseInt(entry.target.getAttribute("data-delay")||"0",10);setTimeout(function(){entry.target.classList.add("in");},delay);observer.unobserve(entry.target);}});},{threshold:.07});
    revealItems.forEach(function(el){observer.observe(el);});
  }else{revealItems.forEach(function(el){el.classList.add("in");});}


  const configState={venue:"bar",goal:"automation",scale:"single"};
  const configLabels={
    venue:{bar:"Bar / Club",hotel:"Hotel",restaurant:"Restaurant",event:"Event"},
    goal:{automation:"Automation",quality:"Qualität",control:"Steuerung"},
    scale:{single:"1 Standort",small:"2–5 Bereiche",custom:"Individuell"}
  };

  function configData(state){
    const venueMap={
      bar:{title:"Hospitality Control Stack",text:"Für Bar- und Clubbetrieb mit wechselnden Tagesphasen, Event-Kontext und kontrollierter Playlist-Automation.",mods:[["✦","Playlist Engine","Intent + Preview"],["↻","Auto-DJ","Daypart Flow"],["◇","Event Radar","Specials + Termine"]]},
      hotel:{title:"Hotel Music Operations",text:"Für Lobby, Gastro und wechselnde Tagesphasen mit klarer Musikplanung und steuerbaren Automationen.",mods:[["✦","Playlist Engine","Music profiles"],["↻","Auto-DJ","Daypart rules"],["◉","Spotify Connect","Playback context"]]},
      restaurant:{title:"Restaurant Daypart Stack",text:"Für Lunch, Dinner und spätere Tagesphasen mit planbaren Musikprofilen und Qualitätskontrolle.",mods:[["✦","Playlist Engine","Lunch + Dinner"],["✓","Quality Gate","Preview-first"],["⚙","Scheduler","Recurring jobs"]]},
      event:{title:"Event Music Workflow",text:"Für Musikbriefings, Event-Kontext und vorbereitete Playlists mit kontrollierter Freigabe.",mods:[["◇","Event Radar","Event context"],["✦","Playlist Engine","Briefing → Preview"],["⌁","Telegram","Remote approval"]]}
    };
    const base=venueMap[state.venue];
    const extra=state.goal==="quality"?["✓","Quality Gate","Validation + Dedupe"]:state.goal==="control"?["⌁","Telegram Control","Remote control"]:["⚙","Automation Scheduler","Recurring workflows"];
    const scale=state.scale==="small"?["↗","OpenAPI","Multiple workflows"]:state.scale==="custom"?["↗","OpenAPI","Custom integration"]:["◉","Spotify Connect","Live context"];
    return {title:base.title,text:base.text,mods:base.mods.concat([extra,scale])};
  }

  function renderConfigurator(){
    if(!$("#configModules"))return;
    const data=configData(configState);
    $("#configTitle").textContent=data.title;
    $("#configBadge").textContent=configLabels.goal[configState.goal].toUpperCase();
    $("#configText").textContent=data.text+" Schwerpunkt: "+configLabels.goal[configState.goal]+". Umfang: "+configLabels.scale[configState.scale]+".";
    $("#configModules").innerHTML=data.mods.map(function(m){
      return '<div class="config-module"><i>'+esc(m[0])+'</i><div><strong>'+esc(m[1])+'</strong><small>'+esc(m[2])+'</small></div></div>';
    }).join("");
    const subject="KI Spotify Agent Anfrage · "+configLabels.venue[configState.venue]+" · "+configLabels.goal[configState.goal];
    const body="Hallo AI Kitz,%0D%0A%0D%0Aich interessiere mich für den KI Spotify Agent.%0D%0AEinsatz: "+encodeURIComponent(configLabels.venue[configState.venue])+"%0D%0ASchwerpunkt: "+encodeURIComponent(configLabels.goal[configState.goal])+"%0D%0AUmfang: "+encodeURIComponent(configLabels.scale[configState.scale])+"%0D%0A%0D%0ABitte um weitere Informationen.";
    $("#configContact").href="mailto:office@aikitz.at?subject="+encodeURIComponent(subject)+"&body="+body;
  }

  $$("[data-config-group]").forEach(function(btn){
    btn.addEventListener("click",function(){
      const group=btn.dataset.configGroup;
      const value=btn.dataset.value;
      configState[group]=value;
      $$('[data-config-group="'+group+'"]').forEach(function(b){b.classList.remove("active");});
      btn.classList.add("active");
      renderConfigurator();
    });
  });

  renderConfigurator();

  renderTour("engine");renderDemo(demoSets.afro);
})();