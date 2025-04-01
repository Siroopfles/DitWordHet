# Discord Cleaning Manager - Project Requirements

## 1. Systeemoverzicht

### 1.1 Kerncomponenten
- Discord Bot voor directe interactie
- Webdashboard voor uitgebreid beheer
- REST API + WebSocket backend
- PostgreSQL database
- Multi-guild architectuur met strikte data-isolatie

### 1.2 Technische Stack
- Backend: Node.js
- Frontend: React
- Database: PostgreSQL
- Hosting: Docker containers
- API: REST + WebSockets

## 2. Multi-Guild Architectuur

### 2.1 Guild-specifieke Data (Geïsoleerd)
- Taken en taakgeschiedenis
- Permissies en rollen
- Guild-specifieke configuraties
- Notificatie-instellingen
- Statistieken en rapportages
- Categorieën en labels
- Gebruikersinstellingen per guild

### 2.2 Globale Data
- Discord User IDs (als unieke identifier)
- Minimale gebruikersprofieldata
- Systeem-brede configuraties

### 2.3 Data Isolatie Principes
- Elke Discord guild heeft eigen geïsoleerde database schema
- Alle queries moeten guild_id bevatten
- Geen cross-guild data toegang
- Strikte validatie op guild-niveau toegang

## 3. Functionale Requirements

### 3.1 Discord Bot Commands
- /task create - Nieuwe taak aanmaken
- /task list - Overzicht van taken bekijken
- /task update - Bestaande taak wijzigen
- /task delete - Taak verwijderen

### 3.2 Webdashboard Features
- Takenweergave
- Kanban board voor taakbeheer
- Kalenderweergave (dag, week, maand, aangepast)
- Guild-selectie interface
- Per-guild admin configuratiepaneel
- Guild-specifieke statistieken

### 3.3 Notificaties & Reminders
- Dagelijkse/wekelijkse taakoverzichten in Discord DMs
- Automatische reminders X uur voor deadline
- Aanpasbare notificatie-intervallen
- Visuele indicatie voor naderende deadlines
- In-app notificatiecentrum
- Escalatie bij geen reactie
- Verschillende notificatiekanalen (DM/channel/email)

### 3.4 Geavanceerd Takenbeheer
- Herhaalde taken (dagelijks, wekelijks, maandelijks)
- Automatisch opnieuw toewijzen van niet-voltooide taken
- Import/export functionaliteit (CSV/JSON)
- Slimme suggesties voor eerlijke taakverdeling
- Automatisch laten verlopen van niet-tijdig opgepakte taken

### 3.5 Permissiesysteem
Per Discord guild configureerbaar:
- Taken aanmaken/bewerken/verwijderen
- Taken toewijzen aan anderen
- Taken bekijken (alle/alleen eigen)
- Dashboard toegang
- Reminder instellingen aanpassen
- Statistieken bekijken

## 4. Project Structuur
1. Monorepo aanpak met de volgende hoofdcomponenten:
   - /packages/backend (Node.js API server)
   - /packages/discord-bot (Discord.js bot)
   - /packages/frontend (React dashboard)
   - /packages/shared (Gedeelde types/utilities)

2. Development Configuratie:
   - TypeScript voor alle packages
   - ESLint + Prettier
   - Jest voor testing
   - Docker Compose setup
   - Development scripts in root package.json

3. CI/CD Configuratie:
   - GitHub Actions workflows
   - Docker build configuratie
   - Development/Staging/Production ondersteuning

## 5. Implementatie Prioriteiten

### Fase 1
1. Multi-guild database architectuur
2. Basis Discord bot met guild-isolatie
3. Guild-specifieke permissies

### Fase 2
1. Webdashboard met guild-selectie
2. Guild-specifieke notificaties
3. Per-guild configuratie opties

### Fase 3
1. Guild-specifieke statistieken
2. Guild-geïsoleerde kalender integratie
3. Mobiele optimalisatie

### Fase 4
1. Per-guild gamification
2. Guild-specifieke API toegang
3. Geavanceerde automatisering per guild

## 6. Kernprincipes
- Modulaire structuur voor eenvoudige uitbreiding
- Makkelijk toevoegen van nieuwe features
- Uitgebreide auditlogging van alle acties
- Server-specifieke configuraties
- Strikte data-isolatie tussen guilds
- Hoge performance en schaalbaarheid