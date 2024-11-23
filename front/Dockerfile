FROM node:22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["sh", "-c", "npm install && npm run dev"]
