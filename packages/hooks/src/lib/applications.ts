import { ApiResponse, QueryString } from "@cossdk/common";
import { executeGetApi } from "@cossdk/token-provider";
import { Application } from "../models/application";
import { ApplicationsFilter } from "../models/applications-filter";
import { HooksOptions } from "../models/hooks-options";
import { Type } from "../models/type";
import { HooksBase } from "./hooks-base";

export class Applications extends HooksBase {

    constructor(options: HooksOptions)
    {
        super(options);
    }

    /**
     * Gets an application.
     */
    get(name: string): Promise<ApiResponse<Application>> {
        this.validateInitialization();

        return executeGetApi<ApiResponse<Type>>(`${this.baseUrl}/Hooks/v2/Applications/${name}`);
    }

    /**
     * Gets all applications.
     */
    getAll(filter: ApplicationsFilter): Promise<ApiResponse<Array<Application>>> {
        this.validateInitialization();

        const query = new QueryString();

        if (filter.name) {
            query.set('Name', filter.name);
        }

        if (filter.fromCreated) {
            query.set('FromCreated', filter.fromCreated);
        }

        if (filter.toCreated) {
            query.set('ToCreated', filter.toCreated);
        }

        return executeGetApi<ApiResponse<Array<Type>>>(`${this.baseUrl}/Hooks/v2/Applications`, query);
    }
}