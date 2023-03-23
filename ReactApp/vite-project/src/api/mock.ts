import { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
const data=[
    { id: 'jiae22', password: '1234', name: '지애', count: 0, sum: 0, a: true, b: true, c: true, d: true, timestring: '', time: 0  },
    { id: 'jiae33', password: '3456', name: 'jiae', count: 0, sum: 0, a: true, b: true, c: true, d: true, timestring: '', time: 0  },
    { id: 'jiae44', password: '4567', name: 'kim', count: 0, sum: 0, a: true, b: true, c: true, d: true, timestring: '', time: 0  },
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
    time: number;
    timestring: string;
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

        if(user) return [200, {name: user.name}]
        else return [500]
    })

    mock.onPost("/mypage").reply(({data})=> {
        const body = JSON.parse(data)
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(el=>el.name === body.name)
        if(user) return [200, {count: user.count, sum: user.sum, time: user.timestring}]
        else return [500]
    })

    mock.onPost("/count").reply(({data})=> {
        const body = JSON.parse(data)
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        let users2 = [...users];
        const user = users2.find(el=>el.name === body.name)
        //if문으로 error 코드를 return 해주면 밑에서 코드가 추론해줌 
        if(!user) return [400];
        const userCount = [user.a, user.b, user.c, user.d];

        for(let i=0; i<4; i++){
            if(body.message === `success${i+1}`){
                if(userCount[i]){
                    user.count++
                    userCount[i] = false;
                }
            }
        }
        user.a = userCount[0];
        user.b = userCount[1];
        user.c = userCount[2];
        user.d = userCount[3];
        
        user.sum++;

        localStorage.setItem('users', JSON.stringify(users2));
        if(user) return [200, {count: user.count, sum: user.sum}]
        else return [500]
    })

    mock.onPost("/timer").reply(({data})=> {
        const body = JSON.parse(data)
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        let users2 = [...users];
        const user = users2.find(el=>el.name === body.name);
        if(!user) return [400];

        let hour: number, min: number, sec: number;
        const checkTimer = (time : number)=> {
            let seconds = Math.floor(time / 1000)
            if(seconds < 60 ){
                return `00 : 00 : ${seconds}`
            }
            if(seconds <3600){
                let min = Math.floor(seconds / 60)
                let sec = seconds - min*60
                return `00 : ${min} : ${sec}`
            }
            if(seconds < 216000){
                let hour = Math.floor(seconds/3600)
                let min = Math.floor((seconds - hour*3600)/60)
                let sec = seconds - hour*3600 - min*60
                return `${hour} : ${min} : ${sec}`
            }

            return addZero(hour) + ':' + addZero(min) + ':' + addZero(sec)

            function addZero(num : number) {
                return ((num < 10) ? '0' : '') + num
            }
        }
        user.timestring = checkTimer(user.time);
        user.time += body.time;
        console.log(checkTimer(user.time))
        console.log(user.time, 'user.time');
        console.log(body.time, 'body.time');

        localStorage.setItem('users', JSON.stringify(users2));

        if(user) return [200]
        else return [500]
    })

}