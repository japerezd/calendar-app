import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { startLogin,startRegister } from '../../../actions/auth';
import { LoginScreen } from '../../../components/auth/LoginScreen';


jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
)


describe('Pruebas en <LoginScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot(); 
    });
    
    test('debe llamar el dispatch del login', () => {

        wrapper.find('input[name="lEmail"]').simulate('change',{
            target:{
                name: 'lEmail',
                value: 'graves@gmail.com'
            }
        });

        wrapper.find('input[name="lPassword"]').simulate('change',{
            target:{
                name: 'lPassword',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })
        
        expect(startLogin).toHaveBeenCalledWith('graves@gmail.com','123456'); 

    });

    test('No hay registro si las contraseñas son diferentes', () => {

        wrapper.find('input[name="rPassword1"]').simulate('change',{
            target:{
                name: 'rPassword1',
                value: '123456'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change',{
            target:{
                name: 'rPassword2',
                value: '1234561'
            }
        });


        wrapper.find('form').at(1).simulate('submit',{ preventDefault(){} })
        expect(startRegister).toHaveBeenCalledTimes(0);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben de ser iguales', 'error');
    })
    
    test('debe dispararse el registro con contraseñas iguales', () => {
        wrapper.find('input[name="rPassword1"]').simulate('change',{
            target:{
                name: 'rPassword1',
                value: '1234562'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change',{
            target:{
                name: 'rPassword2',
                value: '1234562'
            }
        });


        wrapper.find('form').at(1).simulate('submit',{ preventDefault(){} })
        expect(startRegister).toHaveBeenCalledWith("gicelle@gmail.com", "1234562", "Gicelle");
        expect(Swal.fire).not.toHaveBeenCalled();

    })
    
    
})
