import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerApiService } from './api/AuthenticationApiService'

function RegisterComponent() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            const response = await registerApiService(username, email, password)
            if (response.status === 201) {
                setErrorMessage('')
                setSuccessMessage('Account created! Redirecting to login...')
                setTimeout(() => navigate('/login'), 1500)
            }
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.')
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Create an account</h2>

                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}

                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control" value={username}
                                       onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" value={email}
                                       onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" value={password}
                                       onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <button className="btn btn-primary w-100" onClick={handleSubmit}>Register</button>

                            <p className="text-center text-muted mt-3 mb-0">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent