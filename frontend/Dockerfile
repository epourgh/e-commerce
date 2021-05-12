FROM node:14.16-alpine as builder
WORKDIR '/frontend'

# Install yarn and other dependencies via apk
RUN apk update && apk add python3 g++ make && rm -rf /var/cache/apk/*

COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/dist /usr/share/nginx/html