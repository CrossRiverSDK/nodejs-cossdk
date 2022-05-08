export interface HookEvent
{
    id: string;
    applicationName: string;
    hookName: string;
    registrationId: string;
    payload: string;
    sent: boolean;
    suspended: boolean;
    created: Date;
}