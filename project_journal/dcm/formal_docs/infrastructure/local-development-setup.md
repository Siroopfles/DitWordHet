# Discord Cleaning Manager - Local Development Setup Guide

## Vereisten

### Software Dependencies
- Docker Desktop (20.10+)
- Node.js (18 LTS)
- Git
- Visual Studio Code (aanbevolen)
- Minikube (optioneel, voor K8s development)

### VSCode Extensions
- ESLint
- Prettier
- Docker
- Kubernetes
- Remote Containers

## Development Omgeving Setup

### 1. Repository Setup
```bash
# Clone de repository
git clone [repository-url]
cd discord-cleaning-manager

# Installeer dependencies
npm install
```

### 2. Environment Configuratie

Maak een `.env` bestand aan in de root:
```env
# Discord Bot Settings
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret

# Database Settings
POSTGRES_USER=dcm_user
POSTGRES_PASSWORD=development_only
POSTGRES_DB=dcm_development

# Redis Settings
REDIS_URL=redis://redis:6379
```

### 3. Docker Compose Setup

Het project gebruikt Docker Compose voor de lokale ontwikkelomgeving. Start de services met:

```bash
# Start alle services
docker compose up -d

# Bekijk logs
docker compose logs -f

# Stop services
docker compose down
```

De volgende services worden gestart:

- PostgreSQL (localhost:5432)
- Redis (localhost:6379)
- API Gateway (localhost:3000)
- Frontend (localhost:3001)
- Discord Bot
- Monitoring stack

### 4. Database Setup

```bash
# Maak database aan
docker compose exec postgres createdb -U dcm_user dcm_development

# Run migraties
npm run db:migrate

# Seed test data
npm run db:seed
```

### 5. Development Workflow

#### Services Starten
```bash
# Start development mode
npm run dev

# Start specifieke service
npm run dev:api
npm run dev:bot
npm run dev:web
```

#### Hot Reloading
Alle services zijn geconfigureerd met hot reloading:
- Frontend: Vite met HMR
- Backend: Nodemon
- Bot: Nodemon

#### Database Management
```bash
# Create migration
npm run db:migration:create name_of_migration

# Run migrations
npm run db:migrate

# Rollback migration
npm run db:migrate:undo
```

#### Testen
```bash
# Run alle tests
npm test

# Test specifieke service
npm run test:api
npm run test:bot
npm run test:web

# Run tests in watch mode
npm run test:watch
```

## Docker Compose Configuratie

### Services Overzicht

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: dcm_user
      POSTGRES_PASSWORD: development_only
      POSTGRES_DB: dcm_development
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  api:
    build:
      context: .
      dockerfile: packages/api/Dockerfile
      target: development
    volumes:
      - ./packages/api:/app/packages/api
      - ./packages/shared:/app/packages/shared
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis

  bot:
    build:
      context: .
      dockerfile: packages/bot/Dockerfile
      target: development
    volumes:
      - ./packages/bot:/app/packages/bot
      - ./packages/shared:/app/packages/shared
    depends_on:
      - api

  web:
    build:
      context: .
      dockerfile: packages/web/Dockerfile
      target: development
    volumes:
      - ./packages/web:/app/packages/web
      - ./packages/shared:/app/packages/shared
    ports:
      - "3001:3001"
    depends_on:
      - api

volumes:
  postgres_data:
  redis_data:
```

## Development Tools

### Database Management
- GUI Tools:
  - DBeaver
  - pgAdmin 4
- CLI Tools:
  - psql
  - pg_dump/pg_restore

### API Development
- Postman/Insomnia voor API testing
- SwaggerUI op `localhost:3000/api-docs`

### Monitoring
- Prometheus: `localhost:9090`
- Grafana: `localhost:3000`
- Kibana: `localhost:5601`

## Common Development Tasks

### 1. Guild Schema Management

```bash
# Create new guild schema
npm run db:create-guild-schema [guild_id]

# List all guild schemas
npm run db:list-guild-schemas

# Drop guild schema
npm run db:drop-guild-schema [guild_id]
```

### 2. Discord Bot Commands

```bash
# Register slash commands
npm run bot:register-commands

# Update slash commands
npm run bot:update-commands

# Remove slash commands
npm run bot:remove-commands
```

### 3. Database Seeding

```bash
# Seed development data
npm run db:seed

# Seed specific guild
npm run db:seed-guild [guild_id]

# Reset development data
npm run db:reset
```

## Troubleshooting

### 1. Database Connectie Issues
```bash
# Check database status
docker compose ps postgres

# Reset database
docker compose down
docker volume rm dcm_postgres_data
docker compose up -d
```

### 2. Redis Issues
```bash
# Clear Redis data
docker compose exec redis redis-cli FLUSHALL

# Check Redis connectivity
docker compose exec redis redis-cli PING
```

### 3. API Gateway Issues
```bash
# Check logs
docker compose logs -f api

# Restart service
docker compose restart api
```

### 4. Container Issues
```bash
# Rebuild containers
docker compose build --no-cache

# Reset all containers
docker compose down
docker compose up -d --force-recreate
```

## Best Practices

### 1. Code Style
- ESLint configuratie wordt automatisch toegepast
- Prettier wordt aangeroepen voor commits
- Git hooks zijn geconfigureerd via Husky

### 2. Git Workflow
- Feature branches vanaf `develop`
- Pull requests voor alle changes
- Squash merges naar `develop`
- Semantic commit messages

### 3. Testing
- Unit tests voor nieuwe features
- Integration tests voor API endpoints
- E2E tests voor kritieke flows
- Test coverage rapportage

### 4. Documentation
- API documentatie via Swagger
- README updates voor nieuwe features
- Technische documentatie in `/docs`
- Inline code comments waar nodig

## Support

Voor development support:
1. Check de `/docs` directory
2. Raadpleeg het development team in Discord
3. Submit een issue in de repository