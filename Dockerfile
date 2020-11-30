FROM node:slim

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

ENV JWT_SECRET="SECRET_KEY"
ENV DATABASE_URI="mongodb://mongo/test"

EXPOSE 80

ENTRYPOINT node dist/main.js 
