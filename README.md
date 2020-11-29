# Project Overview
This project aims to solve AWS EC2 experience in mobile environement because relevant AWS services are rather painful to use on mobile.

This project will help developers who need to use mobile for developent for some reason... including myself.

# How to Run
## Requirements
- asdf
- nginx

## Setup
- `asdf install nodejs`
- `npm install -g gatsby-cli`

### For Development in Cloud
..for those unfortunate souls like myself who has noaccess to laptop due to circumstances
- Create nginx config file
  `sudo vim /etc/nginx/sites-available/ec2-wrapper`
  Then add following:
  ```
server {
  listen 80;
  server_name ec2-wrapper;
  location / {
    proxy_set_header  X-Real-IP  $remote_addr;
    proxy_set_header  Host       $http_host;
    proxy_pass        http://127.0.0.1:3000;
  }
}
  ```
- Create symlink to the config file
  `sudo ln -s /etc/nginx/sites-available/ec2-wrapper /etc/nginx/sites-enabled/ec2-wrapper`

## Run
Refer to Makefile for complete list of commands
- `make server`
- `make server-hot` for hot reload
- `make kill` to shutdown the server

