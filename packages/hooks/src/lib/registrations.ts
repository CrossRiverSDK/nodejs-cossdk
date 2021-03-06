import { ApiResponse, QueryString, PagedResults, TimeSpan, HttpMethod } from '@cossdk/common'
import { executeApi, executeApiRaw, executeGetApi } from '@cossdk/token-provider';
import { AuthenticationType } from '../enums/authentication-type';
import { HookType } from '../enums/hook-type';
import { HookEvent } from '../models/hook-event';
import { HookEventDetails } from '../models/hook-event-details';
import { Registration } from '../models/registration';
import { BasicAuthenticationOptions, EmailRegistrationOptions, NoAuthenticationOptions, OidcAuthenticationOptions, RabbitMqRegistrationOptions, SlackRegistrationOptions, SqsRegistrationOptions, WebRegistrationOptions } from '../models/registration-options';
import { EventDetailsFilter } from '../models/event-details-filter';
import { RegistrationsEventsFilter } from '../models/registrations-events-filter';
import { RegistrationsFilter } from "../models/registrations-filter";
import { ResendEvents } from '../models/resend-events';
import { UpsertRegistration } from '../models/upsert-registeration';
import { HooksBase } from './hooks-base';
import { HooksConfiguration } from '../models/hooks-configuration';

export class Registrations<THookEventType extends string> extends HooksBase {

    constructor(options: HooksConfiguration)
    {
        super(options);
    }

    async register(upsertRegistration: UpsertRegistration<THookEventType>): Promise<ApiResponse<Registration<THookEventType>>> {
        this.validateInitialization();

        if (!upsertRegistration.retryCount) upsertRegistration.retryCount = 3;
        if (!upsertRegistration.retryDelay) upsertRegistration.retryDelay = TimeSpan.fromMinutes(5);
        if (!upsertRegistration.applicationName) upsertRegistration.applicationName = this.defaultApplicationName;

        const mapper = (obj:ApiResponse<Registration<THookEventType>>) => {
            this.mapRegistration(obj.result);
        };

        return await executeApi<UpsertRegistration<THookEventType>, ApiResponse<Registration<THookEventType>>>(
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
     * Gets all registration events.
     */
    async events(registrationId: string, filter?: RegistrationsEventsFilter): Promise<ApiResponse<PagedResults<HookEvent>>> {
        this.validateInitialization();

        const query = new QueryString();

        if (filter)
            this.setRegistrationsEventDetailsFilterQueryString(filter, query);

        const mapper = (obj:ApiResponse<PagedResults<HookEvent>>) => {
            obj.result.results.forEach(e => this.mapEvent(e));
        };

        return await executeGetApi<ApiResponse<PagedResults<HookEvent>>>(
            `${this.baseUrl}/Hooks/v2/Registrations/${registrationId}/Events`, 
            query,
            mapper,
            this.apiKey
        );
    }

    /**
     * Gets all registration events.
     */
     async event(registrationId: string, eventId: string): Promise<ApiResponse<HookEvent>> {
        this.validateInitialization();        

        const mapper = (obj:ApiResponse<HookEvent>) => {
            this.mapEvent(obj.result);
        };

        return await executeGetApi<ApiResponse<HookEvent>>(
            `${this.baseUrl}/Hooks/v2/Registrations/${registrationId}/Events/${eventId}`, 
            undefined,
            mapper,
            this.apiKey
        );
    }

    /**
     * Gets all registration event details.
     */
     async eventDetails(registrationId: string, eventId: string, filter?: EventDetailsFilter): Promise<ApiResponse<Array<HookEventDetails>>> {
        this.validateInitialization();        

        const query = new QueryString();

        if (filter)
            this.setEventDetailsFilterQueryString(filter, query);

        const mapper = (obj:ApiResponse<Array<HookEventDetails>>) => {
            obj.result.forEach(ed => {
                this.mapEventDetails(ed);
            });
        };

        return await executeGetApi<ApiResponse<Array<HookEventDetails>>>(
            `${this.baseUrl}/Hooks/v2/Registrations/${registrationId}/Events/${eventId}/Details`, 
            query,
            mapper,
            this.apiKey
        );
    }

    
     /**
     * resend events.
     */
    async resend(registrationId: string, events: ResendEvents): Promise<ApiResponse<Array<HookEvent>>> {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<Array<HookEvent>>) => {
            obj.result.forEach(e => this.mapEvent(e));
        };

        return await executeApi<ResendEvents, ApiResponse<Array<HookEvent>>>(
            `${this.baseUrl}/Hooks/v2/Registrations/${registrationId}/Events/Resend`,
            HttpMethod.POST,
            events,
            undefined,
            mapper, 
            this.apiKey);
    }

    /**
     * Gets all registrations.
     */
    async getAll(filter?: RegistrationsFilter<THookEventType>): Promise<ApiResponse<PagedResults<Registration<THookEventType>>>> {
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

        const mapper = (obj:ApiResponse<PagedResults<Registration<THookEventType>>>) => {
            obj.result.results.forEach(r => this.mapRegistration(r));
        };

        return await executeGetApi<ApiResponse<PagedResults<Registration<THookEventType>>>>(`${this.baseUrl}/Hooks/v2/Registrations`, query, mapper, this.apiKey);
    }

    /**
     * Gets a registration.
     */
    async get(id: string): Promise<ApiResponse<Registration<THookEventType>>> {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<Registration<THookEventType>>) => {
            this.mapRegistration(obj.result);
        };

        return await executeGetApi<ApiResponse<Registration<THookEventType>>>(`${this.baseUrl}/Hooks/v2/Registrations/${id}`, undefined, mapper, this.apiKey);
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

    private mapRegistration(r: Registration<THookEventType>)
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