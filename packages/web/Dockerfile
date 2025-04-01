# Stage 1: Development
FROM node:18-alpine as development

WORKDIR /app

# Installeer development dependencies
COPY package*.json ./
COPY packages/web/package*.json ./packages/web/
COPY packages/shared/package*.json ./packages/shared/
RUN npm install

# Kopieer source code
COPY packages/web ./packages/web
COPY packages/shared ./packages/shared

# Start development server met hot-reloading
CMD ["npm", "run", "--prefix", "packages/web", "dev"]

# Stage 2: Builder
FROM node:18-alpine as builder

WORKDIR /app

# Installeer dependencies
COPY package*.json ./
COPY packages/web/package*.json ./packages/web/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci
# Kopieer en build source code
COPY tsconfig.json ./
COPY packages/web ./packages/web
COPY packages/shared ./packages/shared
RUN npm run --prefix packages/web build


# Stage 3: Production
FROM nginx:alpine as production

# Kopieer nginx configuratie
COPY packages/web/nginx.conf /etc/nginx/conf.d/default.conf

# Kopieer gecompileerde frontend van builder
COPY --from=builder /app/packages/web/dist /usr/share/nginx/html

# Set production environment
ENV NODE_ENV=production

# Start nginx
CMD ["nginx", "-g", "daemon off;"]