![alt text](issuedex.png "Title")
![alt text](trackthem.png "Title")

# Visit

## [`https://prod.gdb3dkbbjy.eu-central-1.elasticbeanstalk.com`](https://prod.gdb3dkbbjy.eu-central-1.elasticbeanstalk.com)

# Stack
- Node.js + Express
- React + Redux
- AWS Elastic Beanstalk + CloudFormation + Cognito
- Docker
- PostgreSQL

# Run

```
# start db
$ make start-local-db

# start be
$ cd backend/issuedex-api
$ npm install
$ npm start

# start fe
$ cd frontend
$ npm install
$ npm start
```

## Go to [`localhost:3000`](http://localhost:3000)

# Deploy

```
$ make deploy
```
