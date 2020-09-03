#!/bin/bash


echo "first stage"

VERSION=${1:-latest}

echo "second stage"
echo "Pulling image ${VERSION}"
mkdir report

docker run --rm \
    -v "$(pwd)"/report/:/app/report/ \
    lineshr/sp-web-puppeteer-test:${VERSION}

status=$?

echo "Final status ${status}"
exit ${status}
