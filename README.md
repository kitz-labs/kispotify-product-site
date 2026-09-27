# KI Spotify Product Site

Separate Produkt-Landingpage für den bestehenden Spotify AI Agent.

## Live
- Produktseite: https://kispotify.kitzlabs.ai/
- Produktiv-App: https://spotify.kitzlabs.ai/
- Typ: statische, eigenständige HTML-Landingpage
- Design: Dark Premium / Sora / #080908 / AI-Kitz Rot / Spotify-Grün
- Abhängigkeiten: Google Fonts; kein Build-System

## Upgrade 2026-09-27
- komplett überarbeitete Hero- und Produktdarstellung
- Live-System-Healthcheck mit gemessener Browser-Latenz
- interaktive Multi-Genre Playlist-Demo
- sichtbare Intent → Search → Validate → Flow Pipeline
- interaktive Produkt-Tour für Playlist Engine, Auto-DJ, Event Radar und Integrationen
- Hospitality-Daypart-Demo
- Quality / Guardrail Erklärung
- erweiterte Feature-Sektion und FAQ
- Mobile Sticky CTA
- Accessibility-Verbesserungen: Skip-Link, Focus States, ARIA Live, Keyboard Enter
- SEO: Canonical, OpenGraph, Twitter Meta, SoftwareApplication JSON-LD
- responsive Layout für Desktop, Tablet und iPhone
- Reduced-Motion Support

## Safety
Die Produktseite ist vom produktiven Spotify-Agent getrennt. Sie schreibt keine Playlist-Daten und greift nur lesend auf den öffentlichen Health-Endpunkt zu.

## Deployment
Source:
`/prosystem/Projects/Websites/KiSpotify-Product-Site/index.html`

Live:
`/var/www/kispotify.kitzlabs.ai/index.html`

Nginx liefert die Live-Datei statisch aus.

## Backup
Vor dem Upgrade wurde eine lokale Kopie abgelegt:
- Source: `/prosystem/Projects/Websites/KiSpotify-Product-Site/backups/index.pre-upgrade-20260927.html`
- Live: `/var/www/kispotify.kitzlabs.ai/backups/index.pre-upgrade-20260927.html`
