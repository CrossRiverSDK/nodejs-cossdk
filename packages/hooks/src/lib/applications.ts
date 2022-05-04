import { ApiResponse, QueryString } from "@cossdk/common";
import { executeGetApi } from "@cossdk/token-provider";
import { Application } from "../models/application";
import { ApplicationsFilter } from "../models/applications-filter";
import { HooksConfiguration } from "../models/hooks-configuration";
import { HooksBase } from "./hooks-base";

export class Applications extends HooksBase {

    constructor(options: HooksConfiguration)
    {
        super(options);
    }

    /**
     * Gets an application.
     */
    async get(name: string): Promise<ApiResponse<Application>> {
        this.validateInitialization();

        return await executeGetApi<ApiResponse<Application>>(`${this.baseUrl}/Hooks/v2/Applications/${name}`, undefined, undefined, this.apiKey);
    }

    /**
     * Gets all applications.
     */
    async getAll(filter: ApplicationsFilter): Promise<ApiResponse<Array<Application>>> {
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

        return await executeGetApi<ApiResponse<Array<Application>>>(`${this.baseUrl}/Hooks/v2/Applications`, query, undefined, this.apiKey);
    }
}