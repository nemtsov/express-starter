#!/bin/bash

SECRETSDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../.secrets"

echo "[generate_keys] writing to '$SECRETSDIR'. Leave the passphrase empty."

mkdir -p $SECRETSDIR

ssh-keygen -f "$SECRETSDIR/id_rsa"
ssh-keygen -f "$SECRETSDIR/id_rsa.pub" -e -m pem > "$SECRETSDIR/id_rsa.pub.pem"