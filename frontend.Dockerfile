FROM node:18-alpine

RUN mkdir /app
WORKDIR /app
COPY ./frontend/package.json .
RUN yarn install
COPY ./frontend .