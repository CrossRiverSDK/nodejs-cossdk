import { TokenRequest } from "./token-request";

export interface TokenProviderConfiguration extends TokenRequest
{
    apiKey: string;
    authorityUrl:string;
}