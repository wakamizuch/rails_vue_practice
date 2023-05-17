FROM node:16.15.0

COPY ./vue_project/package.json /vue_project/package.json
COPY ./vue_project/package-lock.json /vue_project/package-lock.json

WORKDIR /vue_project

RUN npm install
