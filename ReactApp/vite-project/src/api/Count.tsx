import axios from 'axios';
import AxiosMockAdapter from "axios-mock-adapter";
import { createFakeAPI } from './mock';

const axiosInstance = axios.create();

export const postCount = (message: string, name: string) =>
  axiosInstance.post("/count",{message, name})

  createFakeAPI(axiosInstance)  