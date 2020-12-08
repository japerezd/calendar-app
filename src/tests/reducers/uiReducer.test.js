import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

const initState = {
    modalOpen: false
}

describe('Pruebas sobre uiReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {

        const state = uiReducer(initState, {});
        expect(state).toEqual(initState)
    });
    
    test('debe abrir y cerrar el modal', () => {
        const modalOpen = uiOpenModal(); //action
        const state = uiReducer(initState, modalOpen);
        expect(state).toEqual({modalOpen: true}); 

        const modalClose = uiCloseModal(); //action
        const stateClose = uiReducer(initState, modalClose);
        expect(stateClose).toEqual({modalOpen: false});
    });
    

})
