import * as crypto from "crypto";
import { ExpectedSignature } from "../ExpectedPayload";
import MailgunSettings from "./MailgunSettings";

export default class MailgunSignature {

    private static readonly maxTimestampAge = 60; // in seconds
    private static readonly minTimestamp = 1609506061; // 2021.01.01

    timestamp: number;
    token: string;
    signature: string;

    constructor(jObject: ExpectedSignature)
    {
        this.timestamp = Number(jObject.timestamp);
        this.token = jObject.token;
        this.signature = jObject.signature;
    }

    public Validate(settings: MailgunSettings): boolean {
        return (
            this.ValidateTimestamp(settings) &&
            this.ValiateToken() &&
            this.ValidateSignature(settings)
        );
    }

    private ValidateTimestamp(settings: MailgunSettings): boolean {

        if (!this.timestamp || this.timestamp < MailgunSignature.minTimestamp) {
            console.info(`Invalid request: Timestamp "${this.timestamp}" is invalid.`);
            return false;
        }

        if (this.timestamp < settings.currentTimeTimestamp - MailgunSignature.maxTimestampAge) {
            console.info("Invalid request: Timestamp too old.");
            return false;
        }

        return true;
    }

    private ValiateToken(): boolean {
        if (!this.token || this.token.length < 50) {
            console.info("Invalid request: Token is less than 50 char long.");
            return false;
        }

        return true;
    }

    private ValidateSignature(settings: MailgunSettings): boolean {
        let value = this.timestamp + this.token;  
        let hash = crypto.createHmac('sha256', settings.webhookSigningKey)  
                   .update(value)
                   .digest('hex');
        
        if (hash != this.signature) {  
            console.log('Invalid request: Wrong signature.');
            return false;
        }

        return true;
    }
}