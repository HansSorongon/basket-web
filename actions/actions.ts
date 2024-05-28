'use server'

import axios, { AxiosResponse, AxiosError } from 'axios';



export async function getAssets() {
  axios.get('http://localhost:8080/api/v1/assets')
    .then((response: AxiosResponse<any>) => {
      return response;
    })
    .catch((error: AxiosError<any>) => {
      console.log(error);
    })
}

