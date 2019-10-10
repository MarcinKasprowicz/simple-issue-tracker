FROM node:10

WORKDIR /usr/src/app

COPY backend/issuedex-api .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "production" ]



