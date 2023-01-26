# INSTALLATION GUIDE FOR USERS

# Dockwell &middot; ![Github Repo Size](https://img.shields.io/github/repo-size/oslabs-beta/Dockwell) ![GitHub License](https://img.shields.io/github/license/oslabs-beta/Dockwell) ![GitHub Commit](https://img.shields.io/github/last-commit/oslabs-beta/Dockwell) ![GitHub Stars](https://img.shields.io/github/stars/oslabs-beta/Dockwell)

---

## About

--- 

Dockwell is an intuitive and comprehensive GUI that tracks, monitors, and displays all of a user's Docker containers.

We made Dockwell so that developers can quickly visualize container metrics to assist in their debugging and development process.

With the needs of developers in mind, Dockwell uses Prometheus and cAdvisor to scrape real-time metrics from the host machine, all from its own containerized environment.

Dockwell is an open source project and we would love to hear your feedback!



https://user-images.githubusercontent.com/105250729/214632218-a314674d-d5d0-4d57-9ab6-9a78cbc76464.mov



## Table of Contents

Application usage/documentation

- [Features](#features)
- [Prerequisites](#prerequisites)

Installation guides for Users

- [Installation](#installation)


Contributers and other info

- [Contributers](#contributers)
- [Made With](#made-with)
- [How to Contribute](#how-to-contribute)

## Features:

---

- Memory and CPU usage data are displayed graphically for each individual container.
- Memory and CPU usage data for _all containers_ are also displaed so that users can quickly compare metrics
<!-- Live reloading of metric data displayed by individual container or all containers at once, in simple to read charts. -->

- The right side of the interface displays all of a users active and inactive containers with the functionality to start, pause, unpause, and kill containers.

<!-- System metrics section which displays how much CPU and Memory Docker is currently using from the host machine, as well as by container. -->

- The left side of the interfece displays a breakdown of memory and CPU usage.
  - A liguid guage shows the percent of each metric being used by all containers
  - A pie chart depicts the ratio metric usage by container
- All charts are dynamic and update every 1000ms
<!-- Logs section that allows a user to check and refresh the logs from each container's environment. -->

[↥Back to top](#table-of-contents)

## Prerequisites:

---

- The host computer running Dockwell must have:

  - A Docker [Account](https://www.docker.com/ "Download Docker")

  - Hopefully at least a few containers (idk?)

  [↥Back to top](#table-of-contents)

## Installation:
STEP 1: DOCKER SETTINGS
_For Dockwell to collect container metrics, permission from the host Docker is required_
  - Docker Desktop for Mac / Docker Desktop for Windows: Click the Docker icon in the toolbar, select Settings, then select Engine. Click Advanced.
    Add the following to the Docker Engine JSON:
    - {
        "metrics-addr" : "127.0.0.1:9323",
        "experimental" : true
      }
    - ![Screen Shot 2023-01-25 at 9 58 09 AM](https://user-images.githubusercontent.com/7785546/214613039-c3a0b064-a6bb-47c8-be3e-a011b9392085.png)


  - For Linux users: add the flags above to your daemon.json file at /etc/docker/daemon.json
  - Windows Server users: add the same to your config file at C:\ProgramData\docker\config\daemon.json


STEP 2: DOWNLOAD CONFIGURATION FILES
- Download and unzip this repository to your host machine.

STEP 3: DOCKER COMPOSE UP

- Open a terminal or command prompt window, cd into the unzipped repository downloaded in Step 2: `cd dockwell-SetupInstall`
- Start Docker Compose using the command: `docker compose up`

_You should see the following:_
- <img width="557" alt="Screen Shot 2023-01-23 at 1 36 40 PM" src="https://user-images.githubusercontent.com/7785546/214134207-60b9bea5-f4b8-4ff8-8a5b-e67de80acf80.png">


_You can confirm the Compose stack is running correctly by viewing Containers in your Docker Desktop app:_
- <img width="986" alt="Screen Shot 2023-01-23 at 1 44 19 PM" src="https://user-images.githubusercontent.com/7785546/214134575-9169d790-b839-4090-a4bd-1991656be7f2.png">

STEP 4: ACCESSING THE TOOL

- Go to http://localhost:3535 to view your container metrics

---

[↥Back to top](#table-of-contents)

## Contributors

---

- Kyle Saunders [LinkedIn](https://www.linkedin.com/in/kylersaunders/) | [Github](https://github.com/kylersaunders)
- Sami Messai [LinkedIn](https://www.linkedin.com/in/sami-messai-682873ab/) | [Github](https://github.com/samessai14)
- Aalok Shah [LinkedIn](https://www.linkedin.com/in/kolashah/) | [Github](https://github.com/kolashah)
- Josh Paynter [LinkedIn](https://www.linkedin.com/in/josh-paynter-192a9b234/) | [Github](https://github.com/jip1029)


[↥Back to top](#table-of-contents)

## Made With

---

### FrontEnd

![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

### BackEnd

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Monitoring and Data Visualization

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)

[↥Back to top](#table-of-contents)

SYSTEM REQUIREMENTS

- Docker Daemon must be installed on the host machine.
- Host machine must have access to the Docker CLI from the terminal
