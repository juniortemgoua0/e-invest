FROM node:lts

WORKDIR /app
COPY ./package.json .
COPY ./.npmrc .

RUN npm install;

COPY . .

CMD [ "npm", "start" ]
