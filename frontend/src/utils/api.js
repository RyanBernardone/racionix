import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
})

// Intercepta todas as requisições e adiciona o token automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api
