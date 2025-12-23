FROM node:22-alpine

WORKDIR /app

# Sharp benötigt diese Pakete
RUN apk add --no-cache libc6-compat

# Dependencies installieren
COPY package*.json ./
RUN npm ci --omit=dev

# Source kopieren und builden
COPY . .
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "server.mjs"]

