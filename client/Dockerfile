# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY index.html vite.config.ts tsconfig*.json components.json ./
COPY public ./public
COPY src ./src

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN pnpm build

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/templates/http.conf
COPY nginx.https.conf /etc/nginx/templates/https.conf
COPY docker-entrypoint.d/99-nexus-nginx-config.sh /docker-entrypoint.d/99-nexus-nginx-config.sh
RUN chmod +x /docker-entrypoint.d/99-nexus-nginx-config.sh
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
