# npmstats-org-fetcher

This folder contains the cloud function currently deployed to AWS Lambda.

## Common commands

```bash
# deploy to staging
serverless deploy

# deploy to production
serverless deploy --stage production
```

The only difference between those commands is that they result in different URLs.
The URL from production is used by the npmstats.org website.

## Created with

```bash
serverless create --template aws-nodejs --path server
```
