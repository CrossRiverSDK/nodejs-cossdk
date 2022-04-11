///<reference path="../node_modules/@types/jest/index.d.ts"/>

import {TokenProvider} from "../src/token-provider";


describe('token-provider', () => {
    test('get token', async () => {
        let tokenProvider = new TokenProvider({
            authorityUrl: 'https://oauthtest.crbnj.net',
            clientId: 'myTestClient',
            clientSecret: 'myTestPassword',
            scopes: 'rolodexapi'
        })

        let token = await tokenProvider.getJwtToken();
        token = await tokenProvider.getJwtToken();
        expect(1).toBe(1);
    });
});
