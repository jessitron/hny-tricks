#!/bin/sh

docker build --platform linux/amd64 -t jessitron/hny-tricks-nginx:turbine .

docker tag jessitron/hny-tricks-nginx:turbine ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/jessitron/hny-tricks-nginx:turbine
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/jessitron/hny-tricks-nginx:turbine