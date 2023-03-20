import axios from 'axios';
import { createFakeAPI } from './mock';


export const postMyPage = (name:string, count: number, sum: number) =>
    axios.post("/mypage",{name, count, sum})

  createFakeAPI(axios)  
