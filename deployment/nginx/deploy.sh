#!/bin/sh

docker build --platform linux/amd64 -t jessitron/hny-tricks-nginx:latest .

docker tag jessitron/hny-tricks-nginx:latest ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/jessitron/hny-tricks-nginx:latest
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/jessitron/hny-tricks-nginx:latest