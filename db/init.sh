#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
now() { echo $(date -u +'%Y-%m-%dT%H:%M:%SZ'); }

echo "$(now) (db/init) INFO: creating tables"
psql \
  -f ${DIR}/schemas/_extensions.sql \
  -f ${DIR}/schemas/users.sql

echo "$(now) (db/init) INFO: populating with fixtures"
psql \
  -f ${DIR}/fixtures/users.sql
