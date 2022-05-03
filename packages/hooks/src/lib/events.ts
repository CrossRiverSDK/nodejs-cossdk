import { ApiResponse, HttpMethod, PagedResults, QueryString } from "@cossdk/common";
import { executeApi, executeGetApi } from "@cossdk/token-provider";
import { EventDetailsFilter } from "../models/event-details-filter";
import { EventsFilter } from "../models/events-filter";
import { HookEvent } from "../models/hook-event";
import { HookEventDetails } from "../models/hook-event-details";
import { HooksOptions } from "../models/hooks-options";
import { ResendEvents } from "../models/resend-events";
import { HooksBase } from "./hooks-base";

export class Events extends HooksBase {

    constructor(options: HooksOptions)
    {
        super(options);
    }

    /**
     * Gets all registration events.
     */
     async events(filter?: EventsFilter): Promise<ApiResponse<PagedResults<HookEvent>>> {
        this.validateInitialization();

        const query = new QueryString();

        if (filter)
        {
            this.setRegistrationsEventDetailsFilterQueryString(filter, query);

            if (filter.registrationId) {
                query.set('RegistrationId', filter.registrationId);
            }

            if (filter.fuzzySearch) {
                query.set('FuzzySearch', filter.fuzzySearch);
            }

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
        }

        const mapper = (obj:ApiResponse<PagedResults<HookEvent>>) => {
            obj.result.results.forEach(e => this.mapEvent(e));
        };

        return await executeGetApi<ApiResponse<PagedResults<HookEvent>>>(
            `${this.baseUrl}/Hooks/v2/Events`, 
            query,
            mapper,
            this.apiKey
        );
    }

    /**
     * Gets all registration events.
     */
     async event(eventId: string): Promise<ApiResponse<HookEvent>> {
        this.validateInitialization();        

        const mapper = (obj:ApiResponse<HookEvent>) => {
            this.mapEvent(obj.result);
        };

        return await executeGetApi<ApiResponse<HookEvent>>(
            `${this.baseUrl}/Hooks/v2/Events/${eventId}`, 
            undefined,
            mapper,
            this.apiKey
        );
    }

    /**
     * Gets all registration event details.
     */
     async eventDetails(eventId: string, filter?: EventDetailsFilter): Promise<ApiResponse<Array<HookEventDetails>>> {
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
            `${this.baseUrl}/Hooks/v2/Events/${eventId}/Details`, 
            query,
            mapper,
            this.apiKey
        );
    }
    
     /**
     * resend events.
     */
    async resend(events: ResendEvents): Promise<ApiResponse<Array<HookEvent>>> {
        this.validateInitialization();

        const mapper = (obj:ApiResponse<Array<HookEvent>>) => {
            obj.result.forEach(e => this.mapEvent(e));
        };

        return await executeApi<ResendEvents, ApiResponse<Array<HookEvent>>>(
            `${this.baseUrl}/Hooks/v2/Events/Resend`,
            HttpMethod.POST,
            events,
            undefined,
            mapper, 
            this.apiKey);
    }
}

