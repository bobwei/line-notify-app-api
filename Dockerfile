FROM node:7.6.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g yarn

ADD package.json .
ADD yarn.lock .
RUN yarn

ADD . .

CMD [ "npm", "start" ]
