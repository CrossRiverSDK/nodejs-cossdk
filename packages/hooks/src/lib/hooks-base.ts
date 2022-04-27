import { stringIsEmpty } from "@cossdk/common";
import { HooksOptions } from "../models/hooks-options";

export abstract class HooksBase {

    constructor(private options: HooksOptions)
    {

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
            throw new Error('You must initialize the hooks sdk by calling Hooks.initialize().');
    }
}