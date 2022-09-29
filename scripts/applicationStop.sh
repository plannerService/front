#! /bin/bash

echo "> docker container 종료 및 삭제"
sudo docker rm -f $(sudo docker ps -qa)