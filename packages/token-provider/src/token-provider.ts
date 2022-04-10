import {ITokenProviderConfiguration} from "./interfaces/token-provider-configuration";
import {Issuer} from "openid-client";
import AwaitLock from "await-lock";
const NodeCache = require("node-cache");

export class TokenProvider
{
    config: ITokenProviderConfiguration;
    cache: any;
    lock: AwaitLock;

    constructor(config:ITokenProviderConfiguration) {
        this.config = config;
        this.cache = new NodeCache();
        this.lock = new AwaitLock();
    }

    async getJwtToken(clientId:string = null, clientSecret:string = null, scopes:string = null):Promise<string> {
        clientId = clientId ?? this.config.clientId;
        clientSecret = clientSecret ?? this.config.clientSecret;
        scopes = scopes ?? this.config.scopes;
        let authorityUrl = this.config.authorityUrl;

        let errors:Array<Error> = [];
        if (!clientId)
            errors.push(new Error("clientId is null or undefined"));
        if (!clientSecret)
            errors.push(new Error("clientSecret is null or undefined"));
        if (!authorityUrl)
            errors.push(new Error("authorityUrl is null or undefined"));

        if (errors.length > 0)
            throw new AggregateError(errors);
        else
        {
            try {
                await this.lock.acquireAsync();

                let key = `${clientId}-${scopes}`;
                let token = this.cache.get(key);

                if (token)
                    return token;

                let issuer = await Issuer.discover(authorityUrl);

                let client = new issuer.Client({
                    client_id: clientId,
                    client_secret: clientSecret,
                }); // => Client

                let tokenSet = await client.grant({
                    'grant_type': 'client_credentials',
                    'scope': scopes
                });

                this.cache.set(key, tokenSet.access_token, tokenSet.expires_in - 60);

                return tokenSet.access_token;
            }
            finally {
                this.lock.release();
            }
        }
    }
}
