FROM buildkite/puppeteer

# Fix certificate issues
RUN apt-get update --no-install-recommends -y && \
    apt-get install ca-certificates-java -y && \
    apt-get clean -y && \
    update-ca-certificates -f -y;

COPY codecept.conf.js /app/
COPY package.json /app/
COPY test /app/tests
COPY run-tests.sh /app/docker/

WORKDIR /app
RUN npm install

ONBUILD ADD . /app
ONBUILD WORKDIR /app
ONBUILD RUN npm install

CMD ["/app/docker/run-tests.sh"]
