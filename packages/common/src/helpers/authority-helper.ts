import { CosEnvironment } from "../enums/cos-environment";

export function getAuthorityUrl(environment: CosEnvironment): string
{
    switch(environment)
    {
        case CosEnvironment.Production:
            return 'https://oauth.crbnj.net';
        case CosEnvironment.Sandbox:
            return 'https://oauthtest.crbnj.net';
        default:
            throw new Error(`Unrecognized environment: ${environment}`);
    }
}