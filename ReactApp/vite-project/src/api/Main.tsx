import axios from 'axios';
import { createFakeAPI } from './mock';

const axiosInstance = axios.create();

export const postMain = (name:string, count: number, sum: number) =>
  axiosInstance.post("/main",{name, count, sum})

  createFakeAPI(axiosInstance)  
