#!/bin/bash

# Install the openshift client tools binary.
OCURL=https://github.com/openshift/origin/releases/download/v3.10.0/openshift-origin-client-tools-v3.10.0-dd10d17-linux-64bit.tar.gz
TMPDIR=$(mktemp -d)
curl -L $OCURL | tar xvz --strip-components 1 -C $TMPDIR
sudo mv $TMPDIR/oc /usr/local/bin/oc

# Allow our docker registry (despite the invalid signature).
sudo sed -i "s/\DOCKER_OPTS=\"/DOCKER_OPTS=\"--insecure-registry=$DOCKER_REGISTRY /g" /etc/default/docker
sudo cat /etc/default/docker
sudo service docker restart

# Log in to the openshift cluster and the docker registry.
oc login $OPENSHIFT_URL --token $OPENSHIFT_TOKEN
docker login -u travis -p $(oc whoami -t) $DOCKER_REGISTRY
