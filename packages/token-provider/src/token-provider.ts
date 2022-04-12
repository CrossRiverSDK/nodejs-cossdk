import { TokenProviderConfiguration } from "./interfaces/token-provider-configuration";
import { Issuer } from "openid-client";
import AwaitLock from "await-lock";
import { TokenRequest } from "./interfaces/token-request";
import { AggregateError } from "@cossdk/common";

const NodeCache = require("node-cache");

export class TokenProvider
{
    config: TokenProviderConfiguration;
    cache: any;
    lock: AwaitLock;

    constructor(config:TokenProviderConfiguration) {
        this.config = config;
        this.cache = new NodeCache();
        this.lock = new AwaitLock();
    }

    async getJwtToken(tokenRequest?: TokenRequest):Promise<string> {
        let request = tokenRequest ?? {} as TokenRequest;
        request.clientId = request.clientId ?? this.config.clientId;
        request.clientSecret = request.clientSecret ?? this.config.clientSecret;
        request.scopes = request.scopes ?? this.config.scopes;
        let authorityUrl = this.config.authorityUrl;

        let errors:Array<Error> = [];
        if (!request.clientId)
            errors.push(new Error("clientId is null or undefined"));
        if (!request.clientSecret)
            errors.push(new Error("clientSecret is null or undefined"));
        if (!authorityUrl)
            errors.push(new Error("authorityUrl is null or undefined"));

        if (errors.length > 0)
            throw new AggregateError(errors);
        else
        {
            try {
                await this.lock.acquireAsync();

                let key = `${request.clientId}-${request.scopes}`;
                let token = this.cache.get(key);

                if (token)
                    return token;

                let issuer = await Issuer.discover(authorityUrl);

                let client = new issuer.Client({
                    client_id: request.clientId,
                    client_secret: request.clientSecret,
                }); // => Client

                let tokenSet = await client.grant({
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
}