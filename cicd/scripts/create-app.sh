#!/bin/bash -x

S3_BUCKET=${1}
APP_NAME=${2}
REGION=${3}
AWS_PROFILE=${4}
ENVIRONMENT=${5}

# aws s3api create-bucket --bucket ${S3_BUCKET} --region ${REGION} --create-bucket-configuration LocationConstraint=${REGION}
# eb init ${APP_NAME} --profile ${AWS_PROFILE} --region ${REGION} -p Docker
eb create ${ENVIRONMENT} --cfg savedconfig --sample -nh
