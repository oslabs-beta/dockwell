# Dockwell &middot; ![Github Repo Size](https://img.shields.io/github/repo-size/oslabs-beta/Dockwell) ![GitHub License](https://img.shields.io/github/license/oslabs-beta/Dockwell) ![GitHub Commit](https://img.shields.io/github/last-commit/oslabs-beta/Dockwell) ![GitHub Stars](https://img.shields.io/github/stars/oslabs-beta/Dockwell)

---

## About
---
Dockwell is an intuitive and comprehensive GUI that tracks, monitors, and displays all of a user's Docker containers.

We made Dockwell so that developers can quickly visualize container metrics to assist in their debugging and development process.

With the needs of developers in mind, Dockwell uses Prometheus and cAdvisor to scrape real-time metrics from the host machine, all from its own containerized environment.

Dockwell is an open source project and we would love to hear your feedback!


https://user-images.githubusercontent.com/105250729/214631275-7a81bddb-1fbd-4cc6-a478-97a6a3efad06.mov



## Table of Contents

Application usage/documentation

- [Features](#features)
- [Prerequisites](#prerequisites)

Installation Guides

- [Installation](#installation)
- [How to Contribute](#how-to-contribute)

Contributers and other info

- [Contributors](#contributors)
- [Made With](#made-with)

## Features:

Live reloading of metric data displayed in simple to read charts.
  - Memory and CPU usage data are displayed graphically for each individual container.
  - Memory and CPU usage data for _all containers_ are also displaed so that users can quickly compare metrics

Environments section which displays all of a users active and inactive containers with the functionality to start, pause, and kill containers.

System metrics section which displays how much CPU and Memory Docker is currently using
  - A liguid guage shows the percent of each metric being used by all containers
  - A pie chart depicts the ratio metric usage by container
 
Logs section that allows a user to check and refresh the logs from each container's environment.
 
All charts are dynamic and update every 1000ms

[↥Back to top](#table-of-contents)

## Prerequisites:
- The host computer running Dockwell must have:

  - A Docker [Account](https://www.docker.com/ 'Download Docker')

  [↥Back to top](#table-of-contents)

## Installation:

- All you have to do is visit [this](https://github.com/oslabs-beta/dockwell/tree/SetupInstall) repository and follow the instructions in the Readme

[↥Back to top](#table-of-contents)

## How to Contribute:

- Contributions are always welcome!
- To contribute please fork the repository and then create a pull request.

  [↥Back to top](#table-of-contents)

## Contributors: 

- Kyle Saunders [LinkedIn](https://www.linkedin.com/in/kylersaunders/) | [Github](https://github.com/kylersaunders)
- Sami Messai [LinkedIn](https://www.linkedin.com/in/sami-messai-682873ab/) | [Github](https://github.com/samessai14)
- Aalok Shah [LinkedIn](https://www.linkedin.com/in/kolashah/) | [Github](https://github.com/kolashah)
- Josh Paynter [LinkedIn](https://www.linkedin.com/in/josh-paynter-192a9b234/) | [Github](https://github.com/jip1029)

[↥Back to top](#table-of-contents)

## Made With

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
