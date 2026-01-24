FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE ${PORT:-3000}

CMD [ "npm", "run", "dev" ]