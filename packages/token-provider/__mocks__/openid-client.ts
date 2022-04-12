const randomstring = require("randomstring");
import * as crypto from 'crypto';

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
    new (metadata: ClientMetadata, jwks?: { keys: object }, options?: ClientOptions): TClient;
}

export class MockClient
{
    metadata: ClientMetadata;

    constructor(metadata: ClientMetadata, jwks?: { keys: object }, options?: ClientOptions)
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

export interface ClientMetadata {
    // important
    client_id: string;
    id_token_signed_response_alg?: string;
    token_endpoint_auth_method?: ClientAuthMethod;
    client_secret?: string;
    redirect_uris?: string[];
    response_types?: ResponseType[];
    post_logout_redirect_uris?: string[];
    default_max_age?: number;
    require_auth_time?: boolean;
    tls_client_certificate_bound_access_tokens?: boolean;
    request_object_signing_alg?: string;
  
    // less important
    id_token_encrypted_response_alg?: string;
    id_token_encrypted_response_enc?: string;
    introspection_endpoint_auth_method?: ClientAuthMethod;
    introspection_endpoint_auth_signing_alg?: string;
    request_object_encryption_alg?: string;
    request_object_encryption_enc?: string;
    revocation_endpoint_auth_method?: ClientAuthMethod;
    revocation_endpoint_auth_signing_alg?: string;
    token_endpoint_auth_signing_alg?: string;
    userinfo_encrypted_response_alg?: string;
    userinfo_encrypted_response_enc?: string;
    userinfo_signed_response_alg?: string;
    authorization_encrypted_response_alg?: string;
    authorization_encrypted_response_enc?: string;
    authorization_signed_response_alg?: string;
  
    [key: string]: unknown;
}
  
export type ClientAuthMethod =
  | 'client_secret_basic'
  | 'client_secret_post'
  | 'client_secret_jwt'
  | 'private_key_jwt'
  | 'tls_client_auth'
  | 'self_signed_tls_client_auth'
  | 'none';

export interface ClientOptions {
    additionalAuthorizedParties?: string | string[];
}

export interface GrantBody {
    grant_type: string;
  
    [key: string]: unknown;
}

export interface GrantExtras {
    clientAssertionPayload?: object;
    DPoP?: DPoPInput;
}
  
export type DPoPInput = crypto.KeyObject | Parameters<typeof crypto.createPrivateKey>[0];

export class TokenSet {
    access_token?: string;
    token_type?: string;
    id_token?: string;
    refresh_token?: string;
    expires_in?: number;
    expires_at?: number;
    session_state?: string;
    scope?: string;  
    
    [key: string]: unknown;
}

  