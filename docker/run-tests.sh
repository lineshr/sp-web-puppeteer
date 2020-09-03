#!/bin/bash
sh '''#!/bin/sh 
echo "hello world"
'''
npm run sp-web_innloggin_test.js  && npx codeceptjs run --steps

