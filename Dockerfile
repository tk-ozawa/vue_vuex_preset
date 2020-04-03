FROM node:12.16.1-alpine

WORKDIR /usr/src/app

RUN apk update && \
  npm install -g npm @vue/cli
