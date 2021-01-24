FROM alpine

RUN apk add --update nodejs npm

WORKDIR /usr/src/app

ENV NODE_PORT=80
ENV NODE_ENV=production

ADD andrejovo-web-*.tgz .
 
WORKDIR /usr/src/app/package

RUN npm install --only=production --no-optional

EXPOSE 80

CMD [ "npm", "run", "start" ]
