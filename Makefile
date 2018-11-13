TOPDIR = $(dir $(lastword $(MAKEFILE_LIST)))
VERSION = $(or ${TRAVIS_BUILD_ID}, LOCAL)
REGISTRY ?= $(or ${DOCKER_REGISTRY}, docker.io)
TAG ?= latest

.PHONY: all
all: build lint test

.PHONY: build
build:
	@docker build .

.PHONY: lint
lint:
	@echo Skipping linting

.PHONY: test
test:
	@echo Skipping tests

# -----------------------------------------------------------------------------
# BUILD - CI
# -----------------------------------------------------------------------------
.PHONY: tag
tag:
	@docker tag melonproject/manager:local ${REGISTRY}/melonproject/manager:${VERSION}
	@docker tag melonproject/manager:local ${REGISTRY}/melonproject/manager:${TAG}

.PHONY: push
push:
	@docker push ${REGISTRY}/melonproject/manager:${VERSION}
	@docker push ${REGISTRY}/melonproject/manager:${TAG}

