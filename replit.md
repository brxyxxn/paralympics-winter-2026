# Brasil nas Paralimpiadas de Inverno - Milano Cortina 2026

## Overview
Single-page informational website about Brazil's participation in the 2026 Winter Paralympic Games in Milano Cortina, Italy. Similar structure to the Olympics version (olimpiadas-milano) but with a teal/green color scheme inspired by the Paralympic movement.

## Architecture
- Frontend-only app (no database needed - static content)
- React + Vite + TypeScript
- Tailwind CSS with custom teal/green theme
- Framer Motion for animations
- Wouter for routing

## Pages
- `/` - Main page with all sections (Home component at `client/src/pages/home.tsx`)

## Sections
1. **Header** - Sticky nav with smooth scroll links
2. **Hero** - Gradient background with stats (8 athletes, 3 sports, 1st Biathlon)
3. **Athletes** - Grid of 8 athlete cards with sport filters
4. **Schedule** - Day-by-day event schedule with times/locations
5. **Fun Facts** - Curiosities about each athlete
6. **History** - Timeline of Brazil in Winter Paralympics (2014-2026)
7. **Footer** - Links to Paralympic.org and CPB

## Color Scheme
- Primary: Teal (170 65% 35% light / 170 65% 45% dark)
- Accent colors: Red, Blue, Green (Paralympic Agitos colors)
- Hero gradient: teal-900 to emerald-900

## Key Data
- 8 athletes: Cristian Ribera, Aline Rocha, Andre Barbieri, Wellington Silva, Elena Sena, Guilherme Cruz Rocha, Robelson Lula, Vitoria Machado
- 3 sports: Cross-Country Skiing, Biathlon, Snowboard
- Dates: March 6-15, 2026
