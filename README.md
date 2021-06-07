# About

MailEventDispatcher is my test assignment for an interview. The company and tasks are not disclosed.

✔️ Every feature was tested and working.\
⚠️ You have to set up Environment Variables in Lambda


I've completed the main task including every subtask and tested the resulting solution on my own AWS infrastructure. Mailgun was simulated by HTTP Requests according to Mailgun docs.

# Build
As there shouldn't be any generated code in GIT, the result ZIP artifact can be obtained two ways:

## 1. Download from GitHub (Recommended)
I've already built the artifact and uploaded to GitHub as a Release. You can download it directly from [here](https://github.com/Drex213/MailEventDispatcher/releases/tag/1.0).

## 2. Build it yourself
You'll need npm and the typescript package to build the project yourself. The solution is a normal TypeScript project with a valid tsconfig.json file. Build according to tsconfig.json and you will find the resulting JavaScript files in the *dist* folder. Zip up everything from the dist folder, and that's your artifact to upload to Lambda.

# Deploy

To deploy the solution, you'll need an AWS architecture, a Mailgun account and **you need to set some Environment Variables in AWS Lambda**.

## 1. AWS infrastructure

You will need

* An AWS Lambda function with the correct permission policies to access SNS and DynamoDB
* A DynamoDB table (name can be anything) with "**id**" as Primary Partition Key
* An SNS topic (name can be anything)

## 2. Mailgun
I've used Postman to send HTTP requests to simulate Mailgun according to its documentation, but you can use your Mailgun account to set up Webhooks. Webhooks should call the AWS Lambda function.

## 3. ⚠️Environment Variables
You have to set up some environment variables for Lambda to connect the infrastructure components as passwords, tokens and signing keys should not be in the source code.

| Key        | Value description           | Example |
| ------------- |-------------|-------------|
| dynamoDbTableName      | The DynamoDB table's name | mailEvents|
| mailgunWebhookSigningKey      | Mailgun Webhook Signing Key      | my_example_key|
| snsTopicArn | SNS Topic's ARN      | arn:aws:sns:us-east-2:323687010060:mailEvents|

# Solution highlights
I'd like to highlight two solutions:

1. *The code should validate that the webhook came from Mailgun.* This task was solved by validating the signature in the Mailgun webhook using the Webhook Signing Key. If the signature is incorrect, code 406 (Not Acceptable) is retured to prevent Mailgun from retrying with the wrong configuration. But generally, we assume the request is invalid and might not be coming from Mailgun.

2. *Proper anstractions.* Mailgun, DynamoDb and SNS are all abstracted out and their services are accessible through interfaces (Request, EventRepository, MessageQueue). The concrete implementations are inserted using DI when building the depencency tree in *index.ts*, therefore easily modifyable in a single place.

# Testability
Testability is also important in applications and automated tests need abtraction of the environment (e.g. server clock).

To test with static HTTP requests instead of Mailgun Webhooks, you can change the MailgunSettings in index.ts. There is a test settings commented out in the source code. You can then set a fix timestamp (instead of the server's clock) and use a custom Webhook Signing Key.