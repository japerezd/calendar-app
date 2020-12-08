const { startLogin } = require("../../actions/auth");
const { authReducer } = require("../../reducers/authReducer");
const { types } = require("../../types/types");

const initState = {
    checking: true
}

describe('Pruebas sobre authReducer', () => {
    
    test('debe regresar el estado por defecto', () => {
        const state = authReducer(initState, {});
        expect(state).toEqual(initState);
    });
    
    test('debe de autenticar el usuario', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'beto'
            }
        };

        const state = authReducer(initState, action);
        expect(state).toEqual({
            checking: false,
            uid: '123',
            name: 'beto'
        })
        
    });

    test('authCheckingFinish debe hacerlo correctamente', () => {
        const action = {
            type: types.authCheckingFinish
        };
        const state = authReducer(initState, action);
        expect(state).toEqual({checking: false});
    });


    test('authLogout debe hacerse correctamente', () => {
        const action = {type: types.authLogout};
        const state = authReducer(initState, action);
        expect(state).toEqual({checking: false});
    })
    
    
    

})
