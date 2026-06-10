import { useParams, Link } from 'react-router-dom'

function WelcomeComponent() {
    const { userName } = useParams()

    return (
        <div className="container">
            <div className="card shadow-sm">
                <div className="card-body p-5 text-center">
                    <h1 className="mb-3">Welcome, {userName} 👋</h1>
                    <p className="text-muted mb-4">
                        Manage your tasks, track their status, and stay on top of your day.
                    </p>
                    <Link to="/todos" className="btn btn-primary btn-lg">
                        <i className="bi bi-list-check me-2"></i>Go to my Todos
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WelcomeComponent