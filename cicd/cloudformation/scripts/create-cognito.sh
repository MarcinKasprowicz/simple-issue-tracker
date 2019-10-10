#!/bin/bash -x
ENVIRONMENT=${1}
APP_NAME=${2}
REGION=${3}
APP_URL=${4}

COGNITO_STACK_NAME="${ENVIRONMENT}-${APP_NAME}-auth"

aws cloudformation create-stack \
  --template-body file://stacks/cognito.yaml \
  --parameters ParameterKey=Environment,ParameterValue="${ENVIRONMENT}" \
               ParameterKey=AppName,ParameterValue="${APP_NAME}" \
               ParameterKey=CallbackURL,ParameterValue="${APP_URL}" \
  --region "${REGION}" \
  --stack-name "${ENVIRONMENT}-${APP_NAME}-auth"
aws cloudformation wait stack-create-complete \
  --stack-name "${ENVIRONMENT}-${APP_NAME}-auth" \
  --region "${REGION}"

USER_POOL_ID=$(aws cloudformation describe-stacks \
  --stack-name "${ENVIRONMENT}-${APP_NAME}-auth" \
  --region "${REGION}" \
  --query "Stacks[0].Outputs[0].OutputValue" |
  tr -d '"')

aws cognito-idp create-user-pool-domain \
  --user-pool-id "${USER_POOL_ID}" \
  --domain "${ENVIRONMENT}-${APP_NAME}"
aws cognito-idp create-resource-server \
  --user-pool-id "${USER_POOL_ID}" \
  --region "${REGION}" \
  --identifier "${ENVIRONMENT}-${APP_NAME}" \
  --name "${ENVIRONMENT}-${APP_NAME}"
