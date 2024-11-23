FROM node:22.11.0

WORKDIR /app

RUN apt-get update && apt-get install -y

COPY package*.json ./

COPY . .

EXPOSE 8080