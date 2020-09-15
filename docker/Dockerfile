
FROM buildkite/puppeteer:latest

RUN mkdir -p /usr/share/man/man1
# Fix certificate issues
RUN apt-get update --no-install-recommends -y && \
    apt-get install ca-certificates-java -y && \
    apt-get clean -y && \
    update-ca-certificates -f -y;

COPY codecept.conf.js /app/
COPY package.json /usr/src/app/
COPY src/tests /usr/src/app/tests
COPY src/tests /usr/src/app/tests
COPY docker/run-tests.sh /usr/src/app/docker/

WORKDIR /usr/src/app
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm -v

ONBUILD ADD . /app
ONBUILD WORKDIR /app
ONBUILD RUN npm install

CMD ["/app/docker/run-tests.sh"]
