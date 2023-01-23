FROM node:16.19-alpine3.16 as node
RUN apk add --no-cache bash 

FROM node as alp-base
RUN apk add --update docker openrc
RUN rc-update add docker boot

#DEVELOPMENT - docker build --target dev -t dockwellhub/dwh-dev .
FROM alp-base as dev
WORKDIR /usr/src
COPY package*.json /usr/src
RUN npm install
EXPOSE 7070 

#PRODUCTION - docker build -t dockwellhub/dwh-prod .
FROM alp-base as build
WORKDIR /usr/src  
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build:docker 
EXPOSE 3535
ENTRYPOINT node ./src/server/server.js 

# docker buildx build \
#    --platform linux/amd64,linux/arm64,linux/arm/v7 \
#    -t dockwellhub/dwh-prod:latest \
#    --push \
#    .

# docker run -v /var/run/docker.sock:/var/run/docker.sock --name=dockwell -p 3535:3535 dockwellhub/dwh-prod:latest