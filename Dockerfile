# -----------------------------------------------------------------------------
# dependencies image
# -----------------------------------------------------------------------------
FROM node:11.1.0-alpine as dependencies
LABEL melonproject "manager"
WORKDIR /app

# Install system dependencies.
RUN apk add --update --no-cache --virtual .apk git python make g++ libsecret-dev

# Install node dependencies and clean up afterwards.
COPY package.json yarn.lock ./
RUN yarn install --ignore-engines --frozen-lockfile --pure-lockfile --production && \
  cp -R node_modules node_modules_production && \
  yarn install --ignore-engines --frozen-lockfile --pure-lockfile && \
  yarn cache clean && \
  apk del .apk

# -----------------------------------------------------------------------------
# development image
# -----------------------------------------------------------------------------
FROM node:11.1.0-alpine as development
LABEL melonproject "manager"
WORKDIR /app

COPY --from=dependencies /app/node_modules node_modules
COPY package.json yarn.lock ./

ENTRYPOINT ["yarn"]

# -----------------------------------------------------------------------------
# builder image
# -----------------------------------------------------------------------------
FROM development as builder
LABEL melonproject "manager"

COPY . /app
RUN yarn build

# -----------------------------------------------------------------------------
# production image
# -----------------------------------------------------------------------------
FROM node:11.1.0-alpine as production
LABEL melonproject "manager"

COPY --from=builder /app/build build
COPY --from=builder /app/src/static src/static
COPY --from=dependencies /app/node_modules_production node_modules
COPY package.json yarn.lock .env.defaults ./
COPY next.config.dist.js next.config.js

ENTRYPOINT ["yarn"]
CMD ["start"]
