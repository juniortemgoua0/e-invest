#!/usr/bin/env bash


ENV_FILE=./docker/.env

# Local .env
if [ -f $ENV_FILE ]; then
    # Load Environment Variables
    # shellcheck disable=SC2046
    # shellcheck disable=SC2002
    export $(cat $ENV_FILE | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi