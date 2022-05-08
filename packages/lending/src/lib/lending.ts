import { CosEnvironment, getAuthorityUrl, InitializationConfiguration } from '@cossdk/common';
import { Hooks } from '@cossdk/hooks';
import { initializeTokenProvider } from '@cossdk/token-provider';
import { LendingHookEventType } from '../enums/lending-hook-event-types';
import { PreApproval } from './preapproval';
import { Rtp } from './rtp';

export class CrbCosLending {

  private static apiKey = 'lending';

  static Hooks: Hooks<LendingHookEventType>;
  static PreApproval: PreApproval;
  static Rtp: Rtp;

  static initialize(configuration: InitializationConfiguration) {

    const baseUrl = CrbCosLending.getBaseUrl(configuration.environment);

    initializeTokenProvider({
      apiKey: CrbCosLending.apiKey,
      authorityUrl: getAuthorityUrl(configuration.environment),
      clientId: configuration.clientId,
      clientSecret: configuration.clientSecret
    });

    CrbCosLending.Hooks = new Hooks<LendingHookEventType>({
      apiKey: CrbCosLending.apiKey,
      baseUrl: baseUrl,
      defaultApplicationName: 'cos.lending'
    });

    CrbCosLending.PreApproval = new PreApproval({
      apiKey: CrbCosLending.apiKey,
      baseUrl: baseUrl
    });

    CrbCosLending.Rtp = new Rtp({
      apiKey: CrbCosLending.apiKey,
      baseUrl: baseUrl
    });
  }

  static getBaseUrl(environment: CosEnvironment): string
  {
    switch(environment)
    {
        case CosEnvironment.Production:
            return 'https://lending.crbcos.com';
        case CosEnvironment.Sandbox:
            return 'https://lendingstg.crbcos.com';
        default:
            throw new Error(`Unrecognized environment: ${environment}`);
    }
  }  
}