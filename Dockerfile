#add bash to node alpine
FROM node:16.19-alpine3.16 as alp-base
RUN apk add --no-cache bash 

#install docker
FROM alp-base as docker-base
RUN apk add --update docker openrc
RUN rc-update add docker boot

#build node modules for dev & for building
FROM docker-base as npm-base
WORKDIR /usr/src
COPY package*.json ./
RUN npm install

#DEVELOPMENT
#docker build --target dockwell_dev -t dockwell_dev .
FROM npm-base as dockwell_dev
EXPOSE 7070 

#webpack builds bundle.js
FROM npm-base as build
WORKDIR /usr/src   
COPY . .
ENV NODE_ENV=production
RUN npm run build:docker 

#PRODUCTION
#docker build -t dockwellhub/dwh-prod .
FROM docker-base as prod
WORKDIR /usr/src 
COPY package*.json ./
RUN npm ci --omit=dev
COPY /src ./src
COPY /prometheus.yml ./
COPY --from=build /usr/src/build ./build
EXPOSE 3535
ENTRYPOINT node ./src/server/server.js 

# docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t dockwellhub/dwh-prod:latest --push . 