
FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm build


FROM node:24-alpine AS production

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod --ignore-scripts

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src/db/migrations ./src/db/migrations

EXPOSE 3000

CMD ["sh", "-c", "node dist/db/migrate.js && node dist/server.js"]