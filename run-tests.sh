#!/bin/bash

# install NodeJS
#curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
#sudo apt-get install -y nodejs
#echo 'Nodejs installation done'

# move to test code
#cd $REPO_FOLDER
#mkdir -p output

#install npm og andre avhenginger
#npm install
#npm run build
#npm install codeceptjs puppeteer --save
#npm i mocha-junit-reporter
#npx codeceptjs run --steps 
#!/usr/bin/env bash

VERSION=${1:-latest}

echo "Pulling image ${VERSION}"
mkdir report

docker run --rm \
    -v "$(pwd)"/report/:/app/report/ \
    lineshr/sp-web-puppeteer-test:${VERSION}

status=$?

echo "Final status ${status}"
exit ${status}
