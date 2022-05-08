import { ApiConfiguration } from "@cossdk/common";
import { isTokenProviderInitialized } from "@cossdk/token-provider";

export abstract class LendingBase {

    constructor(private options: ApiConfiguration)
    {
      if (!options.apiKey)
        throw new Error('You must supply an api key.');
  
      if (!isTokenProviderInitialized(options.apiKey))
        throw new Error('You must call initializeTokenProvider(config) before instantiating Hooks.');
  
      if (!options.baseUrl)
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
        if (!this.options.baseUrl)
            throw new Error('You must initialize the lending sdk by calling CrbCosLending.initialize().');
    }
}