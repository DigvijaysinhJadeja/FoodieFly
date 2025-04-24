import axios from "axios"

export const API_URL = "https://foodiefly-server-production.up.railway.app"
// export const 

export const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})