FROM alpine

RUN apk add --update nodejs npm

WORKDIR /usr/src/app

COPY package*.json .
COPY .next .next
COPY public public
COPY next.config.js .

RUN npm ci --only=production

ENV NODE_PORT=3000
EXPOSE 3000

CMD [ "npm", "run", "start" ]
