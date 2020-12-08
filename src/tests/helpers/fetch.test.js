import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe('Pruebas en el helper fetch', () => {
    let token = '';

    test('fetchSinToken debe funcionar', async() => {
       
        const resp = await fetchSinToken('auth',{email: 'alberto@gmail.com', password: '123456'}, 'POST');

        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();
        expect(body.ok).toBe(true);

        token = body.token;
    });
    
    test('fetchConToken debe funcionar', async() => {
       
        localStorage.setItem('token', token);
        const resp = await fetchConToken('events/5fc688ae4f4db352e4841275',{}, 'DELETE');
        const body = await resp.json();
        expect(body.msg).toBe('Evento no existe por ese id');
    });
    
})
