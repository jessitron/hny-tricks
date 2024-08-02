# what is this directory

Don't use this.

## if you are me

I'm deploying this app (the nodejs version) to my sandbox EKS cluster.

### be me

currently, there's an `awslogin` shortcut in my bash_profile to do the SSO dance.

My default profile goes to my jessitron-sandbox account, in us-east-1, where my 'pixie-lou' cluster is.

Confirm with "aws for whoami"

`aws sts get-caller-identity`

and then there's "aws for pwd" which confirms the region

`aws configure get region`

### Build an image

A directory up from here:

```sh
docker build --platform linux/amd64 -t jessitron/hny-tricks:latest .
```

### Push the image

Now the hard part. It has to be somewhere that EKS can get to it.

One time, create a repository in ECR.

`aws ecr create-repository --repository-name jessitron/hny-tricks`

See it with:

`aws ecr describe-repositories`

Every day, log in to ECR.

```sh
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
```

you have an alias with the correct account number, Jess.

`dockerlogin`

This takes more than a few seconds.

Now push the image to ECR

```sh
docker tag jessitron/hny-tricks:latest ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/jessitron/hny-tricks:latest
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/jessitron/hny-tricks:latest
```

probably this doesn't work, and there is more fighting with docker login, I don't know, it's terrible.

See the image with:

`aws ecr list-images --repository-name jessitron/hny-tricks`

### Now tell k8s to deploy it

Once, create a namespace:

`k create namespace hny-tricks`

### Now I need to set up a k8s.yaml

I copied one from meminator. It sends data to the otel collector in the cluster.

I only need one service, hny-tricks.

But I also want nginx, I can't bring myself to expose node directly, that seems like a security risk.

### set up nginx

there's an nginx directory here. Let's try

(once) `aws ecr create-repository --repository-name jessitron/hny-tricks-nginx`

```sh
docker build --platform linux/amd64 -t jessitron/hny-tricks-nginx:latest .

docker tag jessitron/hny-tricks-nginx:latest ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/jessitron/hny-tricks-nginx:latest
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/jessitron/hny-tricks-nginx:latest
```

### do a deployment

`k apply -f k8s.yaml`

### set up ingress

see jessitron/infra/otel-demo-help/o11yday-ingress.yaml for the ingress.

### get the honeycomb ingress key

`k create secret generic honeycomb-ingest-for-hny-tricks --from-literal=apikey=...`

### set up the collector to send to a different environment for this app.

this is not a rigorous deployment (it's super flaky really) but I wanted it to be out there so I can show people.

[https://util.jessitron.honeydemo.io]()
