import Message from "./Message";
import MessageQueue from "./MessageQueue";
import { SNS } from 'aws-sdk';
import { ExpectedPayload } from "../ExpectedPayload";
import Request from "../mailEvent/Request";

export default class SnsMessageQueue implements MessageQueue {

    private sns: SNS;
    private topicArn: string;

    constructor() {
        this.sns = new SNS();
        this.topicArn = process.env.snsTopicArn;
    }

    async publish(payload: ExpectedPayload, request: Request) {
        let message =  new Message(request.providerName, Number(payload.signature.timestamp), `email ${payload["event-data"].event}`);

        let input: SNS.PublishInput = {
            Subject: `New mail event with timestamp ${message.timestamp}`,
            Message: JSON.stringify(message, null, "\t"),
            TopicArn: this.topicArn
        };
        await this.sns.publish(input).promise();
    }
}