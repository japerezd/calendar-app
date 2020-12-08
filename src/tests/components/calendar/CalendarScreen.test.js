import { mount } from 'enzyme';
import React from 'react';
import { act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { eventSetActive } from '../../../actions/events';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import {messages} from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    calendar:{
        events: []
    },
    auth:{
        uid: '123',
        name:'jorge'
    },
    ui:{
        modalOpen: false
    }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
)



describe('Pruebas en <CalendarScreen />', () => {

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('pruebas con las interacciones del calendario', () => {
        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        expect(calendarMessages).toEqual(messages);

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal});

        calendar.prop('onSelectEvent')( { name: 'celis' } );
        expect(eventSetActive).toHaveBeenCalledWith({name: 'celis'});

        // act porque esa instruccion hace una modificacion con el setState
        act(() => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView','week')
        }) 
    })
    
    
})
