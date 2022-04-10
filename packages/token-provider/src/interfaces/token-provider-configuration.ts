import {Url} from "url";

export interface ITokenProviderConfiguration
{
    authorityUrl:string;
    clientId:string;
    clientSecret:string;
    scopes:string;
}