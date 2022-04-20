FROM node:lts-alpine AS builder

ARG VUE_APP_BACKEND

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN echo VUE_APP_BACKEND=$VUE_APP_BACKEND >> .env.local
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
