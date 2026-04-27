# ---- Builder ----
FROM node:25-alpine3.22 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

ARG NEXT_PUBLIC_FPJS_API_KEY
ENV NEXT_PUBLIC_FPJS_API_KEY=$NEXT_PUBLIC_FPJS_API_KEY

COPY . .
RUN pnpm run build


# ---- Runner ----
FROM node:25-alpine3.22 as runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
