import {TokenProvider} from "../src/token-provider";

describe('token-provider', () => {
    test('get token and cache it', async () => {
        let tokenProvider = new TokenProvider({
            authorityUrl: 'https://oauthtest.crbnj.net',
            clientId: 'myTestClient',
            clientSecret: 'myTestPassword',
            scopes: null
        })

        let token = await tokenProvider.getJwtToken();
        expect(token).not.toBeNull();

        let cachedToken = await tokenProvider.getJwtToken();
        expect(cachedToken).toBe(token);
    });

    test('throw exceptions when config is messed up', async () => {
        let config = {
            authorityUrl: null,
            clientId: null,
            clientSecret: null,
            scopes: null
        }

        await expect(async () => {
            let provider = new TokenProvider(config)
            let token = await provider.getJwtToken();
        }).rejects.toThrow(Error);
    });
});