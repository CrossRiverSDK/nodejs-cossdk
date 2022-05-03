import { ApiResponse, QueryString, TimeSpan } from "@cossdk/common";
import { executeGetApi } from "@cossdk/token-provider";
import { HooksOptions } from "../models/hooks-options";
import { Type } from "../models/type";
import { TypesFilter } from "../models/types-filter";
import { HooksBase } from "./hooks-base";

export class Types extends HooksBase {

    constructor(options: HooksOptions)
    {
        super(options);
    }

    /**
     * Gets a type.
     */
    async get(id: string): Promise<ApiResponse<Type>> {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<Type>) => {
            obj.result.created = new Date(obj.result.created);
            obj.result.defaultRetryDelay = TimeSpan.fromJSON(obj.result.defaultRetryDelay); 
        };

        return await executeGetApi<ApiResponse<Type>>(`${this.baseUrl}/Hooks/v2/Types/${id}`, undefined, mapper, this.apiKey);
    }

    /**
     * Gets all types.
     */
    async getAll(filter?: TypesFilter): Promise<ApiResponse<Array<Type>>> {
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

        const mapper = (obj:ApiResponse<Array<Type>>) => {
            obj.result.forEach(t => {
                t.created = new Date(t.created);
                t.defaultRetryDelay = TimeSpan.fromJSON(t.defaultRetryDelay); 
            });
        };

        return await executeGetApi<ApiResponse<Array<Type>>>(`${this.baseUrl}/Hooks/v2/Types`, query, mapper, this.apiKey);
    }
}