FROM node:6.2.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json .
RUN npm install

ADD . .

EXPOSE 1337

CMD [ "npm", "start" ]
