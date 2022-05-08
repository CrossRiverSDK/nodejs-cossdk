export class HttpError extends Error
{
    statusCode:number;
    responseBody:string;

    constructor(message?:string, statusCode?:number, responseBody?:string) {
        super(message);

        this.statusCode = statusCode ? statusCode : NaN;
        this.responseBody = responseBody ? responseBody : '';
    }
} 