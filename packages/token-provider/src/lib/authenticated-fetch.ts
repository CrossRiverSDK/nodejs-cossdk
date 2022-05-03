/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpError, HttpMethod, QueryString } from "@cossdk/common";
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

export async function executeGetApi<TResult>(resource: string, query?: QueryString, mapper?: (obj:TResult) => void, apiKey?: string): Promise<TResult> {
    const resRaw = await executeApiRaw(resource, HttpMethod.GET, undefined, query, apiKey);
    const anonRes = JSON.parse(resRaw);

    if (!mapper)
        mapper = obj => obj;

    mapper(anonRes);

    return anonRes;
}

export async function executeApi<TReqeust, TResult>(resource: string, method: HttpMethod, request?: TReqeust, query?: QueryString, mapper?: (obj:TResult) => void, apiKey?: string): Promise<TResult> {

    let body:string | undefined = undefined;

    if (request) 
        body = JSON.stringify(request);

    const resRaw = await executeApiRaw(resource, method, body, query, apiKey);
    const anonRes = JSON.parse(resRaw);

    if (!mapper)
        mapper = obj => obj;

    mapper(anonRes);

    return anonRes;
}

export function executeApiRaw(resource: string, method: HttpMethod, body?: string, query?: QueryString, apiKey?: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        try
        {
            const key = apiKey ?? '';
            const tokenProvider = tokenProviders.get(key);

            if (!tokenProvider)
                throw new HttpError("Can not find token provider.  Please call initializeTokenProvider with the appropriate apiKey first.");
        
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
                        const body:Uint8Array[] = [];
                        const statusCode = res.statusCode;

                        res.on('data', chunk => body.push(chunk));
                        res.on('end', () => {
                            try{
                                const str = Buffer.concat(body).toString();

                                if (!statusCode || statusCode < 200 || statusCode >= 300)
                                    reject(new HttpError(
                                        `An error occured calling resource: ${resource} with method ${method} and body ${body}.  statusCode: ${statusCode}. response: ${str}`,
                                        statusCode,
                                        str
                                    ));
                                else
                                    resolve(str);
                            } catch(e) {
                                reject(e);
                            }
                        });
                        res.on('error', () =>{
                            const str = Buffer.concat(body).toString();
                            reject(new HttpError(
                                `An error occured calling resource: ${resource} with method ${method} and body ${body}.  statusCode: ${statusCode}. response: ${str}`,
                                statusCode,
                                str
                            ));
                        });
                    });

                    if (body) {
                        req.write(body);
                    }

                    req.on('error', e => {
                        reject(e);
                    })

                    req.on('timeout', () => {
                        reject(new HttpError(
                            `An timeout occured calling resource: ${resource} with method ${method} and body ${body}.`
                        ));
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
