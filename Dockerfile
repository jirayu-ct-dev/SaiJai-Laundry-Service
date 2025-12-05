# --- Build Stage ---
FROM oven/bun:1.1.37-alpine AS builder
# Install Node.js 24 for compatibility
RUN apk add --no-cache nodejs-current
WORKDIR /app
# Copy package files
COPY package.json bun.lockb ./
# Install dependencies with Bun
RUN bun install --frozen-lockfile
# Copy source code
COPY . .
# Generate Prisma Client (important for Prisma projects)
RUN bunx prisma generate
# Build Nuxt application
RUN bun run build
# --- Production Stage ---
FROM oven/bun:1.1.37-alpine AS runner
# Install Node.js 24
RUN apk add --no-cache nodejs-current
WORKDIR /app
# Copy built output and node_modules
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Copy Prisma schema for runtime
COPY --from=builder /app/prisma ./prisma
ENV NODE_ENV=production
EXPOSE 3000
# Start with Bun
CMD ["bun", "run", ".output/server/index.mjs"]