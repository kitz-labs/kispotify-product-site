# KI Spotify Agent — Product Website V6.6

Premium Customer-facing SaaS Product Website für den KI Spotify Agent von AI Kitz.

## Live
- Product Website: https://kispotify.kitzlabs.ai/
- Product App: https://spotify.kitzlabs.ai/
- Guest Wish Demo: https://kispotify.kitzlabs.ai/guest-wish.html

## V6.6 · Premium Interactive SaaS Experience · 2026-09-29
- komplett customer-facing; keine Admin-/Backend-Inhalte im sichtbaren Frontend
- neuer Cinematic Hero mit Product Window, Floating Cards und Guest Wish Toast
- interaktiver Venue Selector für Bar, Hotel, Restaurant und Event
- scroll-gesteuerte Product Tour mit 6 Produktzuständen
- Live Views für Playlist, Live Music, Tagesphasen und Gäste-Wünsche
- Popular Features mit QR Wishes, Dayparts und Event Mode
- Feature-Detail-Modals statt überladener Startseite
- echtes QR Guest Wish Demo UI
- statische V6-WebP-Poster werden reproduzierbar aus dem GitHub/FFmpeg-Video-Workflow erzeugt
- animierter QR/Hospitality Produktclip als lokales H.264 MP4 mit CSS-Fallback für Browser ohne Videowiedergabe
- große interaktive Music Timeline
- Event Override Visual
- Vorher/Nachher Vergleich
- Live KI Preview über begrenzten Preview-Endpunkt
- Paket-Finder
- Core / Pro / Hospitality / Enterprise Pricing
- Feature-Vergleich
- Onboarding, FAQ und Lead-Funnel
- pointer-based Hero Parallax, Track Cascade, Scan-Line, Floating Toasts, Scroll Reveal
- prefers-reduced-motion Support
- responsive Desktop / Tablet / Mobile
- OpenGraph / Twitter Social Preview mit V6 Hero Asset
- zugängliche Feature-Modals mit Fokusführung und Escape/Tab-Handling

## Pricing
- Core ab €49/Monat + Setup ab €299
- Pro ab €129/Monat + Setup ab €690
- Hospitality ab €249/Monat + Setup ab €1.490
- Enterprise individuell
- jährliche Abrechnung: 15% reduzierter monatlicher Gegenwert

Alle Preise netto zzgl. USt.

## V6 Assets
- /assets/v6/qr-guest-hero.webp
- /assets/v6/hospitality-rooftop.webp
- /assets/v6/qr-guest-wishes-v6.mp4
- /assets/v6/product-film-v6.mp4
- /assets/v6/daypart-timeline-v6.mp4
- /assets/v5/guest-wish-qr.svg

## Safety
Die Produktwebsite darf keine Spotify-Playlist direkt erstellen, löschen oder Playback verändern. Die Live-Demo nutzt ausschließlich den Preview-Modus.

## Deployment
Source:
- /prosystem/Projects/Websites/KiSpotify-Product-Site/

Live:
- /var/www/kispotify.kitzlabs.ai/

## Rollback
Pre-V6 Backups:
- backups/index.html.pre-v6-20260929.bak
- backups/styles.css.pre-v6-20260929.bak
- backups/app.js.pre-v6-20260929.bak
- backups/README.md.pre-v6-20260929.bak
- backups/guest-wish.html.pre-v6-20260929.bak


## Research & Motion Decisions
Für V6 wurden aktuelle Open-Source- und Model-Quellen geprüft:
- Hugging Face: Qwen/Qwen-Image (Apache-2.0) für Image-Pipeline-Recherche
- Hugging Face: Wan-AI/Wan2.2-T2V-A14B (Apache-2.0) für Video-Pipeline-Recherche
- GitHub: motiondivision/motion (MIT)
- GitHub: darkroomengineering/lenis (MIT)
- GitHub: nolimits4web/swiper (MIT)
- GitHub: airbnb/lottie-web (MIT)

Die Website lädt diese Bibliotheken nicht als Runtime-Abhängigkeiten. Die Motion-Patterns wurden als Referenz geprüft; V6 nutzt bewusst native CSS-Animationen, IntersectionObserver und Pointer-Interaktionen, damit die Produktseite schnell, robust und dependency-arm bleibt.

## Customer-facing Boundary
Im sichtbaren Frontend werden nur Funktionen erklärt, die ein Kunde verstehen und bewerten soll: Playlist AI, Live Music, Tagesphasen, Events, QR Gäste-Wünsche, Musikprofile, Zonen, Remote Control, Pakete und Onboarding. Interne Admin-, Token-, API-, Debug- und Backend-Ansichten bleiben vollständig ausgeblendet.


## Media Policy
- OpenArt is not used by the V6 media pipeline or the live website runtime.
- Video assets and motion references must come from GitHub-based tooling/workflows or Hugging Face models.
- The live website keeps a native CSS/JS animated fallback so the customer experience never depends on an external video service.


## V6 Motion Layer
- zentraler Showcase mit 10s Product Flow, 8s QR Guest Wish und 10s Daypart/Timeline Film
- Videos: H.264 / yuv420p / 1280x720 / faststart
- Wiedergabe wird viewport-basiert gestartet und pausiert, um Mobile-Performance zu schonen
- prefers-reduced-motion wird respektiert
- native CSS/JS Fallbacks bleiben aktiv
- Render-Workflow verwendet FFmpeg/Open-Source-Tooling; OpenArt ist ausgeschlossen


## Reproducible Video Pipeline
- Renderer script: `tools/render-v6-videos.sh`
- Pipeline documentation: `docs/V6_MEDIA_PIPELINE.md`
- Machine-readable asset manifest: `assets/v6/media-manifest.json`
- Upstream renderer: FFmpeg / GitHub repository `FFmpeg/FFmpeg`


## V6.6 Media Origin
- Videos und Poster werden reproduzierbar über den Repository-Workflow erzeugt.
- Renderer: FFmpeg / upstream GitHub repository `FFmpeg/FFmpeg`.
- Posters werden aus den finalen Videos extrahiert; keine OpenArt-Runtime oder OpenArt-Generierung ist Teil der V6.6 Pipeline.
- QR Hero Poster: Frame aus `qr-guest-wishes-v6.mp4`.
- Hospitality Poster: Frame aus `product-film-v6.mp4`.
