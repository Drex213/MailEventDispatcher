import { LambdaResponse } from "..";
import { ExpectedEventData, ExpectedPayload } from "../ExpectedPayload";
import MailgunResponse from "./MailgunResponse";
import MailgunSettings from "./MailgunSettings";
import MailgunSignature from "./MailgunSignature";
import Request from "./Request";

export default class MailgunRequest implements Request {

    providerName = "Mailgun";
    isValid = false;
    rawWebhook: ExpectedPayload;
    signature: MailgunSignature;
    eventData: ExpectedEventData;

    constructor(payload: ExpectedPayload, settings: MailgunSettings) {
        this.rawWebhook = payload;
        this.signature = new MailgunSignature(payload.signature);
        this.eventData = payload["event-data"];
        this.isValid = this.signature.Validate(settings);
    }
    
    getResponseForSuccess(): LambdaResponse {
        return MailgunResponse.forSuccess();
    }
    
    getResponseForInvalidRequest(): LambdaResponse {
        return MailgunResponse.forNotAcceptable();
    }

    getResponseForError(): LambdaResponse {
        return MailgunResponse.forError();
    }
}