import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from './security/AuthContext'

function LoginComponent() {
    const authContext = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit() {
        if (await authContext.login(username, password)) {
            const role = localStorage.getItem('role')
            navigate(role?.includes('ADMIN') ? '/admin' : `/welcome/${username}`)
        } else {
            setErrorMessage(true)
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Login</h2>

                            {showErrorMessage &&
                                <div className="alert alert-danger">
                                    Authentication failed. Please check your credentials.
                                </div>}

                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" value={username}
                                       onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" value={password}
                                       onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <button className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>

                            <p className="text-center text-muted mt-3 mb-0">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent