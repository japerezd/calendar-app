import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import moment from 'moment';
import { eventClearActiveEvent, eventStartUpdate, eventStartAddNew } from '../../../actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
    calendar:{
        events: [],
        activeEvent: {
            title: 'hola mundo',
            notes: 'notasss',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth:{
        uid: '123',
        name:'jorge'
    },
    ui:{
        modalOpen: true
    }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
)


describe('Pruebas en <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('debe mostrar el modal', () => {
       
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });
    
    test('debe llamar la accion de actualizar y cerrar el modal', () => {
        
        wrapper.find('form').simulate('submit',{ preventDefault(){} });

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent)
        expect(eventClearActiveEvent).toHaveBeenCalled();

    });

    test('debe mostrar error si falta el titulo', () => {
        wrapper.find('form').simulate('submit',{ preventDefault(){} });
        
        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
    })
    
    test('debe de crear un nuevo evento', () => {

        const initState = {
            calendar:{
                events: [],
                activeEvent: null
            },
            auth:{
                uid: '123',
                name:'jorge'
            },
            ui:{
                modalOpen: true
            }
        };

        const store = mockStore(initState);
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name: 'title',
                value: 'Pruebas'
            }
        });

        wrapper.find('form').simulate('submit',{ preventDefault(){} });
        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Pruebas',
            notes: ''
        });

        expect(eventClearActiveEvent).toHaveBeenCalled();

    })
    
    test('debe de validar las fechas', () => {
        wrapper.find('form').simulate('submit',{ preventDefault(){} });

        const hoy = new Date();

        // hacemos que tanto el end como el start tengan la misma fecha
        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
        });

        wrapper.find('form').simulate('submit',{ preventDefault(){} });

        expect(Swal.fire).toHaveBeenCalledWith("Error", "La fecha fin debe ser mayor a la fecha de inicio", "error" )
    })
    
    
})
