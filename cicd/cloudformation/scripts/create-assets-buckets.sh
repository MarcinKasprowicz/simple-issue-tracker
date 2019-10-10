#!/bin/bash -x
ENVIRONMENT=${1}
APP_NAME=${2}
REGION=${3}
ASSETS_STACK_NAME="${ENVIRONMENT}-${APP_NAME}-assets-bucket"

aws cloudformation create-stack \
  --template-body file://stacks/assets-buckets.yaml \
  --parameters ParameterKey=Environment,ParameterValue="${ENVIRONMENT}" \
  ParameterKey=AppName,ParameterValue="${APP_NAME}" \
  --region "${REGION}" \
  --stack-name "${ASSETS_STACK_NAME}"
aws cloudformation wait stack-create-complete \
  --stack-name "${ASSETS_STACK_NAME}" \
  --region "${REGION}"
