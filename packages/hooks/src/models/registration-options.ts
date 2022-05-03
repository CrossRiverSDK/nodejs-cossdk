import { AuthenticationType } from "../enums/authentication-type";
import { HookType } from "../enums/hook-type";
import { HttpMethod } from "@cossdk/common";

export type RegistrationOptions = WebRegistrationOptions | RabbitMqRegistrationOptions | SqsRegistrationOptions | SlackRegistrationOptions | EmailRegistrationOptions;
export type AuthenticationOptions = OidcAuthenticationOptions | BasicAuthenticationOptions | NoAuthenticationOptions;

export interface IRegistrationOptions
{
    hookType: HookType;
}

export class WebRegistrationOptions implements IRegistrationOptions
{
    constructor(httpMethod?: HttpMethod, uri?: string, authenticationOptions?: AuthenticationOptions, headers?: Map<string, Array<string>>)
    {
        this.httpMethod = httpMethod ? httpMethod : HttpMethod.GET;
        this.uri = uri ? uri : '';
        this.authenticationOptions = authenticationOptions ? authenticationOptions : new NoAuthenticationOptions();
        this.headers = headers;
    }

    hookType: HookType = HookType.Web;
    httpMethod: HttpMethod;
    uri: string;
    authenticationOptions: AuthenticationOptions;
    headers?: Map<string, Array<string>>;
}

export class RabbitMqRegistrationOptions implements IRegistrationOptions
{
    constructor(destinationEndpoint?: string, rabbitMQConnectionString?: string)
    {
        this.destinationEndpoint = destinationEndpoint ? destinationEndpoint : '';
        this.rabbitMQConnectionString = rabbitMQConnectionString;
    }

    hookType: HookType = HookType.RabbitMq;
    destinationEndpoint: string;
    rabbitMQConnectionString?: string;
}

export class SqsRegistrationOptions implements IRegistrationOptions
{
    constructor(
        queueUrl?: string, 
        accessKeyId?: string,
        secretAccessKey?: string,
        region?: string,
        messageGroupId?: string,
        useMessageDeduplicationId?: boolean,
        messageAttributes?: Array<AwsMessageAttribute>)
    {
        this.queueUrl = queueUrl ? queueUrl : '';
        this.accessKeyId = accessKeyId ? accessKeyId : '';
        this.secretAccessKey = secretAccessKey ? secretAccessKey : '';
        this.region = region ? region : '';
        this.messageGroupId = messageGroupId;
        this.useMessageDeduplicationId = useMessageDeduplicationId;
        this.messageAttributes = messageAttributes ? messageAttributes : [];
    }

    hookType: HookType = HookType.Sqs;
    queueUrl: string;
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    messageGroupId?: string;
    useMessageDeduplicationId?: boolean;
    messageAttributes?: Array<AwsMessageAttribute>;
}

export class SlackRegistrationOptions implements IRegistrationOptions
{
    constructor(authToken?: string, channel?: string)
    {
        this.authToken = authToken ? authToken : '';
        this.channel = channel ? channel : '';
    }

    hookType: HookType = HookType.Slack;
    authToken: string;
    channel: string;
}

export class EmailRegistrationOptions implements IRegistrationOptions
{
    constructor()
    {
        this.to = [];
        this.cc = [];
        this.bcc = [];
    }

    hookType: HookType = HookType.Email;
    to: Array<string>;
    cc: Array<string>;
    bcc: Array<string>;
}

export class AwsMessageAttribute
{
    constructor(name: string, value: string, type?: string)
    {
        this.name = name;
        this.value = value;

        if (type)
            this.type = type;
        else
            this.type = 'String';
    }

    name: string;
    value: string;
    type?: string;
}

export interface AuthenticationOptionsBase
{
    authenticationType: AuthenticationType;
}

export class NoAuthenticationOptions implements AuthenticationOptionsBase
{
    authenticationType: AuthenticationType = AuthenticationType.None;
}

export class BasicAuthenticationOptions implements AuthenticationOptionsBase
{
    constructor(username: string, password?: string)
    {
        this.username = username;
        this.password = password;
    }

    authenticationType: AuthenticationType = AuthenticationType.Basic;
    username: string
    password?: string
}

export class OidcAuthenticationOptions implements AuthenticationOptionsBase
{
    constructor(authorityUrl: string, clientId: string, clientSecret: string, scope?: string)
    {
        this.authorityUrl = authorityUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.scope = scope;
    }

    authenticationType: AuthenticationType = AuthenticationType.Oidc;
    authorityUrl: string;
    clientId: string;
    clientSecret: string;
    scope?: string;
}
