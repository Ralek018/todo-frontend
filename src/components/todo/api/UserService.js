import { apiClient } from "./ApiClient"

export const retrieveAllUsers = () => apiClient.get('/admin/users')
export const deleteUserApi = (username) => apiClient.delete(`/admin/users/${username}`)
export const toggleUserApi = (username) => apiClient.put(`/admin/users/${username}/toggle`)
export const changeUserRoleApi = (username, role) =>
    apiClient.put(`/admin/users/${username}/role`, { role })