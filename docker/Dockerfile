FROM node:current-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install --loglevel debug
EXPOSE 3000
CMD [ "node", "dist/app.js" ]