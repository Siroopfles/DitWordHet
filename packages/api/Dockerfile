# Stage 1: Development
FROM node:18-alpine as development

WORKDIR /app

# Installeer development dependencies
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/
COPY packages/shared/package*.json ./packages/shared/
RUN npm install

# Kopieer source code
COPY packages/api ./packages/api
COPY packages/shared ./packages/shared

# Start development server met hot-reloading
CMD ["npm", "run", "--prefix", "packages/api", "dev"]

# Stage 2: Builder
FROM node:18-alpine as builder

WORKDIR /app

# Installeer dependencies
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci

# Kopieer en build source code
COPY tsconfig.json ./
COPY packages/api ./packages/api
COPY packages/shared ./packages/shared
RUN npm run --prefix packages/shared build && \
    npm run --prefix packages/api build

# Stage 3: Production
FROM node:18-alpine as production

WORKDIR /app

# Installeer alleen production dependencies
COPY package*.json ./
COPY packages/api/package*.json ./packages/api/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci --only=production

# Kopieer gecompileerde code van builder
COPY --from=builder /app/packages/api/dist ./packages/api/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose API port
EXPOSE 3000

# Start production server
CMD ["node", "packages/api/dist/index.js"]