export default class MailgunResponse {

    static forSuccess() {
        return {
            statusCode: 200,
            body: "Success",
        }
    }

    static forNotAcceptable() {
        return {
            statusCode: 406,
            body: "Not Acceptable",
        }
    }

    static forError() {
        return {
            statusCode: 500,
            body: "Internal Server Error",
        }
    }
}