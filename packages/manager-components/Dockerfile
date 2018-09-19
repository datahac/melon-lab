FROM melonproject/npm-dependencies:latest as dependencies

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node-development:latest as development
WORKDIR /app/packages/manager-components

COPY --from=dependencies /app/packages/manager-components/node_modules node_modules

CMD ["yarn", "dev"]
