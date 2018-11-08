TOPDIR = $(dir $(lastword $(MAKEFILE_LIST)))
VERSION = $(or ${TRAVIS_BUILD_ID}, LOCAL)
REGISTRY ?= $(or ${DOCKER_REGISTRY}, docker.io)
NAMESPACE ?= melonproject
PROJECT ?= manager
TAG ?= latest

.PHONY: all
all: build lint test

.PHONY: build
build:
	@docker-compose build

.PHONY: lint
lint:
	@echo Skipping linting
	# @docker-compose run --rm manager yarn lint

.PHONY: test
test:
	@echo Skipping tests
	# @docker-compose run --rm manager yarn test

# -----------------------------------------------------------------------------
# BUILD - CI
# -----------------------------------------------------------------------------
.PHONY: tag
tag:
	@docker tag ${NAMESPACE}/${PROJECT}:local ${REGISTRY}/${NAMESPACE}/${PROJECT}:${VERSION}
	@docker tag ${NAMESPACE}/${PROJECT}:local ${REGISTRY}/${NAMESPACE}/${PROJECT}:${TAG}

.PHONY: push
push:
	@docker push ${REGISTRY}/${NAMESPACE}/${PROJECT}:${VERSION}
	@docker push ${REGISTRY}/${NAMESPACE}/${PROJECT}:${TAG}