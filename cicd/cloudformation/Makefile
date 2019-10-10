# targets should be called from root Makefile

DEV_ENV_NAME=dev
PROD_ENV_NAME=prod

PHONY += create-assets-buckets create-cognito

.PHONY: $(PHONY)

.EXPORT_ALL_VARIABLES:

create-assets-buckets:
	./scripts/create-assets-buckets.sh $(DEV_ENV_NAME) $(APP_NAME) $(REGION)
	./scripts/create-assets-buckets.sh $(PROD_ENV_NAME) $(APP_NAME) $(REGION)

create-cognito:
	./scripts/create-cognito.sh $(DEV_ENV_NAME) $(APP_NAME) $(REGION) ${DEV_APP_URL}
	./scripts/create-cognito.sh $(PROD_ENV_NAME) $(APP_NAME) $(REGION) ${PROD_APP_URL}