import { CosEnvironment, getAuthorityUrl, InitializationConfiguration } from '@cossdk/common';
import { Hooks } from '@cossdk/hooks';

export class CrbCosLending {

  private static apiKey = 'lending';

  static Hooks: Hooks;

  static initialize(configuration: InitializationConfiguration) {

    const baseUrl = CrbCosLending.getBaseUrl(configuration.environment);

    CrbCosLending.Hooks = new Hooks({
      authorityUrl: getAuthorityUrl(configuration.environment),
      clientId: configuration.clientId,
      clientSecret: configuration.clientId,
      baseUrl: baseUrl,
      apiKey: CrbCosLending.apiKey,
    });

  }

  static getBaseUrl(environment: CosEnvironment): string
  {
    switch(environment)
    {
        case CosEnvironment.Production:
            return 'https://lending.crbcos.com';
        case CosEnvironment.Sandbox:
            return 'https://localhost:5001';
        default:
            throw new Error(`Unrecognized environment: ${environment}`);
    }
  }
  
}

