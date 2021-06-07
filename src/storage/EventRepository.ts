import { ExpectedPayload } from "../ExpectedPayload";

export default interface EventRepository {

    persistMailEvent(payload: ExpectedPayload): Promise<void>;
}