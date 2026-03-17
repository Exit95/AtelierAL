##################################
# Stage 1: Build
##################################
FROM node:22-alpine AS builder

WORKDIR /app

# Sharp and better-sqlite3 require native dependencies
RUN apk add --no-cache libc6-compat python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

##################################
# Stage 2: Production Runtime
##################################
FROM node:22-alpine

WORKDIR /app

# Runtime dependencies for sharp and better-sqlite3
RUN apk add --no-cache libc6-compat

# Copy built artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.mjs ./

# Create directories for persistent data
RUN mkdir -p /app/data /app/uploads

# Non-root user for security
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001 && \
    chown -R appuser:appuser /app

USER appuser

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "server.mjs"]
