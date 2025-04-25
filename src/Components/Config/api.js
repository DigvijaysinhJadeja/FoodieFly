import axios from "axios"

export const API_URL = "foodiefly-server-production-c42e.up.railway.app"
// export const 

export const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})