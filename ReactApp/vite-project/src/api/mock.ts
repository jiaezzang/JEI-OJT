import { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
const data=[
    { id: 'jiae22', password: '1234', name: '지애', count: 0, sum: 0, a: true, b: true, c: true, d: true },
    { id: 'jiae33', password: '3456', name: 'jiae', count: 0, sum: 0, a: true, b: true, c: true, d: true  },
    { id: 'jiae44', password: '4567', name: 'kim', count: 0, sum: 0, a: true, b: true, c: true, d: true  },
]   

if(!localStorage.getItem("users"))localStorage.setItem('users', JSON.stringify(data));

interface User {
    id: string;
    password: string;
    name: string;
    count: number;
    sum: number;
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
  }

export const createFakeAPI = (client:AxiosInstance)=>{
    const mock = new AxiosMockAdapter(client);

    

    mock.onPost("/sign-in").reply(({data})=>{
        const body = JSON.parse(data)
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user= users.find(el =>el.id === body.id && el.password === body.password)
        
        if(user) return [200,{name:user.name}]
        else if(users.find(el => el.id === body.id && el.password !== body.password)) return [400]
        else return [500]
    })

    mock.onPost("/main").reply(({data}) => {
        const body = JSON.parse(data)
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(el=>el.name === body.name)
        let users2 = [...users];
        users2.map(el => {
            if(el.name = body.name){
                el.count = body.count;
                el.sum += body.sum;
            }
        })

        if(user) return [200, {name: user.name}]
        else return [500]
    })

    mock.onPost("/mypage").reply(({data})=> {
        const body = JSON.parse(data)
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(el=>el.name === body.name)
        if(user) return [200, {count: user.count, sum: user.sum}]
        else return [500]
    })

    mock.onPost("/count").reply(({data})=> {
        const body = JSON.parse(data)
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        let users2 = [...users];
        const user: any = users2.find(el=>el.name === body.name) || undefined
        if(body.message === 'success1'){
            if(user.a){
                user.count++;
                user.a = false;
            }
        }else if(body.message === 'success2'){
            if(user.b){
                user.count++;
                user.b = false;
            }
        }else if(body.message === 'success3'){
            if(user.c){
                user.count++;
                user.c = false;
            }
        }else if(body.message === 'success4'){
            if(user.d){
                user.count++;
                user.d = false;
            }
        }
        
        user.sum++;

        localStorage.setItem('users', JSON.stringify(users2));
        console.log(users)
        //user.count = data.count
        if(user) return [200, {count: user.count, sum: user.sum}]
        else return [500]
    })

}