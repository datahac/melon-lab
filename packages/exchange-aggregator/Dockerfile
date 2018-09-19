FROM melonproject/npm-dependencies:latest as dependencies

# -----------------------------------------------------------------------------
# development
# -----------------------------------------------------------------------------
FROM melonproject/node-development:latest as development
WORKDIR /app/packages/exchange-aggregator

COPY --from=dependencies /app/packages/exchange-aggregator/node_modules node_modules

# Put the container into a 1-year long slumber.
CMD exec /bin/sh -c "trap : TERM INT; sleep 365d & wait"
