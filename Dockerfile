FROM node:16-alpine

WORKDIR /usr/front-dt1/app

COPY . .

EXPOSE 8080