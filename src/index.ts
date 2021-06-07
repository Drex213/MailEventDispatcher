import { ExpectedPayload } from "./ExpectedPayload";
import MailEventDispatcher from "./MailEventDispatcher";
import MailgunSettings from "./mailEvent/MailgunSettings";
import MailgunRequest from "./mailEvent/MailgunRequest";
import DynamoDbRepository from "./storage/DynamoDbRepository";
import SnsMessageQueue from "./messageQueue/SnsMessageQueue";

export interface LambdaRequest {
    body: string;
}

export interface LambdaResponse {
    statusCode: number;
    body: string;
}

export async function handler(event: LambdaRequest): Promise<LambdaResponse> {

    // Settings for Testing
    let settings: MailgunSettings = {
        currentTimeTimestamp: 1529006856,
        webhookSigningKey: "test_key"
    };

    // Settings for Deployment
    // let settings: MailgunSettings = {
    //     currentTimeTimestamp: Date.now() / 1000,
    //     webhookSigningKey: process.env.mailgunWebhookSigningKey
    // };

    let payload = JSON.parse(event.body) as ExpectedPayload;

    // Build the dependency tree
    let dispatcher = new MailEventDispatcher(
        payload, 
        new MailgunRequest(payload, settings),
        new DynamoDbRepository(),
        new SnsMessageQueue());

    let response = await dispatcher.processRequest();
    return response;
}
