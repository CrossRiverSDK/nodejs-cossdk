import { CrbCosLending } from "../src";
import { v4 as uuidv4 } from 'uuid';
import { CosEnvironment, HttpMethod } from "@cossdk/common";
import { HookType, WebRegistrationOptions } from "@cossdk/hooks";

jest.setTimeout(900000);

let testInitialized = false;
function initTest()
{
    if (!testInitialized)
    {
        testInitialized = true;
        CrbCosLending.initialize({
            clientId: 'clientId',
            clientSecret: 'clientSecret',
            environment: CosEnvironment.Sandbox
        });
    }
}

describe('hooks', () => {
    test('get hooks types', async () => {
        initTest();

        const types = await CrbCosLending.Hooks.Types.getAll();

        expect(types.isSuccessful).toBe(true);
        expect(types.statusCode).toBe(200);
        expect(types.result.length).toBe(10);
        expect(types.errors).toBeUndefined();
    });

    test('register', async () => {
        initTest();

        const typeResponse = await CrbCosLending.Hooks.Types.get('crb.hooks.testcontracts.myhook1');
        expect(typeResponse.isSuccessful).toBe(true);

        const type = typeResponse.result;
        const id = uuidv4();
        const uri = 'http://www.google.com';

        const registration = await CrbCosLending.Hooks.Registrations.register({
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

        const types = await CrbCosLending.Hooks.Registrations.getAll();

        expect(types.isSuccessful).toBe(true);
        expect(types.statusCode).toBe(200);
        expect(types.result.results.length).toBe(4);
        expect(types.errors).toBeUndefined();
    });

    test('get registration events', async () => {
        initTest();

        const events = await CrbCosLending.Hooks.Registrations.events('61CE9286-CCF5-412B-E351-08D9E58DFC29');

        expect(events.isSuccessful).toBe(true);
        expect(events.statusCode).toBe(200);
        expect(events.result.results.length).toBe(2);
        expect(events.errors).toBeUndefined();
    });


    test('get registration event', async () => {
        initTest();

        const id = '89696DE4-5AEE-4DDC-8ED4-2DF6AC45CB97'.toLowerCase();
        const event = await CrbCosLending.Hooks.Registrations.event('61CE9286-CCF5-412B-E351-08D9E58DFC29', id);

        expect(event.isSuccessful).toBe(true);
        expect(event.statusCode).toBe(200);
        expect(event.result.id).toBe(id);
        expect(event.errors).toBeUndefined();
    });

    test('resend registration events', async () => {
        initTest();

        const events = await CrbCosLending.Hooks.Registrations.resend('61CE9286-CCF5-412B-E351-08D9E58DFC29', {
            eventIds: [
                '89696DE4-5AEE-4DDC-8ED4-2DF6AC45CB97'.toLowerCase(),
                'EDFBB8BE-2A41-4973-96A2-98D12C3C65C0'.toLowerCase()
            ]
        });

        expect(events.isSuccessful).toBe(true);
        expect(events.statusCode).toBe(200);
        expect(events.result.length).toBe(2);
        expect(events.errors).toBeUndefined();
    });

    test('get registration event details', async () => {
        initTest();

        const id = '89696DE4-5AEE-4DDC-8ED4-2DF6AC45CB97'.toLowerCase();
        const event = await CrbCosLending.Hooks.Registrations.eventDetails('61CE9286-CCF5-412B-E351-08D9E58DFC29', id);

        expect(event.isSuccessful).toBe(true);
        expect(event.statusCode).toBe(200);
        expect(event.result.length).toBe(0);
        expect(event.errors).toBeUndefined();
    });
    
    test('get registration', async () => {
        initTest();

        const id = '65D89AED-F2D8-42E7-95E4-05D18D6F217F'.toLowerCase();

        const reg = await CrbCosLending.Hooks.Registrations.get(id);

        expect(reg.isSuccessful).toBe(true);
        expect(reg.statusCode).toBe(200);
        expect(reg.result.id).toBe(id);
        expect(reg.errors).toBeUndefined();
    });

    test('delete registration', async () => {
        initTest();

        const id = '65D89AED-F2D8-42E7-95E4-05D18D6F217F'.toLowerCase();

        const res = await CrbCosLending.Hooks.Registrations.delete(id);

        expect(res).toBe(true);
    });

    test('unsuspend registrations', async () => {
        initTest();

        const ids = [
            '65D89AED-F2D8-42E7-95E4-05D18D6F217F'.toLowerCase(),
            '69BB576D-4591-465D-AB30-26F5E5E2F7EF'.toLowerCase()
        ];

        const res = await CrbCosLending.Hooks.Registrations.unsuspend(ids);

        expect(res).toBe(true);
    });

});