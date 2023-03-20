import axios from 'axios';
import AxiosMockAdapter from "axios-mock-adapter";

export function fetchUsers() {
    const mock = new AxiosMockAdapter(axios);


    const data = {
        users:[
            { id: 'jiae22', password: '1234', name: '지애' },
            { id: 'jiae33', password: '3456', name: 'jiae' },
            { id: 'jiae44', password: '4567', name: 'kim' },
        ]   
    };

    mock.onGet('/users').reply(200, data)
  
    return axios.get('/users')
}