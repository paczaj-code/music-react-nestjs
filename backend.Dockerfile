FROM node:18-alpine

RUN mkdir /app
WORKDIR /app
COPY ./backend/package.json .
RUN yarn install
COPY ./backend .