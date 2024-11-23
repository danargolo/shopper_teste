FROM node:22.11.0-alpine3.20

WORKDIR /app

RUN apk update && apk add --no-cache bash curl

COPY package*.json ./

COPY . .

EXPOSE 80
