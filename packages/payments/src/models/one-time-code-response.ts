export interface OneTimeCodeResponse {
    validationCode?: string;
    domain?: string;
    createdAt?: Date;
    expiresAt?: Date;
}

export function mapOneTimeCodeResponse(obj: OneTimeCodeResponse)
{
    if (obj.createdAt)
        obj.createdAt = new Date(obj.createdAt);

    if (obj.expiresAt)
        obj.expiresAt = new Date(obj.expiresAt);
}