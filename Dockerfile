FROM node:16.13 
WORKDIR /usr/src 
COPY . /usr/src
RUN npm install
RUN apt-get update
RUN apt-get install -y docker.io 
# RUN apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin 
RUN npm run build
EXPOSE 3535
ENTRYPOINT node ./src/server/server.js 

# docker image rm dockwellhub/dwh-prod
# docker build -t dockwellhub/dwh-prod .
# docker push dockwellhub/dwh-prod

# docker buildx build \
#    --platform linux/amd64,linux/arm64,linux/arm/v7 \
#    -t dockwellhub/dwh-prod:latest \
#    --push \
#    .

# docker run -v /var/run/docker.sock:/var/run/docker.sock --name=dockwell -p 3535:3535 dockwellhub/dwh-prod:latest