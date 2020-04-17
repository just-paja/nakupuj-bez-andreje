FROM alpine

RUN apk add --update nodejs npm

WORKDIR /usr/src/app

ENV NODE_PORT=3000
ENV NODE_ENV=production

ADD andrejovo-web-*.tgz .
 
WORKDIR /usr/src/app/package

RUN npm ci --only=production --no-optional

EXPOSE $NODE_PORT

CMD [ "npm", "run", "start" ]
