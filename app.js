(function(){
  "use strict";
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));

  const menu=$(".menu-toggle"),mobile=$("#mobileNav");
  if(menu&&mobile){
    menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!open));mobile.classList.toggle("open",!open);document.body.classList.toggle("menu-open",!open)});
    $$("#mobileNav a").forEach(a=>a.addEventListener("click",()=>{menu.setAttribute("aria-expanded","false");mobile.classList.remove("open");document.body.classList.remove("menu-open")}));
  }

  const progress=$("#scrollProgress");
  function updateProgress(){if(!progress)return;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.width=Math.min(100,(scrollY/max)*100)+"%"}
  addEventListener("scroll",updateProgress,{passive:true});updateProgress();

  const viewData={
    playlist:{eyebrow:"PLAYLIST",title:"Deine Musik – sofort als klare Vorschau.",text:"Du siehst Name, Dauer, Stimmung und Tracks, bevor du die Playlist verwendest.",benefits:["Playlist in Sekunden planen","Dauer und Musikstil sichtbar","Tracks vorab prüfen"],screen:{head:"Sunset Dinner Flow",pill:"42 Songs",hero:"Rooftop Sunset · Dinner",rows:[["01","Move","Adam Port, Stryv","✓"],["02","Inner Light","Eli & Fur","✓"],["03","Dreams","Fleetwood Mac","✓"],["04","The Look of Love","Diana Krall","✓"]]}},
    live:{eyebrow:"LIVE MUSIC VIEW",title:"Auf einen Blick sehen, was gerade läuft.",text:"Du siehst den aktuellen Track, die Stimmung und was als Nächstes geplant ist.",benefits:["Aktueller Track sichtbar","Nächster Musikmodus","Ideal für Teams und Schichtwechsel"],screen:{head:"Live Music",pill:"● LIVE",hero:"Dinner Mode · aktiv",rows:[["♪","Music Sounds Better","Rampa","PLAYING"],["→","Next: Dreams","Fleetwood Mac","19:07"],["◉","Dinner Mode","bis 22:00","AKTIV"]]}},
    dayparts:{eyebrow:"TAGESPHASEN",title:"Andere Musik, wenn sich dein Betrieb verändert.",text:"Frühstück, Lunch, Sunset, Dinner und Late Night können eigene Musikrichtungen bekommen.",benefits:["Automatische Wechsel","Weniger manuelle Arbeit","Konsistente Stimmung"],screen:{head:"Tagesplan",pill:"AUTOMATISCH",hero:"Heute · Samstag",dayparts:true}},
    requests:{eyebrow:"GÄSTE-WÜNSCHE",title:"Musikwünsche direkt vom Handy.",text:"Gäste scannen den QR-Code und senden Song, Genre oder Stimmung – ohne dein Team zu unterbrechen.",benefits:["QR-Code am Tisch oder an der Bar","Einfache mobile Ansicht","Passend zum Musikprofil"],screen:{head:"Gäste-Wünsche",pill:"NEU",hero:"3 neue Wünsche",rows:[["♡","Aperol Spritz","von Emma","GERADE"],["♡","Pedro","von Max","2 MIN"],["♡","Beautiful Things","von Lara","6 MIN"]]}}
  };

  function renderView(key){
    const d=viewData[key];if(!d)return;
    $("#viewEyebrow").textContent=d.eyebrow;$("#viewTitle").textContent=d.title;$("#viewText").textContent=d.text;
    $("#viewBenefits").innerHTML=d.benefits.map(x=>"<li>"+esc(x)+"</li>").join("");
    let body='<div class="customer-ui"><div class="ui-head"><strong>'+esc(d.screen.head)+'</strong><span>'+esc(d.screen.pill)+'</span></div><div class="ui-hero"><strong>'+esc(d.screen.hero)+'</strong><p>KI Spotify Agent · deine Musik übersichtlich gesteuert.</p></div>';
    if(d.screen.dayparts){
      body+='<div class="daypart-mini"><div><span>08:00</span><strong>Breakfast</strong></div><div><span>12:00</span><strong>Lunch</strong></div><div class="active"><span>17:00</span><strong>Sunset</strong></div><div><span>20:00</span><strong>Dinner</strong></div></div>';
    }else{
      body+=(d.screen.rows||[]).map(r=>'<div class="ui-row"><i>'+esc(r[0])+'</i><div><strong>'+esc(r[1])+'</strong><small>'+esc(r[2])+'</small></div><em>'+esc(r[3])+'</em></div>').join("");
    }
    body+="</div>";$("#viewScreen").innerHTML=body;
  }
  $$(".view-tab").forEach(b=>b.addEventListener("click",()=>{$$(".view-tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderView(b.dataset.view)}));renderView("playlist");

  const fallback={
    afro:{prompt:"Afro House Rooftop Sunset · 2 Stunden · 80% bekannte Songs",title:"Rooftop Sunset",name:"Afro House · Sunset",score:"94",tags:["42 Songs","120 Min","Afro House"],tracks:[["Move","Adam Port, Stryv","97"],["Thandaza","Keinemusik","95"],["Muyè","Rampa, &ME","94"],["Yamore","MoBlack, Benja, Franc Fala","90"]]},
    dinner:{prompt:"Dinner · 3 Stunden · elegant · modern · bekannte Songs",title:"Dinner Evening",name:"Modern Dinner · Elegant Flow",score:"95",tags:["48 Songs","180 Min","Dinner"],tracks:[["The Look of Love","Diana Krall","96"],["Come Away With Me","Norah Jones","95"],["Dreams","Fleetwood Mac","94"],["Inner Light","Eli & Fur","93"]]},
    schlager:{prompt:"Schlager Party · 3 Stunden · bekannte Hits zum Mitsingen",title:"Schlager Party",name:"Schlager · Singalong",score:"96",tags:["54 Songs","180 Min","Schlager"],tracks:[["Atemlos durch die Nacht","Helene Fischer","98"],["Warum hast du nicht nein gesagt","Roland Kaiser","97"],["Ein Stern","DJ Ötzi, Nik P.","96"],["Verdammt, ich lieb dich","Matthias Reim","95"]]},
    rock:{prompt:"Classic Rock · 2 Stunden · bekannte Gitarren-Hymnen",title:"Classic Rock",name:"Rock · Crowd Favorites",score:"95",tags:["34 Songs","120 Min","Classic Rock"],tracks:[["Don't Stop Believin'","Journey","98"],["Another One Bites the Dust","Queen","97"],["Sweet Child O' Mine","Guns N' Roses","96"],["Summer of '69","Bryan Adams","95"]]},
    charts:{prompt:"Charts · 2 Stunden · aktuelle und bekannte Pop Hits",title:"Current Hits",name:"Charts · Feel Good",score:"94",tags:["40 Songs","120 Min","Charts"],tracks:[["Espresso","Sabrina Carpenter","97"],["Blinding Lights","The Weeknd","97"],["As It Was","Harry Styles","96"],["Flowers","Miley Cyrus","94"]]}
  };
  function renderDemo(d){
    $("#demoPrompt").value=d.prompt;$("#demoTitle").textContent=d.title;$("#resultName").textContent=d.name;$("#resultScore").textContent=d.score;$("#resultMeta").innerHTML=d.tags.map(x=>"<span>"+esc(x)+"</span>").join("");$("#resultTracks").innerHTML=d.tracks.map((t,i)=>'<div class="demo-track"><b>'+String(i+1).padStart(2,"0")+'</b><div><strong>'+esc(t[0])+'</strong><small>'+esc(t[1])+'</small></div><em>'+esc(t[2])+'</em></div>').join("");$("#demoQuality").textContent="BEREIT";$("#resultFoot").textContent="Vorschau bereit";
  }
  $$(".preset-row [data-demo]").forEach(b=>b.addEventListener("click",()=>{$$(".preset-row [data-demo]").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderDemo(fallback[b.dataset.demo])}));

  async function livePreview(){
    const prompt=$("#demoPrompt").value.trim();if(!prompt){$("#demoPrompt").focus();return}
    $("#demoQuality").textContent="KI ERSTELLT …";$("#resultFoot").textContent="Live-Vorschau wird erstellt …";
    try{
      const h=prompt.match(/(\d+(?:[.,]\d+)?)\s*(?:stunden?|std|hours?|h)\b/i);
      const m=prompt.match(/(\d+)\s*(?:minuten?|minutes?|min)\b/i);
      const requested=h?Number(h[1].replace(",","."))*60:m?Number(m[1]):120;
      const duration=Math.max(30,Math.min(360,Math.round(requested)));
      const desiredTracks=Math.max(20,Math.min(80,Math.round(duration/3)));
      const res=await fetch("/live/preview",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({prompt,durationMinutes:duration,trackCount:desiredTracks})});
      const data=await res.json();if(!res.ok||!data.ok||!data.preview)throw new Error("preview");
      const p=data.preview,tracks=Array.isArray(p.tracks)?p.tracks:[],actualCount=Number(p.trackCount||tracks.length||0),score=Number(p.premiumScore);
      const isSample=actualCount>0&&actualCount<Math.min(15,desiredTracks);
      $("#demoTitle").textContent=p.name||"KI Playlist";$("#resultName").textContent=p.name||"Live Preview";
      $("#resultScore").textContent=Number.isFinite(score)&&score>=80?String(Math.round(score)):"LIVE";
      const genre=Array.isArray(p.genres)&&p.genres[0]?p.genres[0]:"KI Playlist";
      const tags=[isSample?actualCount+" Live-Treffer":(actualCount||desiredTracks)+" Songs",duration+" Min Wunsch",genre];
      $("#resultMeta").innerHTML=tags.map(x=>"<span>"+esc(x)+"</span>").join("");
      $("#resultTracks").innerHTML=tracks.slice(0,6).map((t,i)=>'<div class="demo-track"><b>'+String(i+1).padStart(2,"0")+'</b><div><strong>'+esc(t.title||"Track")+'</strong><small>'+esc(t.artist||"Spotify")+'</small></div><em>✓</em></div>').join("");
      $("#demoQuality").textContent=isSample?"LIVE SAMPLE":"LIVE VORSCHAU";
      $("#resultFoot").textContent=isSample?"Live-Sample aus dem Preview-System · keine Playlist veröffentlicht":"Echte KI-Vorschau · keine Playlist veröffentlicht";
    }catch(e){$("#demoQuality").textContent="DEMO";$("#resultFoot").textContent="Live-Vorschau momentan nicht erreichbar · Demo angezeigt";renderDemo(fallback.afro)}
  }
  $("#demoRun")?.addEventListener("click",livePreview);
  $("#demoPrompt")?.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key==="Enter"){e.preventDefault();livePreview()}});renderDemo(fallback.afro);

  async function health(){
    const start=performance.now();
    try{const r=await fetch("/live/health",{cache:"no-store"});if(!r.ok)throw new Error();$("#systemStatus").textContent="System online";$("#heroLatency").textContent="Live verbunden · "+Math.max(1,Math.round(performance.now()-start))+" ms"}catch(e){$("#systemStatus").textContent="System verfügbar";$("#heroLatency").textContent="Verbindung verfügbar"}
  }health();

  $$("[data-billing]").forEach(b=>b.addEventListener("click",()=>{$$("[data-billing]").forEach(x=>x.classList.remove("active"));b.classList.add("active");const annual=b.dataset.billing==="annual";$$(".price-number[data-monthly]").forEach(el=>el.textContent="€"+(annual?el.dataset.annual:el.dataset.monthly));$$(".price-billing:not(.fixed-billing)").forEach(el=>el.textContent=annual?"monatlicher Gegenwert · jährlich abgerechnet":"monatlich abgerechnet")}));
  $$(".plan-contact").forEach(a=>a.addEventListener("click",()=>{if($("#leadMessage"))$("#leadMessage").value="Ich interessiere mich für das Paket "+(a.dataset.plan||"")+". Bitte sendet mir Details zum passenden Setup."}));

  const form=$("#leadForm");
  if(form)form.addEventListener("submit",async e=>{
    e.preventDefault();if(form.querySelector('input[name="website"]')?.value)return;
    const submit=$("#leadSubmit"),status=$("#leadStatus"),payload={name:$("#leadName").value.trim(),email:$("#leadEmail").value.trim(),company:$("#leadCompany").value.trim(),message:$("#leadMessage").value.trim()};
    if(!payload.name||!payload.email||!payload.message||!$("#leadConsent").checked)return;
    submit.disabled=true;submit.textContent="Wird gesendet …";status.className="form-status";status.textContent="";
    try{const r=await fetch("/live/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});const d=await r.json();if(!r.ok||!d.ok)throw new Error();status.textContent="✓ Anfrage wurde an AI Kitz übermittelt.";form.reset()}
    catch(err){status.className="form-status error";status.innerHTML='Senden nicht möglich. Bitte an <a href="mailto:office@aikitz.at">office@aikitz.at</a> schreiben.'}
    finally{submit.disabled=false;submit.innerHTML='Projektanfrage senden <span>↗</span>'}
  });


  const venueData={
    bar:{eyebrow:"BAR & LOUNGE",title:"Von Sunset bis Late Night – ohne Playlist-Wechsel.",text:"Der Agent wechselt die Musik passend zu Tageszeit, Gäste-Stimmung und Event.",flow:[["17:00","Sunset"],["20:00","Dinner"],["23:00","Late Night"],["01:00","Closing"]],active:0,now:"Sunset · Chill House",next:"Dinner ab 20:00"},
    hotel:{eyebrow:"HOTEL",title:"Ein Musiksystem für alle Tagesphasen im Hotel.",text:"Breakfast, Lobby, Spa und Rooftop können jeweils ihren eigenen Stil bekommen.",flow:[["07:00","Breakfast"],["11:00","Lobby"],["15:00","Spa"],["18:00","Rooftop"]],active:1,now:"Lobby · Modern Easy",next:"Spa ab 15:00"},
    restaurant:{eyebrow:"RESTAURANT",title:"Von Lunch bis Dinner – konstant passend.",text:"Die Musik bleibt elegant und entwickelt sich mit Auslastung und Tageszeit.",flow:[["11:30","Lunch"],["16:00","Aperitif"],["19:00","Dinner"],["22:00","Late Dinner"]],active:2,now:"Dinner · Modern Classics",next:"Late Dinner ab 22:00"},
    event:{eyebrow:"EVENT",title:"Ein eigener Musikflow nur für dein Event.",text:"Warm-up, Main, Peak und Closing können für den Abend geplant werden.",flow:[["18:00","Warm-up"],["20:00","Main"],["22:30","Peak"],["01:00","Closing"]],active:1,now:"Main · Event Flow",next:"Peak ab 22:30"}
  };
  function renderVenue(key){
    const d=venueData[key];if(!d||!$("#venueFlow"))return;
    $("#venueEyebrow").textContent=d.eyebrow;$("#venueTitle").textContent=d.title;$("#venueText").textContent=d.text;$("#venueNow").textContent=d.now;$("#venueNext").textContent=d.next;
    $("#venueFlow").innerHTML=d.flow.map((x,i)=>'<div class="'+(i===d.active?"active":"")+'"><span>'+esc(x[0])+'</span><strong>'+esc(x[1])+'</strong></div>').join("");
  }
  $$(".venue-option").forEach(btn=>btn.addEventListener("click",()=>{$$(".venue-option").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderVenue(btn.dataset.venue)}));renderVenue("bar");

  const storyData={
    prompt:{head:"Playlist Studio",pill:"AI READY",html:'<div class="story-prompt">Rooftop Sunset · 2 Stunden · Afro House · bekannte Songs</div><div class="story-ai"><i>✦</i><span>Verstanden. Ich plane einen entspannten Start und steigere die Energie Richtung Dinner.</span></div><div class="story-list"><div class="story-track"><b>01</b><div><strong>Move</strong><small>Adam Port, Stryv</small></div><em>READY</em></div><div class="story-track"><b>02</b><div><strong>Inner Light</strong><small>Eli & Fur</small></div><em>READY</em></div><div class="story-track"><b>03</b><div><strong>Dreams</strong><small>Fleetwood Mac</small></div><em>READY</em></div></div>'},
    preview:{head:"Playlist Preview",pill:"42 SONGS",html:'<div class="ui-hero"><strong>Sunset Dinner Flow</strong><p>120 Minuten · Afro House · bekannte Songs</p></div><div class="story-list"><div class="story-track"><b>01</b><div><strong>Move</strong><small>Adam Port, Stryv</small></div><em>✓</em></div><div class="story-track"><b>02</b><div><strong>Thandaza</strong><small>Keinemusik</small></div><em>✓</em></div><div class="story-track"><b>03</b><div><strong>Muyè</strong><small>Rampa, &ME</small></div><em>✓</em></div><div class="story-track"><b>04</b><div><strong>Dreams</strong><small>Fleetwood Mac</small></div><em>✓</em></div></div>'},
    dayparts:{head:"Music Day",pill:"AUTOMATISCH",html:'<div class="story-event"><div class="story-event-card"><span>08:00</span><strong>Breakfast</strong><em>SOFT</em></div><div class="story-event-card"><span>12:00</span><strong>Lunch</strong><em>RELAXED</em></div><div class="story-event-card active"><span>17:00</span><strong>Sunset</strong><em>AKTIV</em></div><div class="story-event-card"><span>20:00</span><strong>Dinner</strong><em>NEXT</em></div></div>'},
    guest:{head:"Guest Wishes",pill:"QR LIVE",html:'<div class="story-phone"><div class="story-phone-inner"><div class="story-phone-notch"></div><span class="eyebrow">DEIN MUSIKWUNSCH</span><h4>Was möchtest du hören?</h4><p>Wähle eine Stimmung oder schreib direkt deinen Wunsch.</p><div><span class="phone-chip active">Feiern</span><span class="phone-chip">Chill</span><span class="phone-chip">Sommer</span></div><div><span class="phone-chip active">House</span><span class="phone-chip">Pop</span><span class="phone-chip">Charts</span></div><div class="phone-field">Beautiful Things · Benson Boone</div><div class="phone-send">Wunsch senden ↗</div></div></div>'},
    live:{head:"Live Music",pill:"● PLAYING",html:'<div class="ui-hero"><strong>Music Sounds Better</strong><p>Rampa · Dinner Mode</p></div><div class="story-list"><div class="story-track"><b>♪</b><div><strong>Music Sounds Better</strong><small>Rampa</small></div><em>PLAYING</em></div><div class="story-track"><b>→</b><div><strong>Dreams</strong><small>Fleetwood Mac</small></div><em>NEXT</em></div><div class="story-track"><b>20</b><div><strong>Dinner Mode</strong><small>bis 23:00</small></div><em>AKTIV</em></div></div>'},
    event:{head:"Event Mode",pill:"TONIGHT",html:'<div class="story-event"><div class="story-event-card"><span>20:00</span><strong>Dinner</strong><em>PAUSED</em></div><div class="story-event-card active"><span>21:00</span><strong>Rooftop Night</strong><em>EVENT MODE</em></div><div class="story-event-card"><span>01:00</span><strong>Late Night</strong><em>RESUMES</em></div></div>'}
  };
  function renderStory(key){const d=storyData[key];if(!d||!$("#storyWindow"))return;$("#storyWindow").innerHTML='<div class="story-ui"><div class="story-ui-head"><strong>'+esc(d.head)+'</strong><span>'+esc(d.pill)+'</span></div>'+d.html+'</div>'}
  renderStory("prompt");
  const storySteps=$$(".story-step");
  if("IntersectionObserver"in window){
    const storyObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){storySteps.forEach(s=>s.classList.remove("active"));e.target.classList.add("active");renderStory(e.target.dataset.story)}}),{rootMargin:"-34% 0px -45% 0px",threshold:.05});
    storySteps.forEach(s=>storyObserver.observe(s));
  }

  const timelineData={
    breakfast:{label:"08:00 · BREAKFAST",title:"Ruhig in den Tag starten.",text:"Soft Pop und Acoustic begleiten Frühstück und frühen Morgen.",energy:"LOW",familiar:"80%"},
    lunch:{label:"12:00 · LUNCH",title:"Locker, bekannt und unaufdringlich.",text:"Soul und Easy Listening halten die Atmosphäre angenehm.",energy:"LOW+",familiar:"75%"},
    sunset:{label:"17:00 · SUNSET",title:"Entspannt starten. Langsam Energie aufbauen.",text:"Chill House und Nu Disco schaffen den Übergang von Nachmittag zu Abend.",energy:"MEDIUM",familiar:"70%"},
    dinner:{label:"20:00 · DINNER",title:"Elegant, warm und konstant.",text:"Modern Classics und Soul unterstützen Dinner ohne zu dominieren.",energy:"MEDIUM+",familiar:"85%"},
    night:{label:"23:00 · LATE NIGHT",title:"Mehr Energie, mehr bekannte Songs.",text:"House und Crowd Favorites bringen den Abend in die späte Phase.",energy:"HIGH",familiar:"90%"}
  };
  const timelineKeys=["breakfast","lunch","sunset","dinner","night"];
  function renderTimeline(key){
    const d=timelineData[key],idx=timelineKeys.indexOf(key);if(!d||!$("#timelineDetail"))return;
    $$(".timeline-point").forEach(b=>b.classList.toggle("active",b.dataset.time===key));
    if($("#timelineProgress")){if(innerWidth<=700)$("#timelineProgress").style.height=((idx/(timelineKeys.length-1))*100)+"%";else $("#timelineProgress").style.width=((idx/(timelineKeys.length-1))*100)+"%";}
    $("#timelineDetail").innerHTML='<div><span class="eyebrow">'+esc(d.label)+'</span><h3>'+esc(d.title)+'</h3><p>'+esc(d.text)+'</p></div><div class="energy-card"><span>ENERGIE</span><div class="energy-bars"><i></i><i></i><i></i><i class="on"></i><i></i></div><strong>'+esc(d.energy)+'</strong></div><div class="familiar-card"><span>BEKANNTE SONGS</span><strong>'+esc(d.familiar)+'</strong><small>gezielt steuerbar</small></div>';
  }
  $$(".timeline-point").forEach(b=>b.addEventListener("click",()=>renderTimeline(b.dataset.time)));renderTimeline("sunset");
  addEventListener("resize",()=>renderTimeline($(".timeline-point.active")?.dataset.time||"sunset"),{passive:true});

  $("#baToggle")?.addEventListener("click",function(){this.classList.toggle("on");$(".before-card")?.classList.toggle("active");$(".after-card")?.classList.toggle("active")});

  const finder={venue:"single",automation:"basic",guest:"no"};
  function renderFinder(){
    let plan="Core",title="Playlist AI",text="Ideal, wenn du professionelle KI-Playlists erstellen und vorab prüfen möchtest.";
    if(finder.venue==="multi"){plan="Enterprise";title="Custom Music AI";text="Für mehrere Standorte und individuelle Erweiterungen ist Enterprise die passende Basis."}
    else if(finder.venue==="hospitality"||finder.guest==="yes"){plan="Hospitality";title="Music Operations";text="Für Hospitality, QR Gäste-Wünsche, Musikprofile und mehrere Bereiche ist Hospitality die stärkste Wahl."}
    else if(finder.automation==="advanced"){plan="Pro";title="Music Control";text="Für Tagesphasen, Events und laufende Musikautomation passt Pro am besten."}
    $("#finderPlan").textContent=plan.toUpperCase();$("#finderTitle").textContent=title;$("#finderText").textContent=text;$("#finderCta").textContent=plan+" ansehen →";
  }
  $$("[data-finder]").forEach(btn=>btn.addEventListener("click",()=>{const group=btn.dataset.finder;finder[group]=btn.dataset.value;$$(`[data-finder="${group}"]`).forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderFinder()}));renderFinder();

  const modalData={
    qr:{eyebrow:"GUEST EXPERIENCE",title:"Gäste-Wünsche per QR-Code",text:"Deine Gäste scannen einen Code, wählen Stimmung oder Song und senden ihren Wunsch direkt über eine mobile Ansicht.",points:["Kein App-Download nötig","QR-Code am Tisch, an der Bar oder im Hotel","Optional in Pro, inklusive ab Hospitality"],visual:'<div class="story-phone"><div class="story-phone-inner"><div class="story-phone-notch"></div><span class="eyebrow">MUSIKWUNSCH</span><h4>Was möchtest du hören?</h4><div><span class="phone-chip active">Feiern</span><span class="phone-chip">Chill</span></div><div class="phone-field">Beautiful Things</div><div class="phone-send">Wunsch senden ↗</div></div></div>'},
    dayparts:{eyebrow:"AUTOMATION",title:"Musik nach Tageszeit",text:"Der Musikstil verändert sich automatisch mit deinem Betrieb – von Frühstück bis Late Night.",points:["Eigene Musikprofile pro Phase","Events können den normalen Ablauf temporär ersetzen","Ideal für Bars, Restaurants und Hotels"],visual:'<div class="story-event"><div class="story-event-card"><span>08:00</span><strong>Breakfast</strong><em>SOFT</em></div><div class="story-event-card active"><span>17:00</span><strong>Sunset</strong><em>AKTIV</em></div><div class="story-event-card"><span>20:00</span><strong>Dinner</strong><em>NEXT</em></div></div>'},
    event:{eyebrow:"EVENT MODE",title:"Events mit eigenem Musikflow",text:"Special Nights, Rooftop Events oder Brunch können für einen definierten Zeitraum den normalen Musikplan ersetzen.",points:["Event startet und endet gezielt","Normaler Musikflow läuft danach weiter","Eigene Stimmung für jeden Anlass"],visual:'<div class="story-event"><div class="story-event-card"><span>20:00</span><strong>Dinner</strong><em>PAUSED</em></div><div class="story-event-card active"><span>21:00</span><strong>Rooftop Night</strong><em>EVENT</em></div><div class="story-event-card"><span>01:00</span><strong>Late Night</strong><em>RESUMES</em></div></div>'}
  };
  let modalOpener=null;
  function openModal(key,opener){
    const d=modalData[key],modal=$("#featureModal");if(!d||!modal)return;
    modalOpener=opener||document.activeElement;$("#modalEyebrow").textContent=d.eyebrow;$("#modalTitle").textContent=d.title;$("#modalText").textContent=d.text;$("#modalPoints").innerHTML=d.points.map(p=>'<div><i>✓</i><span>'+esc(p)+'</span></div>').join("");$("#modalVisual").innerHTML=d.visual;modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";requestAnimationFrame(()=>$(".feature-modal-close")?.focus());
  }
  function closeModal(){
    const modal=$("#featureModal");if(!modal||!modal.classList.contains("open"))return;
    modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";const restore=modalOpener;modalOpener=null;restore?.focus?.();
  }
  $$(".feature-open").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.feature,b)));$(".feature-modal-backdrop")?.addEventListener("click",closeModal);$(".feature-modal-close")?.addEventListener("click",closeModal);$("#modalCta")?.addEventListener("click",closeModal);
  addEventListener("keydown",e=>{
    const modal=$("#featureModal");if(!modal?.classList.contains("open"))return;
    if(e.key==="Escape"){e.preventDefault();closeModal();return}
    if(e.key==="Tab"){const focusable=$$("#featureModal button:not([disabled]), #featureModal a[href]");if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
  });

  const reducedMotion=matchMedia("(prefers-reduced-motion:reduce)");if(reducedMotion.matches)$$("video[autoplay]").forEach(v=>{v.removeAttribute("autoplay");v.pause()});

  const qrVideo=$("#qrFeatureVideo"),qrVideoWrap=$("#qrVideoWrap");
  if(qrVideo&&qrVideoWrap){
    const videoReady=()=>{qrVideoWrap.classList.remove("video-fallback-active");qrVideoWrap.classList.add("video-ready")};
    const videoFallback=()=>{if(qrVideo.readyState<2)qrVideoWrap.classList.add("video-fallback-active")};
    qrVideo.addEventListener("loadeddata",videoReady,{once:true});
    qrVideo.addEventListener("playing",videoReady,{once:true});
    qrVideo.addEventListener("error",videoFallback,{once:true});
    setTimeout(videoFallback,2800);
  }

  if(matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches){
    const heroProduct=$(".hero-product");if(heroProduct)heroProduct.addEventListener("pointermove",e=>{const r=heroProduct.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;const screen=$(".hero-screen");if(screen)screen.style.transform='perspective(1500px) rotateY('+(x*3)+'deg) rotateX('+(-y*2)+'deg) translateY(-2px)'});
    heroProduct?.addEventListener("pointerleave",()=>{const screen=$(".hero-screen");if(screen)screen.style.transform=""});
  }


  const reveal=$$(".reveal");if("IntersectionObserver"in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add("in"),Number(e.target.dataset.delay||0));io.unobserve(e.target)}}),{threshold:.07});reveal.forEach(x=>io.observe(x))}else reveal.forEach(x=>x.classList.add("in"));
})();