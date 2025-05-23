import axios from "axios"

export const API_URL = "https://foodiefly-server-1.onrender.com"
// export const 

export const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})