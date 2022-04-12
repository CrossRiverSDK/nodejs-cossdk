import { TokenRequest } from "./token-request";

export interface TokenProviderConfiguration extends TokenRequest
{
    authorityUrl:string;
}