.PHONY: login create-infrastructure deploy create-docker-repository 

APP_NAME=issuedex
PROD_ENVIRONMENT_NAME=prod
REPOSITORY_URL=140856971942.dkr.ecr.eu-central-1.amazonaws.com/issuedex
REGION=eu-central-1
S3_BUCKET="$(APP_NAME)-bucket"
APP_LIFECYCLE_CONFIG=ServiceRole=aws-elasticbeanstalk-service-role,VersionLifecycleConfig=(MaxCountRule=(Enabled=true,MaxCount=5,DeleteSourceFromS3=false),MaxAgeRule=(Enabled=false,MaxAgeInDays=30,DeleteSourceFromS3=false))
DEV_APP_URL="http://localhost:3000"
PROD_APP_URL="https://prod.gdb3dkbbjy.eu-central-1.elasticbeanstalk.com"
AWS_PROFILE?=default

build-frontend:
	./cicd/scripts/build-frontend.sh

login:
	@eval $$(aws ecr get-login --no-include-email --region $(REGION) --profile $(AWS_PROFILE))

create-docker-repository:
	aws ecr create-repository --repository-name $(APP_NAME) --region $(REGION) --profile $(AWS_PROFILE)

create-assets-buckets:
	cd cicd/cloudformation; make APP_NAME=$(APP_NAME) REGION=$(REGION) create-assets-buckets

create-cognito:
	cd cicd/cloudformation; make \
		APP_NAME=$(APP_NAME) \
		REGION=$(REGION) \
		DEV_APP_URL=$(DEV_APP_URL) \
		PROD_APP_URL=$(PROD_APP_URL) \
		create-cognito

create-app:
	./cicd/scripts/create-app.sh \
		$(S3_BUCKET) \
		$(APP_NAME) \
		$(REGION) \
		$(AWS_PROFILE) \
		$(PROD_ENVIRONMENT_NAME)

create-infrastructure: create-assets-buckets create-app create-cognito

deploy: login build-frontend
	./cicd/scripts/deploy.sh \
		$(APP_NAME) \
		$(REPOSITORY_URL) \
		$(REGION) \
		$(S3_BUCKET) \
		$(PROD_ENVIRONMENT_NAME) \
		$(AWS_PROFILE)

start-local-db:
	cd cicd/docker/db; docker-compose up

stop-local-db:
	cd cicd/docker/db; docker-compose down
