import {
    ClientMetadata,
    ClientOptions,
    GrantBody,
    GrantExtras,
    TokenSet
} from "openid-client";
import * as jose from "jose";
const randomstring = require("randomstring");

export class Issuer
{
    Client: TypeOfGenericClient<MockClient>;

    constructor() {
        this.Client = MockClient;
    }

    static async discover(issuer: string): Promise<Issuer>
    {
        return new Issuer();
    }
}

export interface TypeOfGenericClient<TClient extends MockClient = MockClient> {
    new (metadata: ClientMetadata, jwks?: { keys: jose.JWK[] }, options?: ClientOptions): TClient;
}

export class MockClient
{
    metadata: ClientMetadata;

    constructor(metadata: ClientMetadata, jwks?: { keys: jose.JWK[] }, options?: ClientOptions)
    {
        this.metadata = metadata;
    }

    async grant(body: GrantBody, extras?: GrantExtras): Promise<TokenSet>
    {
        let tokenSet = new TokenSet();

        tokenSet.access_token = randomstring.generate();
        tokenSet.expires_in = 3600;

        return tokenSet;
    }
}