import { Hooks } from "@cossdk/hooks";
import { PaymentsHookEventType } from "../../enums/payments-hook-event-types";
import { CardPaymentsConfiguration } from "../../models/card-payments-configuration";
import { Cards } from "./cards";
import { Enums } from "./enums";
import { IFrameConfiguration } from "./iframe-configuration";
import { OneTimeCodes } from "./one-time-codes";
import { PullTransactions } from "./pull-transactions";
import { PushTransactions } from "./push-transactions";

export class CardPayments {
  Cards: Cards;
  Enums: Enums;
  IFrameConfiguration: IFrameConfiguration;
  Hooks: Hooks<PaymentsHookEventType>;
  OneTimeCodes: OneTimeCodes;
  PushTransactions: PushTransactions;
  PullTransactions: PullTransactions;

  constructor(config: CardPaymentsConfiguration) {
    this.Cards = new Cards(config);
    this.Enums = new Enums(config);
    this.IFrameConfiguration = new IFrameConfiguration(config);
    this.OneTimeCodes = new OneTimeCodes(config);
    this.PushTransactions = new PushTransactions(config);
    this.PullTransactions = new PullTransactions({
      apiKey: config.apiKey,
      baseUrl: config.pullTransactionsUrl
    });

    this.Hooks = new Hooks<PaymentsHookEventType>({
      apiKey: config.apiKey,
      baseUrl: config.hooksUrl,
      defaultApplicationName: 'p2p'
    });
  }  
}