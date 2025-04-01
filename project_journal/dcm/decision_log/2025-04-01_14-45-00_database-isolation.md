---
Timestamp: 2025-04-01 12:45:00 UTC
Mode: technical-architect
Event: DECISION
---

**Context:** Multi-guild Database Isolatie Strategie

**Details:**
Besloten om schema-based isolation te implementeren voor de multi-guild architectuur van DCM.

**Implementatie Aanpak:**
1. Elk guild krijgt een eigen PostgreSQL schema
2. Naming convention: `guild_${guild_id}`
3. Centrale `public` schema voor globale tabellen
4. Dynamische schema routing via middleware

**Database Structure:**
```sql
-- Public schema (gedeeld)
CREATE TABLE guilds (
    id UUID PRIMARY KEY,
    discord_id TEXT UNIQUE,
    name TEXT,
    settings JSONB,
    created_at TIMESTAMP
);

-- Per Guild Schema
CREATE SCHEMA guild_${guild_id};

-- Voorbeeld tabellen in guild schema
CREATE TABLE guild_${guild_id}.tasks (
    id UUID PRIMARY KEY,
    title TEXT,
    description TEXT,
    assigned_to UUID,
    due_date TIMESTAMP,
    created_at TIMESTAMP
);
```

**Rationale:**
1. **Isolatie:**
   - Complete data isolatie tussen guilds
   - Geen risico op data leaks tussen guilds
   - Makkelijker toegangscontrole op schema niveau

2. **Performance:**
   - Efficiënte queries binnen guild context
   - Betere index effectiviteit
   - Kleinere tables per guild = snellere scans

3. **Beheer:**
   - Eenvoudige backup/restore per guild
   - Makkelijk guild data archiveren/verwijderen
   - Flexibiliteit in schema evolutie per guild

4. **Schaalbaarheid:**
   - Horizontale partitionering mogelijk
   - Toekomstige migratie naar aparte databases mogelijk
   - Effectieve query planning per guild

**Alternatieven Overwogen:**
1. **Row-Level Security (RLS):**
   - Pro: Eenvoudiger initiële setup
   - Con: Performance overhead
   - Con: Complexere backup/restore per guild
   - Con: Minder flexibiliteit in schema evolutie

2. **Aparte Databases:**
   - Pro: Maximale isolatie
   - Con: Resource overhead
   - Con: Complexer connection management
   - Con: Duurder in hosting

**Impact:**
1. **Development:**
   - Middleware nodig voor dynamische schema routing
   - Extra test complexiteit voor multi-guild scenarios
   - Specifieke migration strategie nodig

2. **Operations:**
   - Schema management automation nodig
   - Backup strategie per guild mogelijk
   - Monitoring op schema niveau nodig

**Next Steps:**
1. Implementeer schema management service
2. Ontwikkel migration tooling
3. Setup monitoring per schema
4. Documenteer schema creation flow

---