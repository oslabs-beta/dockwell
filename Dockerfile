# FROM node:16.13
FROM node:alpine
WORKDIR /usr/src 
COPY . /usr/src
RUN npm install
RUN npm run build
EXPOSE 3535
ENTRYPOINT node ./src/server/server.js
# RUN [“chmod”, “+x”, "/node/execure.sh”]

# docker build -t dockwellhub/dwh-prod .
# docker push dockwellhub/dwh-prod

# docker buildx build \
#    --platform linux/amd64,linux/arm64,linux/arm/v7 \
#    -t dockwellhub/dwh-prod:latest \
#    --push \
#    .

# docker run -p 3535:3535 dockwellhub/dwh-prod 