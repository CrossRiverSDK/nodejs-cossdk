import { CosEnvironment, getAuthorityUrl, InitializationConfiguration } from '@cossdk/common';
import { Hooks } from '@cossdk/hooks';
import { LendingHookEventType } from '../enums/lending-hook-event-types';

export class CrbCosLending {

  private static apiKey = 'lending';

  static Hooks: Hooks<LendingHookEventType>;

  static initialize(configuration: InitializationConfiguration) {

    const baseUrl = CrbCosLending.getBaseUrl(configuration.environment);

    CrbCosLending.Hooks = new Hooks<LendingHookEventType>({
      authorityUrl: getAuthorityUrl(configuration.environment),
      clientId: configuration.clientId,
      clientSecret: configuration.clientSecret,
      baseUrl: baseUrl,
      apiKey: CrbCosLending.apiKey,
      defaultApplicationName: 'cos.lending'
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

