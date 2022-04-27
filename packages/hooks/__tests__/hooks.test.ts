import { Hooks } from "../src";
//const TextEncoder = require('util');

jest.setTimeout(900000);

describe('hooks', () => {
    test('get hooks types', async () => {
        Hooks.initialize({
            authorityUrl: 'https://oauthtest.crbnj.net',
            clientId: 'FrameworkTestClient',
            clientSecret: '75322384a8db4839810b597d5fcfb2a5',
            baseUrl: 'https://localhost:5001',
            apiKey: 'test'
        });

        const types = await Hooks.Types.getAll();

        expect(types.isSuccessful).toBe(true);
        expect(types.httpStatusCode).toBe(200);
        expect(types.result.length).toBe(2);
        expect(types.errors).toBeNull();
    });
});