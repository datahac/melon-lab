FROM melonproject/npm-dependencies:latest as dependencies

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node-development:latest as development
WORKDIR /app/packages/manager-interface

COPY --from=dependencies /app/packages/manager-interface/node_modules node_modules

CMD ["yarn", "dev"]

# -----------------------------------------------------------------------------
# build
# -----------------------------------------------------------------------------
FROM development as build

COPY . /app
RUN yarn build

# -----------------------------------------------------------------------------
# production
# -----------------------------------------------------------------------------
FROM melonproject/node-production:latest as production
WORKDIR /app/packages/manager-interface

COPY --from=dependencies /app/packages/manager-interface/node_modules node_modules
COPY --from=build /app/packages/manager-interface/build build
COPY --from=build /app/packages/manager-interface/src/static src/static

COPY .env.defaults /app/
COPY packages/manager-interface/package.json packages/manager-interface/server.js packages/manager-interface/config ./
COPY packages/manager-interface/next.config.dist.js next.config.js

CMD ["yarn", "start"]
