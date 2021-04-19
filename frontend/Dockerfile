FROM node:10

USER root
WORKDIR /frontend
COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]