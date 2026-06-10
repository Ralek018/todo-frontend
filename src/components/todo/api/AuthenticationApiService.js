import { apiClient } from "./ApiClient"

export const executeJwtAuthService = (username, password) =>
    apiClient.post('/authenticate/login', { username, password })

export const registerApiService = (username, email, password) =>
    apiClient.post('/authenticate/register', { username, email, password })