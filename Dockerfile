FROM node:20.8

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4000

CMD ["node","src/index.js"]