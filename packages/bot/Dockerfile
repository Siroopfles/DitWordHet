# Stage 1: Development
FROM node:18-alpine as development

WORKDIR /app

# Installeer development dependencies
COPY package*.json ./
COPY packages/bot/package*.json ./packages/bot/
COPY packages/shared/package*.json ./packages/shared/
RUN npm install

# Kopieer source code
COPY packages/bot ./packages/bot
COPY packages/shared ./packages/shared

# Start development server met hot-reloading
CMD ["npm", "run", "--prefix", "packages/bot", "dev"]

# Stage 2: Builder
FROM node:18-alpine as builder

WORKDIR /app

# Installeer dependencies
COPY package*.json ./
COPY packages/bot/package*.json ./packages/bot/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci

# Kopieer en build source code
COPY tsconfig.json ./
COPY packages/bot ./packages/bot
COPY packages/shared ./packages/shared
RUN npm run --prefix packages/shared build && \
    npm run --prefix packages/bot build

# Stage 3: Production
FROM node:18-alpine as production

WORKDIR /app

# Installeer alleen production dependencies
COPY package*.json ./
COPY packages/bot/package*.json ./packages/bot/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci --only=production

# Kopieer gecompileerde code van builder
COPY --from=builder /app/packages/bot/dist ./packages/bot/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

# Set production environment
ENV NODE_ENV=production

# Start production server
CMD ["node", "packages/bot/dist/index.js"]