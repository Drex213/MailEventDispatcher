import { LambdaResponse } from "..";

export default interface Request {

    providerName: string;
    isValid: boolean;
    getResponseForSuccess(): LambdaResponse;
    getResponseForInvalidRequest(): LambdaResponse;
    getResponseForError(): LambdaResponse;
}