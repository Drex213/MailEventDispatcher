import { LambdaResponse } from ".";
import { ExpectedPayload } from "./ExpectedPayload";
import Request from "./mailEvent/Request";
import MessageQueue from "./messageQueue/MessageQueue";
import EventRepository from "./storage/EventRepository";

export default class MailEventDispatcher {

    constructor(
        private payload: ExpectedPayload, 
        private request: Request, 
        private repository: EventRepository,
        private messageQueue: MessageQueue)
    {
    }

    async processRequest(): Promise<LambdaResponse> {
        try {
            if (!this.request.isValid)
                return this.request.getResponseForInvalidRequest();

            await this.saveRawWebhook();
            await this.publishToMessageQueue();
            return this.request.getResponseForSuccess();

        } catch (error) {
            // Error details are automatically logged by Lambda
            return this.request.getResponseForError();
        }
    }

    private async saveRawWebhook() {
        await this.repository.persistMailEvent(this.payload);
    }

    private async publishToMessageQueue() {
        await this.messageQueue.publish(this.payload, this.request);
    }
}