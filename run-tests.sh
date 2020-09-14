#!/bin/bash

# install NodeJS
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
echo 'Nodejs installation done'

# move to test code
cd $REPO_FOLDER
mkdir -p output

#install npm og andre avhenginger
npm install
npm run build
npm install codeceptjs puppeteer mocha-multi randomstring --save-dev
npx codeceptjs run  --reporter mocha-multi
