import axios from 'axios';
import { createFakeAPI } from './mock';

const axiosInstance = axios.create();

export const postTimer = (name:string, time:number) =>
  axiosInstance.post("/timer",{name, time})

  createFakeAPI(axiosInstance)  