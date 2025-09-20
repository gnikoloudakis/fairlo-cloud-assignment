FROM node:current-alpine

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/src

RUN npm install --loglevel verbose
RUN npm test

EXPOSE 3000
CMD ["npm", "start"]