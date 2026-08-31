# Stage 1: Build React application with Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source code
COPY . .

# Environment variable for Vite API URL
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build production dist folder
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Clean default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy static built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
