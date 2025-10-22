import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const publicRoutes = ['/auth/login', '/auth/register'];

        if (!publicRoutes.includes(config.url)) {
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Autenticação
export const registerUser = async (data) => api.post('/auth/register', data);
export const loginUser = async (data) => api.post('/auth/login', data);
export const logoutUser = async () => SecureStore.deleteItemAsync('userToken');
export const getLoggedUser = () => api.get('/auth/me');

// Veículos - GET
export const getActiveVehicles = () => api.get('/api/veiculos');
export const getVehicleById = (id) => api.get(`/api/veiculos/id/${id}`);
export const getVehicleHistoryByPlate = (placa) => api.get(`/api/veiculos/placa/${placa}`);

// Veículos - POST/PUT
export const liberateEntrance = (placa) => api.post('/api/veiculos/entrada', { placa });
export const liberateExit = (placa) => api.put('/api/veiculos/saida', { placa });

export default api;