# KI Spotify Agent — Product Website V4

Fast SaaS Produktwebsite für den bestehenden KI Spotify Agent von AI Kitz.

## Live
- Product Website: https://kispotify.kitzlabs.ai/
- Product App: https://spotify.kitzlabs.ai/
- Repository: kitz-labs/kispotify-product-site
- Architektur: statische HTML/CSS/JS-Site + streng begrenzte Nginx Live-API-Proxies

## V4 Upgrade · 2026-09-29
- Fast-SaaS Informationsarchitektur und Conversion Flow
- Live System Dashboard aus dem laufenden KI Spotify Agent
- Live Health, Playlist-/Automation-Stats und Now-Playing Context
- echte AI Playlist Preview über sicheren Preview-only Proxy
- kein Create-/Delete-/Playback-Write-Endpunkt auf der Product Website
- Live/Local Demo Toggle mit Fallback
- Pricing mit Monats-/Jahres-Toggle
- Core: ab €49/Monat + Setup ab €299
- Pro: ab €129/Monat + Setup ab €690
- Hospitality: ab €249/Monat + Setup ab €1.490
- Enterprise: individuell
- AI Solution Configurator
- B2B Onboarding
- Live Lead-Formular mit direkter AI-Kitz-Weiterleitung
- responsive Desktop / Tablet / iPhone
- SEO / PWA / Accessibility / Reduced Motion

## Live API Boundary
Die Product Website stellt ausschließlich folgende Same-Origin-Endpunkte bereit:
- GET /live/health
- GET /live/stats
- GET /live/now-playing
- POST /live/preview
- POST /live/contact

Nicht exponiert:
- Playlist Create
- Playlist Delete
- Playback Actions
- Spotify OAuth
- Admin APIs

## Pricing
Preise auf der Website sind B2B-Netto-Startpreise zzgl. USt. Jahresabrechnung zeigt einen um 15% reduzierten monatlichen Gegenwert.

## Deployment
Source:
- /prosystem/Projects/Websites/KiSpotify-Product-Site/

Live:
- /var/www/kispotify.kitzlabs.ai/

Nginx:
- /etc/nginx/sites-available/kispotify.kitzlabs.ai.conf

## Rollback
Pre-V4 Backups:
- backups/index.html.pre-v4-20260929.bak
- backups/styles.css.pre-v4-20260929.bak
- backups/app.js.pre-v4-20260929.bak
- backups/README.md.pre-v4-20260929.bak
- /etc/nginx/sites-available/kispotify.kitzlabs.ai.conf.pre-v4-20260929.bak
