import { stringIsNullOrEmpty } from "@cossdk/common";
import { initializeTokenProvider } from "@cossdk/token-provider";
import { HooksConfiguration } from "../models/hooks-configuration";
import { Events } from "./events";
import { Registrations } from "./registrations";
import { Types } from "./types";
import { Applications } from "./applications";

export class Hooks  {

  static Applications: Applications;
  static Types: Types;
  static Registrations: Registrations;
  static Events: Events;   

  static initialize(config: HooksConfiguration) {
    if (stringIsNullOrEmpty(config.apiKey))
      throw new Error('You must supply an api key.');

    if (stringIsNullOrEmpty(config.baseUrl))
      throw new Error('You must supply a base url.');

    initializeTokenProvider(config, config.apiKey);

    Hooks.Applications = new Applications(config);
    Hooks.Types = new Types(config);
    Hooks.Registrations = new Registrations(config);
    Hooks.Events = new Events(config);
  }
}

