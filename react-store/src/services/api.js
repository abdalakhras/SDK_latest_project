import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:5050/api',
    timeout:15000,
     withCredentials:true
})
//login interceptors to add token to headers

// api.interceptors.request.use((config)=>{
//     const token = localStorage.getItem('token');
//     if(token){
//         config.headers['auth'] = token
//     }
//     return config
// }, (error)=>{
//     return Promise.reject(error)
// })

export default api