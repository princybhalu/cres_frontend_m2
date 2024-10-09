FROM node:current-alpine3.20

COPY package-lock.json .
COPY package.json .

RUN npm i

COPY src src
COPY public public
COPY tailwind.config.js tailwind.config.js

RUN npm run build

RUN rm -rf src node_modules

EXPOSE 3000
CMD npx serve -s build