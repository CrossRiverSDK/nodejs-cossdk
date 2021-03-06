import { HttpMethod, AggregateError } from "@cossdk/common";
import { executeApiRaw, initializeTokenProvider } from "../src/lib/authenticated-fetch";
import { TokenProviderConfiguration } from "../src/interfaces/token-provider-configuration";
import { TokenProvider } from "../src/lib/token-provider";

describe('token-provider', () => {
    test('get token and cache it', async () => {
        const tokenProvider = new TokenProvider({
            apiKey: 'test',
            authorityUrl: 'https://oauthtest.crbnj.net',
            clientId: 'myTestClient',
            clientSecret: 'myTestPassword'
        })

        const token = await tokenProvider.getJwtToken();
        expect(token).not.toBeNull();

        const cachedToken = await tokenProvider.getJwtToken();
        expect(cachedToken).toBe(token);
    });

    test('call api successfully', async () => {
        await initializeTokenProvider({
            apiKey: 'test',
            authorityUrl: 'https://oauthtest.crbnj.net',
            clientId: 'myTestClient',
            clientSecret: 'myTestPassword'
        });

        const res = await executeApiRaw('https://lendingqa.crbcloud.com/Hooks/v2/Types', HttpMethod.GET);

        expect(res).not.toBeNull();
    });

    test('throw exceptions when config is messed up', async () => {
        const config:TokenProviderConfiguration = {
            apiKey: 'test',
            authorityUrl: ''
        }

        await expect(async () => {
            try
            {
                const provider = new TokenProvider(config)
                await provider.getJwtToken();
            }
            catch(error)
            {
                const e = error as AggregateError;
                expect(e.errors.length).toBe(3);
                throw(error);
            }
        }).rejects.toThrow(AggregateError);
    });
});