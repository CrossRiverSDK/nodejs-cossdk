import { ApiResponse, QueryString, TimeSpan } from "@cossdk/common";
import { executeGetApi } from "@cossdk/token-provider";
import { HookEventType } from "../models/hook-event-type";
import { HookEventTypesFilter } from "../models/hook-event-types-filter";
import { HooksBase } from "./hooks-base";
import { HooksConfiguration } from "../models/hooks-configuration";

export class Types<THookEventType extends string> extends HooksBase {

    constructor(options: HooksConfiguration)
    {
        super(options);
    }

    /**
     * Gets a type.
     */
    async get(name: THookEventType): Promise<ApiResponse<HookEventType<THookEventType>>> {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<HookEventType<THookEventType>>) => {
            obj.result.created = new Date(obj.result.created);
            obj.result.defaultRetryDelay = TimeSpan.fromJSON(obj.result.defaultRetryDelay); 
        };

        const id = `${this.defaultApplicationName}.${name}`;

        return await executeGetApi<ApiResponse<HookEventType<THookEventType>>>(`${this.baseUrl}/Hooks/v2/Types/${id}`, undefined, mapper, this.apiKey);
    }

    /**
     * Gets all types.
     */
    async getAll(filter?: HookEventTypesFilter<THookEventType>): Promise<ApiResponse<Array<HookEventType<THookEventType>>>> {
        this.validateInitialization();

        const query = new QueryString();
        if (filter)
        {
            if (filter.applicationName) {
                query.set('ApplicationName', filter.applicationName);
            }

            if (filter.name) {
                query.set('Name', filter.name);
            }

            if (filter.requirePayload) {
                query.set('RequirePayload', filter.requirePayload);
            }

            if (filter.fromDefaultRetryCount) {
                query.set('FromDefaultRetryCount', filter.fromDefaultRetryCount);
            }

            if (filter.toDefaultRetryCount) {
                query.set('ToDefaultRetryCount', filter.toDefaultRetryCount);
            }

            if (filter.fromCreated) {
                query.set('FromCreated', filter.fromCreated);
            }

            if (filter.toCreated) {
                query.set('ToCreated', filter.toCreated);
            }
        }

        const mapper = (obj:ApiResponse<Array<HookEventType<THookEventType>>>) => {
            obj.result.forEach(t => {
                t.created = new Date(t.created);
                t.defaultRetryDelay = TimeSpan.fromJSON(t.defaultRetryDelay); 
            });
        };

        return await executeGetApi<ApiResponse<Array<HookEventType<THookEventType>>>>(`${this.baseUrl}/Hooks/v2/Types`, query, mapper, this.apiKey);
    }
}