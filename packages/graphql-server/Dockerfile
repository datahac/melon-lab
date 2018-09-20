FROM melonproject/npm-dependencies:latest as dependencies

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node-development:latest as development
WORKDIR /app/packages/graphql-server

COPY --from=dependencies /app/packages/graphql-server/node_modules node_modules

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
WORKDIR /app/packages/graphql-server

COPY --from=build /app/packages/graphql-server/dist dist
COPY --from=dependencies /app/packages/graphql-server/node_modules node_modules
COPY .env.defaults /app/
COPY packages/graphql-server/package.json package.json

CMD ["yarn", "start"]
