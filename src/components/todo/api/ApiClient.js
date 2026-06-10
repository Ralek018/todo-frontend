import axios from "axios"

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

let refreshing = null

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config
        const isAuthCall = original.url?.includes('/authenticate/')

        if (error.response?.status === 401 && !original._retried && !isAuthCall) {
            original._retried = true
            try {
                if (!refreshing) {
                    const refreshToken = localStorage.getItem('refreshToken')
                    refreshing = axios.post(
                        'http://localhost:8080/authenticate/refresh',
                        { refreshToken }
                    )
                }
                const { data } = await refreshing
                refreshing = null

                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)

                original.headers.Authorization = `Bearer ${data.accessToken}`
                return apiClient(original)
            } catch (refreshError) {
                refreshing = null
                localStorage.clear()
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)