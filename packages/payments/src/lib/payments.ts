import { CosEnvironment, getAuthorityUrl, InitializationConfiguration } from '@cossdk/common';
import { Hooks } from '@cossdk/hooks';
import { initializeTokenProvider } from '@cossdk/token-provider';
import { PaymentsHookEventType } from '../enums/payments-hook-event-types';


export class CrbCosPayments {

  private static apiKey = 'payments';

 
  static initialize(configuration: InitializationConfiguration) {

    const baseUrl = CrbCosPayments.getBaseUrl(configuration.environment);

    initializeTokenProvider({
      apiKey: CrbCosPayments.apiKey,
      authorityUrl: getAuthorityUrl(configuration.environment),
      clientId: configuration.clientId,
      clientSecret: configuration.clientSecret
    });

    // CrbCosLending.Hooks = new Hooks<LendingHookEventType>({
    //   apiKey: CrbCosLending.apiKey,
    //   baseUrl: baseUrl,
    //   defaultApplicationName: 'cos.lending'
    // });

    // CrbCosLending.CardPayments = new PreApproval({
    //   apiKey: CrbCosLending.apiKey,
    //   baseUrl: baseUrl
    // });
 
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