import { ExpectedPayload } from "../ExpectedPayload";
import Request from "../mailEvent/Request";

export default interface MessageQueue {

    publish(payload: ExpectedPayload, request: Request): Promise<void>;
}