import axios from 'axios'

// Configuración de axios
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Asegúrate que esta URL coincida con tu backend
    withCredentials: true
})

// Interceptor de respuestas
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.error('No autorizado - redirigiendo a login')
            // Aquí puedes redirigir al login si es necesario
        }
        return Promise.reject(error)
    }
)

// Exporta como default
export default api