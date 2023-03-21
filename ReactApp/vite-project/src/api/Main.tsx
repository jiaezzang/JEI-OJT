import axios from 'axios';
import { createFakeAPI } from './mock';

const axiosInstance = axios.create();

export const postMain = (name:string) =>
  axiosInstance.post("/main",{name})

  createFakeAPI(axiosInstance)  
