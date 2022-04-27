import { QueryString } from "@cossdk/common";
import { TokenProviderConfiguration } from "../interfaces/token-provider-configuration";
import { TokenProvider } from "./token-provider";
import { request, RequestOptions } from "https";

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

export function executeApiRaw(resource: string, method: string, body?: string, query?: QueryString, apiKey?: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        try
        {
            const key = apiKey ?? '';
            const tokenProvider = tokenProviders.get(key);

            if (!tokenProvider)
                throw new Error("Can not find token provider.  Please call initializeTokenProvider with the appropriate apiKey first.");
        
            tokenProvider.getJwtToken().then(token => {
                try
                {
                    const requestOptions:RequestOptions = {
                        method: method,
                        rejectUnauthorized: false
                    };

                    requestOptions.headers = {
                        'Authorization': `Bearer ${token}`
                    };

                    if (body) {
                        requestOptions.headers['Content-Type'] = 'application/json';
                        requestOptions.headers['Content-Length'] = body.length;
                    }

                    if (query)
                        resource += query.toString(resource.indexOf('?') > -1 ? '' : '?');

                    const req = request(resource, requestOptions, res => {
                        let statusCode = res.statusCode;
                        //if (res.statusCode < 200 || res.statusCode >= 300)
                        //    return reject(new Error(``));
                        const body:Uint8Array[] = [];

                        res.on('data', chunk => body.push(chunk));
                        res.on('end', () => {
                            try{
                                const str = Buffer.concat(body).toString();
                                if (!statusCode)
                                    statusCode = 0;
    
                                if (statusCode < 200 || statusCode >= 300)
                                    reject(new Error(`An error occured calling resource: ${resource} with method ${method} and body ${body}.  statusCode: ${statusCode}. response: ${str}`));
                                else
                                    resolve(str);
                            } catch(e) {
                                reject(e);
                            }
                        });
                        res.on('error', () =>{
                            const str = Buffer.concat(body).toString();
                            if (!statusCode)
                                statusCode = 0;

                            reject(new Error(`An error occured calling resource: ${resource} with method ${method} and body ${body}.  statusCode: ${statusCode}. response: ${str}`));
                        });
                    });

                    if (body) {
                        req.write(body);
                    }

                    req.on('error', e => {
                        reject(e);
                    })

                    req.on('timeout', () => {
                        reject(new Error(`An timeout occured calling resource: ${resource} with method ${method} and body ${body}.`));
                    })

                    req.end();
                }
                catch(e)
                {
                    reject(e);
                }
            })
            .catch(reason => {
                reject(reason)
            });
        }
        catch(e)
        {
            reject(e);
        }
    });
}
