# KI Spotify Product Site

Professionelle Produktwebsite für den bestehenden KI Spotify Agent von AI Kitz.

## Live
- Produktwebsite: https://kispotify.kitzlabs.ai/
- Produktiv-App: https://spotify.kitzlabs.ai/
- Repository: kitz-labs/kispotify-product-site
- Typ: statische, modulare Produktwebsite ohne Build-Schritt

## Professional AI Website · Upgrade 2026-09-27
- komplette Neugestaltung als Premium AI Product Website
- neue Hero Experience mit AI Music Console Mockup
- Dark Premium Visual System mit AI Kitz Rot und Spotify Grün
- interaktive Multi-Genre Playlist-Demo
- sichtbarer Intent → Search → Validate → Flow Prozess
- AI Playlist Engine, Preview-First Quality Gate, Auto-DJ und Event Radar
- Hospitality Daypart Automation
- modular dargestellte Systemarchitektur
- Integrationsübersicht
- Use Cases für Bars, Clubs, Restaurants, Hotels, Events und Teams
- Quality / Control Guardrails
- FAQ und starke CTAs
- Live Read-only Healthcheck zu spotify.kitzlabs.ai
- Mobile Navigation + Sticky Mobile CTA
- Responsive Desktop / Tablet / iPhone Layout
- Accessibility: Skip Link, Focus States, ARIA, Reduced Motion
- SEO: Canonical, OpenGraph, Twitter Meta, SoftwareApplication JSON-LD
- PWA Basis mit Manifest und App Icon
- robots.txt + sitemap.xml

## Dateien
- index.html
- styles.css
- app.js
- manifest.webmanifest
- icon.svg
- robots.txt
- sitemap.xml

## Safety
Die Produktwebsite ist vom produktiven Spotify-Agent getrennt. Die Browser-Demo schreibt keine Playlist-Daten. Der Live-Status liest ausschließlich den öffentlichen Health-Endpunkt.

## Deployment
Source:
- /prosystem/Projects/Websites/KiSpotify-Product-Site/

Live:
- /var/www/kispotify.kitzlabs.ai/

Nginx liefert die Live-Dateien statisch über HTTPS aus.

## Rollback
Backup vor dieser Neugestaltung:
- Source: /prosystem/Projects/Websites/KiSpotify-Product-Site/backups/index.pre-professional-ai-site-20260927.html
- Live: /var/www/kispotify.kitzlabs.ai/backups/index.pre-professional-ai-site-20260927.html
