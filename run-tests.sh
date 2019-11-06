#!/bin/bash

# install NodeJS
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
echo 'Nodejs installation done'

# move to test code
cd $REPO_FOLDER
mkdir -p output

#install npm og andre avhenginger
npm install
npm run build
npm install codeceptjs puppeteer --save
npm i mocha-junit-reporter
npx codeceptjs run --steps 
