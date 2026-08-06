FROM node:24-alpine AS base

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:24-alpine

RUN corepack enable

WORKDIR /app

COPY --from=base /app/package.json .
COPY --from=base /app/pnpm-lock.yaml .
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/index.js"]