import { ApiConfiguration, stringIsEmpty, stringIsNullOrEmpty } from "@cossdk/common";
import { isTokenProviderInitialized } from "@cossdk/token-provider";

export abstract class LendingBase {

    constructor(private options: ApiConfiguration)
    {
      if (stringIsNullOrEmpty(options.apiKey))
        throw new Error('You must supply an api key.');
  
      if (!isTokenProviderInitialized(options.apiKey))
        throw new Error('You must call initializeTokenProvider(config) before instantiating Hooks.');
  
      if (stringIsNullOrEmpty(options.baseUrl))
        throw new Error('You must supply a base url.');
    }

    protected get baseUrl() {
        return this.options.baseUrl.replace(/\/+$/, '');
    }

    protected get apiKey() {
        return this.options.apiKey;
    }

    protected validateInitialization()
    {
        if (stringIsEmpty(this.options.baseUrl))
            throw new Error('You must initialize the lending sdk by calling CrbCosLending.initialize().');
    }
}