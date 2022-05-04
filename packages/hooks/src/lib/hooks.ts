import { stringIsNullOrEmpty } from "@cossdk/common";
import { initializeTokenProvider, isTokenProviderInitialized } from "@cossdk/token-provider";
import { HooksConfiguration } from "../models/hooks-configuration";
import { Events } from "./events";
import { Registrations } from "./registrations";
import { Types } from "./types";
import { Applications } from "./applications";

export class Hooks<THookEventType extends string>  {

  Applications: Applications;
  Types: Types<THookEventType>;
  Registrations: Registrations<THookEventType>;
  Events: Events;   

  constructor(config: HooksConfiguration) {
    if (stringIsNullOrEmpty(config.apiKey))
      throw new Error('You must supply an api key.');

    if (!isTokenProviderInitialized(config.apiKey))
      throw new Error('You must call initializeTokenProvider(config) before instantiating Hooks.');

    if (stringIsNullOrEmpty(config.baseUrl))
      throw new Error('You must supply a base url.');

    this.Applications = new Applications(config);
    this.Types = new Types(config);
    this.Registrations = new Registrations<THookEventType>(config);
    this.Events = new Events(config);
  }
}

