import { ApiResponse, QueryString } from "@cossdk/common";
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
    get(id: string): Promise<ApiResponse<Type>> {
        this.validateInitialization();

        return executeGetApi<ApiResponse<Type>>(`${this.baseUrl}/Hooks/v2/Types/${id}`, undefined, this.apiKey);
    }

    /**
     * Gets all types.
     */
    getAll(filter?: TypesFilter): Promise<ApiResponse<Array<Type>>> {
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

        return executeGetApi<ApiResponse<Array<Type>>>(`${this.baseUrl}/Hooks/v2/Types`, query, this.apiKey);
    }
}