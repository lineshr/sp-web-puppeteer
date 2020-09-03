FROM buildkite/puppeteer

RUN mkdir -p /usr/share/man/man1

# Fix certificate issues
RUN apt-get update --no-install-recommends -y && \
    apt-get install ca-certificates-java -y && \
    apt-get clean -y && \
    update-ca-certificates -f -y;

COPY codecept.conf.js /app/
COPY package.json /app/
COPY sp-web_innloggin_test.js /app/tests
COPY docker/run-tests.sh /app/docker/

WORKDIR /app
RUN npm install

ONBUILD ADD . /app
ONBUILD WORKDIR /app
ONBUILD RUN npm install

CMD ["/app/docker/run-tests.sh"]
