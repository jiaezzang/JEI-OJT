import { AxiosInstance } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
const users=[
    { id: 'jiae22', password: '1234', name: '지애', count: 0, sum: 0 },
    { id: 'jiae33', password: '3456', name: 'jiae', count: 0, sum: 0 },
    { id: 'jiae44', password: '4567', name: 'kim', count: 0, sum: 0 },
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

    mock.onPost("/main").reply(({data}) => {
        const body = JSON.parse(data)
        //count, sum 업데이트하기
        users.map(el => {
            if(el.name = body.name){
                el.count = body.count;
                el.sum += body.sum;
            }
        })
        console.log()

        return [200]
    })

    mock.onPost("/mypage").reply(({data})=> {
        const body = JSON.parse(data)
        const user = users.find(el=>el.name === body.name)
        console.log(user)
        console.log(user?.count);
        
        //user.count = data.count
        if(user) return [200, {count: user.count, sum: user.sum}]
        else return [500]
    })

}