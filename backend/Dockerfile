FROM node:20-alpine

# Install openssl and libc6-compat for Prisma engine on Alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source code and Prisma schema
COPY . .

# Generate Prisma client inside container for Alpine architecture
RUN npx prisma generate

# Set execution rights for entrypoint script
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 5000

ENV NODE_ENV=production

ENTRYPOINT ["./docker-entrypoint.sh"]
