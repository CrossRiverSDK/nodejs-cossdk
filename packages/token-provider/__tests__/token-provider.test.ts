///<reference path="../node_modules/@types/jest/index.d.ts"/>

import {TokenProvider} from "../src/token-provider";


describe('token-provider', () => {
    test('get token', async () => {
        let tokenProvider = new TokenProvider({
            authorityUrl: 'https://oauthtest.crbnj.net',
            clientId: 'RolodexTestClient',
            clientSecret: 'a0e3b423c0b24215a6a97d9c72525c6f',
            scopes: 'rolodexapi'
        })

        let token = await tokenProvider.getJwtToken();
        token = await tokenProvider.getJwtToken();
        expect(1).toBe(1);
    });
});
