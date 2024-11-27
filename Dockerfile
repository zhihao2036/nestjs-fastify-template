###################
# BUILD FOR PRODUCTION
###################
FROM node:18-slim As build

WORKDIR /usr/src/app

RUN corepack enable pnpm

COPY . .

ENV NODE_ENV production

# RUN pnpm --registry=http://registry.npmmirror.com install
RUN pnpm install

RUN pnpm build

###################
# PRODUCTION
###################
FROM node:18-slim As production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist

COPY ./.env.prod .

ENV NODE_ENV production

EXPOSE 8080

CMD [ "node", "dist/main.js" ]
