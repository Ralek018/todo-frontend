import { createContext, useContext, useEffect, useState } from "react"
import { executeJwtAuthService } from "../api/AuthenticationApiService"

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuth] = useState(false)
    const [username, setUsername] = useState('')
    const [token, setToken] = useState('')
    const [role, setRole] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken')
        const storedUsername = localStorage.getItem('username')
        const storedRole = localStorage.getItem('role')
        if (storedToken) {
            setAuth(true)
            setToken(storedToken)
            setUsername(storedUsername)
            setRole(storedRole)
        }
        setIsLoading(false) 
    }, [])

    async function login(username, password) {
        try {
            const response = await executeJwtAuthService(username, password)
            if (response.status === 200) {
                const { accessToken, refreshToken, role } = response.data

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('username', username)
                localStorage.setItem('role', role)

                setAuth(true)
                setUsername(username)
                setToken(accessToken)
                setRole(role)
                return true
            }
            logout()
            return false
        } catch (error) {
            logout()
            return false
        }
    }

    function logout() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        setAuth(false)
        setToken(null)
        setUsername(null)
        setRole(null)
    }

    const isAdmin = role?.includes('ADMIN')

    const valueToBeShared = { isAuthenticated, login, logout, 
        username, token, role, isAdmin, isLoading }

    return (
        <AuthContext.Provider value={valueToBeShared}>
            {children}
        </AuthContext.Provider>
    )
}

