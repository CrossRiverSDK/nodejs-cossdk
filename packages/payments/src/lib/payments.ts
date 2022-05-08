import { CosEnvironment, getAuthorityUrl, InitializationConfiguration } from '@cossdk/common';
import { Hooks } from '@cossdk/hooks';
import { initializeTokenProvider } from '@cossdk/token-provider';
import { PaymentsHookEventType } from '../enums/payments-hook-event-types';
import { CardPayments } from './card-payments/card-payments';


export class CrbCosPayments {

  private static apiKey = 'payments';

  static CardPayments: CardPayments
 
  static initialize(configuration: InitializationConfiguration) {

    initializeTokenProvider({
      apiKey: CrbCosPayments.apiKey,
      authorityUrl: getAuthorityUrl(configuration.environment),
      clientId: configuration.clientId,
      clientSecret: configuration.clientSecret
    });

    CrbCosPayments.CardPayments = new CardPayments({
      apiKey: CrbCosPayments.apiKey,
      baseUrl: CrbCosPayments.getBaseUrl(configuration.environment),
      pullTransactionsUrl: CrbCosPayments.getPullTransactionsUrl(configuration.environment),
      hooksUrl: CrbCosPayments.getHooksUrl(configuration.environment),
    });
  }

  static getBaseUrl(environment: CosEnvironment): string
  {
    switch(environment)
    {
        case CosEnvironment.Production:
            return 'https://pushtopay.crbnj.net/';
        case CosEnvironment.Sandbox:
            return 'https://pushtopaystaging.crbnj.net/';
        default:
            throw new Error(`Unrecognized environment: ${environment}`);
    }
  }
  
  static getPullTransactionsUrl(environment: CosEnvironment): string
  {
    switch(environment)
    {
        case CosEnvironment.Production:
            return 'https://p2ppulltransaction.crbcloud.com/';
        case CosEnvironment.Sandbox:
            return 'https://p2ppulltransactionstg.crbcloud.com/';
        default:
            throw new Error(`Unrecognized environment: ${environment}`);
    }
  } 
    
  static getHooksUrl(environment: CosEnvironment): string
  {
    switch(environment)
    {
        case CosEnvironment.Production:
            return 'https://p2phook.crbcloud.com/';
        case CosEnvironment.Sandbox:
            return 'https://p2phookstg.crbcloud.com/';
        default:
            throw new Error(`Unrecognized environment: ${environment}`);
    }
  }  
}