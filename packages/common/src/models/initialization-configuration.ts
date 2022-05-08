import { CosEnvironment } from "../enums/cos-environment";

export interface InitializationConfiguration
{
    clientId: string;
    clientSecret: string;
    environment: CosEnvironment;
}