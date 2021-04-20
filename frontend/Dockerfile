FROM node:14.16-alpine
USER root
WORKDIR /frontend
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "build" ]