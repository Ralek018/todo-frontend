import { Link } from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function HeaderComponent() {
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated
    const username = authContext.username
    const isAdmin = authContext.isAdmin

    function logout() {
        authContext.logout()
    }

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to="/">
                            <i className="bi bi-check2-square text-primary me-2"></i>TodoApp
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                {isAuthenticated &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/welcome/${username}`}>Home</Link>
                                    </li>}
                                {isAuthenticated &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/todos">Todos</Link>
                                    </li>}
                               {isAuthenticated && isAdmin &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">Admin</Link>
                                    </li>}
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            {isAuthenticated &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
                                </li>}
                            {!isAuthenticated &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent