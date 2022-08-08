#!/usr/bin/env bash

mkcert -install

# shellcheck disable=SC2016
mkcert  -cert-file ./docker/dev/caddy/certs/"$SERVICE_DOMAIN_NAME"+3.pem \
        -key-file ./docker/dev/caddy/certs/"$SERVICE_DOMAIN_NAME"+3-key.pem \
        "$SERVICE_DOMAIN_NAME" "*.${SERVICE_DOMAIN_NAME}" 127.0.0.1 ::1

# shellcheck disable=SC2016
mkcert  -cert-file ./docker/dev/nginx/certs/"$SERVICE_DOMAIN_NAME"+3.pem \
        -key-file ./docker/dev/nginx/certs/"$SERVICE_DOMAIN_NAME"+3-key.pem \
        "$SERVICE_DOMAIN_NAME" "*.${SERVICE_DOMAIN_NAME}" 127.0.0.1 ::1
