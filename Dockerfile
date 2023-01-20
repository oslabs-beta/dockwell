FROM node:16.13
WORKDIR /usr/src 
COPY . /usr/src
RUN npm ci
#added this
RUN npm run build
EXPOSE 3535
ENTRYPOINT node ./src/server/server.js

# docker build -t dockwellhub/dwh-prod .
# docker run -p 3001:3535 dockwellhub/dwh-prod 