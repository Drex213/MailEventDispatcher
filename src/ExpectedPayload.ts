export interface ExpectedPayload {
    signature: ExpectedSignature;
    "event-data": ExpectedEventData;
}

export interface ExpectedSignature {
    timestamp: string;
    token: string;
    signature: string;
}

export interface ExpectedEventData {
    id: string,
    event: string,
    timestamp: number
}