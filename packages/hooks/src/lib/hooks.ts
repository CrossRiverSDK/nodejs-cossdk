import { stringIsNullOrEmpty } from "@cossdk/common";
import { initializeTokenProvider } from "@cossdk/token-provider";
import { HooksConfiguration } from "../models/hooks-configuration";
import { HooksOptions } from "../models/hooks-options";
import { Events } from "./events";
import { Registrations } from "./registrations";
import { Types } from "./types";

export class Hooks implements HooksOptions {

  public baseUrl:string;
  
  public Events: Events;
  public Registrations: Registrations;
  public Types: Types;
  
  constructor()
  {
    this.baseUrl = '';
    this.Events = new Events(this);
    this.Registrations = new Registrations(this);
    this.Types = new Types(this);
  }

  initialize(config: HooksConfiguration, apiKey: string) {
    if (stringIsNullOrEmpty(apiKey))
      throw new Error('You must supply an api key.');

    if (stringIsNullOrEmpty(config.baseUrl))
      throw new Error('You must supply a base url.');

    initializeTokenProvider(config, apiKey);

    this.baseUrl = config.baseUrl;
  }
}

