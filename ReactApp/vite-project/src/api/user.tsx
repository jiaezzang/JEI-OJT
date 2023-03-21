import axios from 'axios';
import AxiosMockAdapter from "axios-mock-adapter";
import { createFakeAPI } from './mock';

const axiosInstance = axios.create();

export const postSignIn = (id:string, password:string) =>
  axiosInstance.post("/sign-in",{id, password})

  createFakeAPI(axiosInstance)  

// export function fetchUsers() {
//     const mock = new AxiosMockAdapter(axios);

//     const data = {
//         users:[
//             { id: 'jiae22', password: '1234', name: '지애' },
//             { id: 'jiae33', password: '3456', name: 'jiae' },
//             { id: 'jiae44', password: '4567', name: 'kim' },
//         ]   
//     };

//     mock.onGet('/users').reply(() => {
//         try {
//             return [200, data];
//         } catch(error) {
//             console.error(error);
//             return [500, {message : "error!!"}]
//         }
//     })
  
//     return axios.get('/users')
// }