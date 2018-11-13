# -----------------------------------------------------------------------------
# apk dependencies
# -----------------------------------------------------------------------------
FROM node:11.1.0-alpine as apk-dependencies
WORKDIR /app

# Install system dependencies.
RUN apk add --update --no-cache --virtual .apk git python make g++ libsecret-dev

# -----------------------------------------------------------------------------
# npm dependencies
# -----------------------------------------------------------------------------
FROM apk-dependencies as npm-dependencies

COPY package.json yarn.lock ./

# Install node dependencies and clean up afterwards.
RUN yarn install --ignore-engines --frozen-lockfile --pure-lockfile --production && \
  cp -R node_modules node_modules_production && \
  yarn install --ignore-engines --frozen-lockfile --pure-lockfile && \
  yarn cache clean && \
  apk del .apk

# -----------------------------------------------------------------------------
# base development image
# -----------------------------------------------------------------------------
FROM node:11.1.0-alpine as node-development
WORKDIR /app

COPY --from=npm-dependencies /app/node_modules node_modules
COPY package.json yarn.lock ./

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM node-development as development
ENTRYPOINT ["yarn"]

# -----------------------------------------------------------------------------
# base production image
# -----------------------------------------------------------------------------
FROM node:11.1.0-alpine as node-production
WORKDIR /app

COPY --from=npm-dependencies /app/node_modules_production node_modules
COPY package.json yarn.lock ./

# -----------------------------------------------------------------------------
# build
# -----------------------------------------------------------------------------
FROM node-development as build

COPY . /app
RUN yarn build

# -----------------------------------------------------------------------------
# production
# -----------------------------------------------------------------------------
FROM node-production as production

COPY --from=build /app/build build
COPY --from=build /app/src/static src/static

COPY .env.defaults ./
COPY next.config.dist.js next.config.js

ENTRYPOINT ["yarn"]
CMD ["start"]
