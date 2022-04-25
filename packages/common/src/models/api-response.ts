import { ErrorDetail } from "./error-detail";

export interface ApiResponse<T>
{
    isSuccessful: boolean;
    result: T;
    version: string;
    httpStatusCode: number;
    errors: ErrorDetail[]
}