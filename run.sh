#!/bin/bash

git pull

docker-compose up --no-deps -d --build

docker image prune -f --filter "label=developer=akadem87@gmail.com"
