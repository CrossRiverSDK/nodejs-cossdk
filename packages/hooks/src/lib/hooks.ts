import { stringIsNullOrEmpty } from "@cossdk/common";
import { initializeTokenProvider } from "@cossdk/token-provider";
import { HooksConfiguration } from "../models/hooks-configuration";
import { Events } from "./events";
import { Registrations } from "./registrations";
import { Types } from "./types";
import { Applications } from "./applications";

export class Hooks  {

  Applications: Applications;
  Types: Types;
  Registrations: Registrations;
  Events: Events;   

  constructor(config: HooksConfiguration) {
    if (stringIsNullOrEmpty(config.apiKey))
      throw new Error('You must supply an api key.');

    if (stringIsNullOrEmpty(config.baseUrl))
      throw new Error('You must supply a base url.');

    initializeTokenProvider(config, config.apiKey);

    this.Applications = new Applications(config);
    this.Types = new Types(config);
    this.Registrations = new Registrations(config);
    this.Events = new Events(config);
  }
}

