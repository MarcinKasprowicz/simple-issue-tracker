#!/bin/bash -x

APP_NAME=${1}
REPOSITORY_URL=${2}
REGION=${3}
S3_BUCKET=${4}
ENVIRONMENT=${5}
AWS_PROFILE=${6}

docker build -f ./cicd/docker/Dockerfile -t ${APP_NAME}:${ENVIRONMENT} .

docker build -f ./cicd/docker/Dockerfile -t issuedex:prod .
docker tag ${APP_NAME}:${ENVIRONMENT} ${REPOSITORY_URL}:${ENVIRONMENT}
docker push ${REPOSITORY_URL}:${ENVIRONMENT}
BUILD_NAME=${ENVIRONMENT}_commit_sha_$(git log --format="%h" -n 1)
cp ./cicd/elasticbeanstalk/Dockerrun-${ENVIRONMENT}.aws.json Dockerrun.aws.json
ZIP_NAME=${BUILD_NAME}.zip
zip -r "${ZIP_NAME}" ./Dockerrun.aws.json
aws s3 cp "./${ZIP_NAME}" "s3://${S3_BUCKET}/${ZIP_NAME}" --profile ${AWS_PROFILE}
aws elasticbeanstalk create-application-version --application-name ${APP_NAME} --version-label "${BUILD_NAME}" --source-bundle S3Bucket=${S3_BUCKET},S3Key="${ZIP_NAME}" --region ${REGION}
aws elasticbeanstalk update-environment --application-name ${APP_NAME} --environment-name ${ENVIRONMENT} --version-label "${BUILD_NAME}" --region ${REGION}
rm ./Dockerrun.aws.json