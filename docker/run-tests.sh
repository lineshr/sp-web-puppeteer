#!/usr/bin/env bash

npm run sp-web_innloggin_test.js  && npx codeceptjs run --steps
ls report
