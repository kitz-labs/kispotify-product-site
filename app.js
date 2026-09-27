(function(){
  "use strict";

  const $ = function(selector, root){ return (root || document).querySelector(selector); };
  const $$ = function(selector, root){ return Array.from((root || document).querySelectorAll(selector)); };

  const menuToggle = $(".menu-toggle");
  const mobileNav = $("#mobileNav");

  if(menuToggle && mobileNav){
    menuToggle.addEventListener("click", function(){
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      mobileNav.classList.toggle("open", !open);
      document.body.classList.toggle("menu-open", !open);
    });
    $$("#mobileNav a").forEach(function(link){
      link.addEventListener("click", function(){
        menuToggle.setAttribute("aria-expanded","false");
        mobileNav.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const demoSets = {
    afro:{
      prompt:"Afro House Rooftop Sunset · 2 Stunden · 80% bekannte Songs",
      title:"Rooftop Sunset · Afro House",
      name:"Rooftop Sunset · 80% Familiar",
      score:"94",
      tags:["42 Songs","120 Min","Afro House","80% bekannt"],
      tracks:[
        ["Move","Adam Port, Stryv","97"],
        ["Thandaza","Keinemusik","95"],
        ["Muyè","Rampa, &ME","94"],
        ["Abalele","Kabza De Small","92"],
        ["Yamore","MoBlack, Benja, Franc Fala","90"]
      ]
    },
    schlager:{
      prompt:"Schlager Party · 3 Stunden · bekannte Hits zum Mitsingen",
      title:"Schlager Party · Singalong",
      name:"Schlager Party · Best Known",
      score:"96",
      tags:["54 Songs","180 Min","Schlager","92% bekannt"],
      tracks:[
        ["Atemlos durch die Nacht","Helene Fischer","98"],
        ["Warum hast du nicht nein gesagt","Roland Kaiser","97"],
        ["Ein Stern","DJ Ötzi, Nik P.","96"],
        ["Verdammt, ich lieb dich","Matthias Reim","95"],
        ["Cordula Grün","Josh.","94"]
      ]
    },
    rock:{
      prompt:"Classic Rock · 2 Stunden · bekannte Gitarren-Hymnen",
      title:"Classic Rock · Essentials",
      name:"Classic Rock · Crowd Favorites",
      score:"95",
      tags:["34 Songs","120 Min","Classic Rock","90% bekannt"],
      tracks:[
        ["Don't Stop Believin'","Journey","98"],
        ["Another One Bites the Dust","Queen","97"],
        ["Sweet Child O' Mine","Guns N' Roses","96"],
        ["Summer of '69","Bryan Adams","95"],
        ["The Boys Are Back in Town","Thin Lizzy","92"]
      ]
    },
    dnb:{
      prompt:"Drum & Bass · 90 Minuten · energetic · modern & known",
      title:"Drum & Bass · High Energy",
      name:"DNB · Modern Energy",
      score:"93",
      tags:["31 Songs","90 Min","Drum & Bass","72% bekannt"],
      tracks:[
        ["Baddadan","Chase & Status","97"],
        ["Disconnect","Becky Hill, Chase & Status","95"],
        ["Afterglow","Wilkinson","94"],
        ["Ready To Fly","Sub Focus, Dimension","93"],
        ["Desire","Sub Focus, Dimension","91"]
      ]
    },
    jazz:{
      prompt:"Dinner Jazz · 2 Stunden · elegant · warm · unobtrusive",
      title:"Dinner Jazz · Warm Evening",
      name:"Dinner Jazz · Elegant Flow",
      score:"95",
      tags:["36 Songs","120 Min","Jazz","68% bekannt"],
      tracks:[
        ["The Look of Love","Diana Krall","96"],
        ["Come Away With Me","Norah Jones","95"],
        ["My Funny Valentine","Chet Baker","94"],
        ["Feeling Good","Nina Simone","93"],
        ["Blue in Green","Miles Davis","91"]
      ]
    },
    pop:{
      prompt:"Pop Hits · 2 Stunden · upbeat · bekannte Songs · international",
      title:"Pop Hits · Feel Good",
      name:"Pop Hits · High Familiarity",
      score:"94",
      tags:["40 Songs","120 Min","Pop","90% bekannt"],
      tracks:[
        ["Espresso","Sabrina Carpenter","97"],
        ["Blinding Lights","The Weeknd","97"],
        ["As It Was","Harry Styles","96"],
        ["Levitating","Dua Lipa","95"],
        ["Flowers","Miley Cyrus","94"]
      ]
    }
  };

  function esc(value){
    return String(value).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c];
    });
  }

  function renderDemo(set){
    if(!set) return;
    const prompt = $("#demoPrompt");
    if(prompt) prompt.value = set.prompt;
    $("#demoTitle").textContent = set.title;
    $("#resultName").textContent = set.name;
    $("#resultScore").textContent = set.score;
    $("#resultMeta").innerHTML = set.tags.map(function(x){ return "<span>"+esc(x)+"</span>"; }).join("");
    $("#resultTracks").innerHTML = set.tracks.map(function(track,index){
      return '<div class="result-track"><b>'+String(index+1).padStart(2,"0")+'</b><div><strong>'+esc(track[0])+'</strong><small>'+esc(track[1])+'</small></div><em>'+esc(track[2])+'</em></div>';
    }).join("");
    $("#demoQuality").textContent = "QUALITY PASS";
    $("#resultFoot").textContent = "Dedupe aktiv · Artist-Limit aktiv · Flow sortiert";
  }

  function chooseSet(text){
    const input = String(text || "").toLowerCase();
    if(input.includes("schlager")) return demoSets.schlager;
    if(input.includes("rock") || input.includes("gitar")) return demoSets.rock;
    if(input.includes("drum") || input.includes("dnb")) return demoSets.dnb;
    if(input.includes("jazz") || input.includes("dinner")) return demoSets.jazz;
    if(input.includes("pop") || input.includes("charts")) return demoSets.pop;
    if(input.includes("afro") || input.includes("house")) return demoSets.afro;
    return {
      prompt:String(text || "Individuelle Playlist"),
      title:"AI Playlist · Custom Intent",
      name:"Individuelle Playlist · Preview",
      score:"92",
      tags:["AI Preview","Genre erkannt","Flow sortiert","Dedupe aktiv"],
      tracks:[
        ["Track Match 01","AI Search Result","96"],
        ["Track Match 02","AI Search Result","94"],
        ["Track Match 03","AI Search Result","93"],
        ["Track Match 04","AI Search Result","91"],
        ["Track Match 05","AI Search Result","90"]
      ]
    };
  }

  $$(".preset-row [data-demo]").forEach(function(button){
    button.addEventListener("click", function(){
      $$(".preset-row [data-demo]").forEach(function(b){ b.classList.remove("active"); });
      button.classList.add("active");
      renderDemo(demoSets[button.dataset.demo]);
    });
  });

  const demoRun = $("#demoRun");
  if(demoRun){
    demoRun.addEventListener("click", function(){
      const input = $("#demoPrompt").value.trim();
      if(!input){ $("#demoPrompt").focus(); return; }
      $$(".preset-row [data-demo]").forEach(function(b){ b.classList.remove("active"); });
      $("#demoQuality").textContent = "ANALYSING…";
      window.setTimeout(function(){ renderDemo(chooseSet(input)); }, 420);
    });
  }

  const demoPrompt = $("#demoPrompt");
  if(demoPrompt){
    demoPrompt.addEventListener("keydown", function(event){
      if((event.metaKey || event.ctrlKey) && event.key === "Enter"){
        event.preventDefault();
        demoRun.click();
      }
    });
  }

  const fakeCreate = $("#fakeCreate");
  if(fakeCreate){
    fakeCreate.addEventListener("click", function(){
      $("#demoQuality").textContent = "DEMO · READ ONLY";
      $("#resultFoot").textContent = "Keine Spotify-Daten verändert · Produktivsystem separat öffnen";
    });
  }

  function setHealth(ok, latency){
    const state = ok ? "Spotify System live" : "Live-System verfügbar";
    const shortState = ok ? "Online" : "Verfügbar";
    if($("#navHealth")) $("#navHealth").textContent = ok ? "Live" : "Status";
    if($("#heroHealth")) $("#heroHealth").textContent = state;
    if($("#floatHealth")) $("#floatHealth").textContent = shortState;
    if($("#floatLatency")) $("#floatLatency").textContent = latency ? "Healthcheck · "+latency+" ms" : "Read-only Healthcheck";
  }

  (function checkHealth(){
    const started = performance.now();
    fetch("https://spotify.kitzlabs.ai/api/health",{method:"GET",mode:"cors",cache:"no-store"})
      .then(function(response){
        if(!response.ok) throw new Error("offline");
        return response.text();
      })
      .then(function(){
        setHealth(true,Math.max(1,Math.round(performance.now()-started)));
      })
      .catch(function(){
        setHealth(false,null);
      });
  })();

  const revealItems = $$(".reveal");
  if("IntersectionObserver" in window){
    const observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          const delay = parseInt(entry.target.getAttribute("data-delay") || "0",10);
          window.setTimeout(function(){ entry.target.classList.add("in"); },delay);
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.08});
    revealItems.forEach(function(el){ observer.observe(el); });
  }else{
    revealItems.forEach(function(el){ el.classList.add("in"); });
  }

  renderDemo(demoSets.afro);
})();