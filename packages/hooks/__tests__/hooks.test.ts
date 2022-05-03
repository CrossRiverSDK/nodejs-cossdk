import { Hooks } from "../src";
import { v4 as uuidv4 } from 'uuid';
import { WebRegistrationOptions } from "../src/models/registration-options";
import { HttpMethod } from "@cossdk/common";
import { HookType } from "../src/enums/hook-type";

jest.setTimeout(900000);

let testInitialized = false;
function initTest()
{
    if (!testInitialized)
    {
        testInitialized = true;
        Hooks.initialize({
            authorityUrl: 'authorityUrl',
            clientId: 'clientId',
            clientSecret: 'secret',
            baseUrl: 'apiUrl',
            apiKey: 'test'
        });
    }
}

describe('hooks', () => {
    test('get hooks types', async () => {
        initTest();

        const types = await Hooks.Types.getAll();

        expect(types.isSuccessful).toBe(true);
        expect(types.statusCode).toBe(200);
        expect(types.result.length).toBe(10);
        expect(types.errors).toBeUndefined();
    });

    test('register', async () => {
        initTest();

        const typeResponse = await Hooks.Types.get('crb.hooks.testcontracts.myhook1');
        expect(typeResponse.isSuccessful).toBe(true);

        const type = typeResponse.result;
        const id = uuidv4();
        const uri = 'http://www.google.com';

        const registration = await Hooks.Registrations.register({
            id: id,
            applicationName: type.applicationName,
            hookName: type.name,
            options: new WebRegistrationOptions(
                HttpMethod.PUT,
                uri
            )
        });

        expect(registration.isSuccessful).toBe(true);
        expect(registration.statusCode).toBe(200);
        expect(registration.result.applicationName).toBe('crb.hooks.testcontracts');
        expect(registration.result.hookName).toBe('MyHook1');
        expect(registration.result.id).toBe(id);
        expect(registration.result.options).not.toBeUndefined();
        expect(registration.result.options.hookType).toBe(HookType.Web);
        expect((registration.result.options as WebRegistrationOptions).httpMethod).toBe(HttpMethod.PUT);
        expect((registration.result.options as WebRegistrationOptions).uri).toBe(uri);
        expect(registration.errors).toBeUndefined();
    });

    test('get registrations', async () => {
        initTest();

        const types = await Hooks.Registrations.getAll();

        expect(types.isSuccessful).toBe(true);
        expect(types.statusCode).toBe(200);
        expect(types.result.results.length).toBe(4);
        expect(types.errors).toBeUndefined();
    });

    test('get registration', async () => {
        initTest();

        const id = '65D89AED-F2D8-42E7-95E4-05D18D6F217F'.toLowerCase();

        const reg = await Hooks.Registrations.get(id);

        expect(reg.isSuccessful).toBe(true);
        expect(reg.statusCode).toBe(200);
        expect(reg.result.id).toBe(id);
        expect(reg.errors).toBeUndefined();
    });

    test('delete registration', async () => {
        initTest();

        const id = '65D89AED-F2D8-42E7-95E4-05D18D6F217F'.toLowerCase();

        const res = await Hooks.Registrations.delete(id);

        expect(res).toBe(true);
    });

    test('unsuspend registrations', async () => {
        initTest();

        const ids = [
            '65D89AED-F2D8-42E7-95E4-05D18D6F217F'.toLowerCase(),
            '69BB576D-4591-465D-AB30-26F5E5E2F7EF'.toLowerCase()
        ];

        const res = await Hooks.Registrations.unsuspend(ids);

        expect(res).toBe(true);
    });

});