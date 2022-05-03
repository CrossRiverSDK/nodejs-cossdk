import { ApiResponse, QueryString, PagedResults, TimeSpan, HttpMethod } from '@cossdk/common'
import { executeApi, executeApiRaw, executeGetApi } from '@cossdk/token-provider';
import { AuthenticationType } from '../enums/authentication-type';
import { HookType } from '../enums/hook-type';
import { HooksOptions } from '../models/hooks-options';
import { Registration } from '../models/registration';
import { BasicAuthenticationOptions, EmailRegistrationOptions, NoAuthenticationOptions, OidcAuthenticationOptions, RabbitMqRegistrationOptions, SlackRegistrationOptions, SqsRegistrationOptions, WebRegistrationOptions } from '../models/registration-options';
import { RegistrationsFilter } from "../models/registrations-filter";
import { UpsertRegistration } from '../models/upsert-registeration';
import { HooksBase } from './hooks-base';

export class Registrations extends HooksBase {

    constructor(options: HooksOptions)
    {
        super(options);
    }

    async register(upsertRegistration: UpsertRegistration): Promise<ApiResponse<Registration>> {
        this.validateInitialization();

        if (!upsertRegistration.retryCount) upsertRegistration.retryCount = 3;
        if (!upsertRegistration.retryDelay) upsertRegistration.retryDelay = TimeSpan.fromMinutes(5);

        const mapper = (obj:ApiResponse<Registration>) => {
            this.mapRegistration(obj.result);
        };

        return await executeApi<UpsertRegistration, ApiResponse<Registration>>(
            `${this.baseUrl}/Hooks/v2/Registrations`,
            HttpMethod.POST,
            upsertRegistration,
            undefined,
            mapper, 
            this.apiKey);
    }

    /**
     * Unsuspend registrations.
     */
    async unsuspend(registrationsIds: Array<string>): Promise<boolean> {
        this.validateInitialization();

        try
        {
            await executeApiRaw(
                `${this.baseUrl}/Hooks/v2/Registrations/BulkUnsuspend`,
                HttpMethod.POST,
                JSON.stringify(registrationsIds), 
                undefined,
                this.apiKey);
            return true;
        }
        catch(e)
        {
            return false;
        }
    }

    /**
     * Gets all registrations.
     */
    async getAll(filter?: RegistrationsFilter): Promise<ApiResponse<PagedResults<Registration>>> {
        this.validateInitialization();

        const query = new QueryString();

        if (filter)
        {
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
        }

        const mapper = (obj:ApiResponse<PagedResults<Registration>>) => {
            obj.result.results.forEach(r => this.mapRegistration(r));
        };

        return await executeGetApi<ApiResponse<PagedResults<Registration>>>(`${this.baseUrl}/Hooks/v2/Registrations`, query, mapper, this.apiKey);
    }

    /**
     * Gets a registration.
     */
    async get(id: string): Promise<ApiResponse<Registration>> {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<Registration>) => {
            this.mapRegistration(obj.result);
        };

        return await executeGetApi<ApiResponse<Registration>>(`${this.baseUrl}/Hooks/v2/Registrations/${id}`, undefined, mapper, this.apiKey);
    }

    /**
     * Deletes a registration.
     */
    async delete(id: string): Promise<boolean> {
        this.validateInitialization();

        try
        {
            await executeApiRaw(
                `${this.baseUrl}/Hooks/v2/Registrations/${id}`,
                HttpMethod.DELETE,
                undefined, 
                undefined, 
                this.apiKey);

            return true;
        }
        catch(e)
        {
            return false;
        }
    }

    private mapRegistration(r: Registration)
    {
        switch(r.options.hookType)
        {
            case HookType.Web:
                r.options = <WebRegistrationOptions>r.options;
                switch(r.options.authenticationOptions.authenticationType)
                {
                    case AuthenticationType.None:
                        r.options.authenticationOptions = <NoAuthenticationOptions>r.options.authenticationOptions;
                        break;
                    case AuthenticationType.Basic:
                        r.options.authenticationOptions = <BasicAuthenticationOptions>r.options.authenticationOptions;
                        break;
                    case AuthenticationType.Oidc:
                        r.options.authenticationOptions = <OidcAuthenticationOptions>r.options.authenticationOptions;
                        break;
                }
                break;
            case HookType.RabbitMq:
                r.options = <RabbitMqRegistrationOptions>r.options;
                break;
            case HookType.Sqs:
                r.options = <SqsRegistrationOptions>r.options;
                break;
            case HookType.Slack:
                r.options = <SlackRegistrationOptions>r.options;
                break;
            case HookType.Email:
                r.options = <EmailRegistrationOptions>r.options;
                break;
        }

        r.created = new Date(r.created);

        if (r.retryDelay)
            r.retryDelay = TimeSpan.fromJSON(r.retryDelay); 
    
        if (r.updated)
            r.updated = new Date(r.updated);
    }
}