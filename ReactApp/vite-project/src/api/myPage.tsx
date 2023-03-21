import axios from 'axios';
import { createFakeAPI } from './mock';

const axiosInstance = axios.create();

export const postMyPage = (name:string) =>
  axiosInstance.post("/mypage",{name})

  createFakeAPI(axiosInstance)  
