import { ErrorDetail } from "./error-detail";


export class ApiResponse<T>
{
    constructor(res: T)
    {
        this.isSuccessful = false;
        this.result = res;
        this.version = '';
        this.statusCode = NaN;
        this.errors = [];
    }

    isSuccessful: boolean;
    result:T;
    version: string;
    statusCode: number;
    errors: ErrorDetail[];
}