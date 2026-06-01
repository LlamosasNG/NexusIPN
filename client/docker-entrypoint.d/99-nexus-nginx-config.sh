#!/bin/sh
set -eu

DOMAIN="${PUBLIC_DOMAIN:-localhost}"
CERT_DIR="/etc/letsencrypt/live/${DOMAIN}"
TARGET_CONF="/etc/nginx/conf.d/default.conf"

if [ -f "${CERT_DIR}/fullchain.pem" ] && [ -f "${CERT_DIR}/privkey.pem" ]; then
  TEMPLATE="/etc/nginx/templates/https.conf"
  echo "Nexus IPN: enabling HTTPS for ${DOMAIN}"
else
  TEMPLATE="/etc/nginx/templates/http.conf"
  echo "Nexus IPN: certificate not found for ${DOMAIN}; using HTTP"
fi

sed "s/__PUBLIC_DOMAIN__/${DOMAIN}/g" "${TEMPLATE}" > "${TARGET_CONF}"
