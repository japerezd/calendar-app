const { types } = require("../../types/types");

describe('Pruebas en types', () => {

    test('los types deben ser iguales', () => {
        expect(types).toEqual({
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',

            eventSetActive: '[event] Set active',
            eventLogout: '[event] Event logout',
            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add new',
            evenClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Events loaded',

            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
        }); 
    });
    
    
})
