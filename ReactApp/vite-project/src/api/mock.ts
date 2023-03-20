import { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
const users=[
    { id: 'jiae22', password: '1234', name: '지애' },
    { id: 'jiae33', password: '3456', name: 'jiae' },
    { id: 'jiae44', password: '4567', name: 'kim' },
]   
export const createFakeAPI = (client:AxiosInstance)=>{
    const mock = new AxiosMockAdapter(client);
    mock.onPost("/sign-in").reply(({data})=>{
        console.log(data)
        const body = JSON.parse(data)
        
       const user= users.find(el=>el.id === body.id && el.password === body.password)
       
       if(user) return [200,{name:user.name}]
       else if(users.find(el => el.id === body.id && el.password !== body.password)) return [400]
       else return [500]
    })

}