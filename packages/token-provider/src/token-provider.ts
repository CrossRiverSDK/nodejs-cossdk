import { TokenProviderConfiguration } from "./interfaces/token-provider-configuration";
import { Issuer } from "openid-client";
import AwaitLock from "await-lock";
import { TokenRequest } from "./interfaces/token-request";
import { AggregateError, stringIsNullOrEmpty } from '@cossdk/common';

const NodeCache = require("node-cache");

export class TokenProvider
{
    config: TokenProviderConfiguration;
    cache;
    lock: AwaitLock;

    constructor(config:TokenProviderConfiguration) {
        this.config = config;
        this.cache = new NodeCache();
        this.lock = new AwaitLock();
    }

    async getJwtToken(tokenRequest?: TokenRequest):Promise<string> {

        const request = this.getTokenRequest(tokenRequest) ?? this.config;
        const authorityUrl = this.config.authorityUrl;

        const errors:Array<Error> = [];
        if (stringIsNullOrEmpty(request.clientId))
            errors.push(new Error("clientId is empty, null or undefined"));
        if (stringIsNullOrEmpty(request.clientSecret))
            errors.push(new Error("clientSecret is empty, null or undefined"));
        if (stringIsNullOrEmpty(authorityUrl))
            errors.push(new Error("authorityUrl is empty, null or undefined"));

        if (errors.length > 0)
            throw new AggregateError(errors);
        else
        {
            try {
                await this.lock.acquireAsync();

                const key = `${request.clientId}-${request.scopes}`;
                const token = this.cache.get(key);

                if (token)
                    return token;

                const issuer = await Issuer.discover(authorityUrl);

                const client = new issuer.Client({
                    client_id: request.clientId!,
                    client_secret: request.clientSecret,
                }); // => Client

                const tokenSet = await client.grant({
                    'grant_type': 'client_credentials',
                    'scope': request.scopes
                });

                if (!tokenSet.access_token)
                    throw new Error("no access token returned from endpoint.");

                if (!tokenSet.expires_in)
                    throw new Error("no expiration date returned from endpoint.");

                this.cache.set(key, tokenSet.access_token, tokenSet.expires_in - 60);

                return tokenSet.access_token;
            }
            finally {
                this.lock.release();
            }
        }
    }

    private getTokenRequest(request?: TokenRequest):TokenRequest | undefined
    {
        if (request)
        {
            request.clientId = request.clientId ?? this.config.clientId;
            request.clientSecret = request.clientSecret ?? this.config.clientSecret;
            request.scopes = request.scopes ?? this.config.scopes;
        }

        return request;
    }
}