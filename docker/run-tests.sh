#!/usr/bin/env bash



cd $REPO_FOLDER
mkdir -p output


npm run tests && npx codeceptjs run --steps
ls report

