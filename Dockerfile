FROM node:lts-alpine3.16 AS dependencies
RUN apk add --no-cache libc6-compat=1.2.3-r0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:lts-alpine3.16 AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:lts-alpine3.16 AS production
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs \ 
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 80
ENV PORT 80
CMD ["node", "server.js"]
