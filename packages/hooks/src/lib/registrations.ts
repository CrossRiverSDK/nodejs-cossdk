import { ApiResponse, QueryString, PagedResults, stringIsNullOrEmpty, stringIsEmpty } from '@cossdk/common'
import { executeGetApi } from '@cossdk/token-provider';
import { HooksOptions } from '../models/hooks-options';
import { RegistrationsFilter } from "../models/registerations-filter";
import { HooksBase } from './hooks-base';

export class Registrations extends HooksBase {

    constructor(options: HooksOptions)
    {
        super(options);
    }

    /**
     * Gets all registrations.
     */
    async getAll(filter: RegistrationsFilter): Promise<ApiResponse<PagedResults<Registrations>>> {
        this.validateInitialization();

        const query = new QueryString();

        if (filter.applicationName) {
            query.set('ApplicationName', filter.applicationName);
        }

        if (filter.hookName) {
            query.set('HookName', filter.hookName);
        }

        if (filter.hookServiceId) {
            query.set('HookServiceId', filter.hookServiceId);
        }

        if (filter.hookCorrelationId) {
            query.set('HookCorrelationId', filter.hookCorrelationId);
        }

        if (filter.type) {
            query.set('Type', filter.type);
        }

        if (filter.suspended) {
            query.set('Suspended', filter.suspended);
        }

        if (filter.fromCreated) {
            query.set('FromCreated', filter.fromCreated);
        }

        if (filter.toCreated) {
            query.set('ToCreated', filter.toCreated);
        }

        if (filter.sortPropertyName) {
            query.set('SortPropertyName', filter.sortPropertyName);
        }

        if (filter.defaultSortingPropertyName) {
            query.set('DefaultSortingPropertyName', filter.defaultSortingPropertyName);
        }

        if (filter.sortDirection) {
            query.set('SortDirection', filter.sortDirection);
        }

        if (filter.pageNumber) {
            query.set('PageNumber', filter.pageNumber);
        }

        if (filter.pageSize) {
            query.set('PageSize', filter.pageSize);
        }

        return await executeGetApi<ApiResponse<PagedResults<Registrations>>>('/Hooks/v2/Registrations', query, this.apiKey);
    }
}