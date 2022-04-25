import { QueryString } from "@cossdk/common";
import { TokenProviderConfiguration } from "../interfaces/token-provider-configuration";
import { TokenProvider } from "./token-provider";

const tokenProviders = new Map<string, TokenProvider>();

export function initializeTokenProvider(config: TokenProviderConfiguration, apiKey?: string) {
    const key = apiKey ?? '';

    if (tokenProviders.has(key))
        throw new Error("You can not initialize the same token provider twice");

    tokenProviders.set(key, new TokenProvider(config));
}

export async function executeGetApi<TResponse>(resource: string, query?: QueryString, apiKey?: string): Promise<TResponse> {

    const res = await executeApiRaw(resource, 'GET', undefined, query, apiKey);

    return JSON.parse(res) as TResponse;
}

export async function executeApi<TReqeust, TResponse>(resource: string, method: string, request?: TReqeust, query?: QueryString, apiKey?: string): Promise<TResponse> {

    let body:string | undefined = undefined;

    if (request) {
        body = JSON.stringify(request);
    }

    const res = await executeApiRaw(resource, method, body, query, apiKey);

    return JSON.parse(res) as TResponse;
}

export async function executeApiRaw(resource: string, method: string, request?: string, query?: QueryString, apiKey?: string): Promise<string> {
    
    const key = apiKey ?? '';
    const tokenProvider = tokenProviders.get(key);
    if (!tokenProvider)
        throw new Error("Can not find token provider.  Please call initializeApi with the appropriate apiKey first.");

    const token = await tokenProvider.getJwtToken();
    const headers = new Headers({
        'Authorization': `Bearer ${token}`
    });

    const reqInit: RequestInit = {
        method: method,
        headers: headers
    };

    if (request) {
        headers.append('Content-Type', 'application/json');
        reqInit.body = request;
    }

    if (query)
        resource += query.toString(resource.indexOf('?') > -1 ? '' : '?');
    
    const res = await fetch(resource, reqInit);
    return await res.json();
}