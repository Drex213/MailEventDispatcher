import EventRepository from "./EventRepository";
import { DynamoDB } from 'aws-sdk';
import StorableEvent from "./StorableEvent";
import { ExpectedPayload } from "../ExpectedPayload";

export default class DynamoDbRepository implements EventRepository {

    private dynamo: DynamoDB.DocumentClient;

    constructor()
    {
        this.dynamo = new DynamoDB.DocumentClient();
    }

    async persistMailEvent(rawWebhook: ExpectedPayload) {
        let event = rawWebhook as StorableEvent;
        event.id = event["event-data"].id;
        await this.dynamo.put({
            TableName: process.env.dynamoDbTableName,
            Item: event
        }).promise();
    }
}