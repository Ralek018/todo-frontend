import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUser } from "./api/TodoService"
import { useNavigate } from "react-router-dom"
import { useAuth } from './security/AuthContext'

function ListTodosComponent() {

    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState('')

    function getUserTodos() {
        return retrieveAllTodosForUser(username)
            .then(response => setTodos(response.data.todos))
            .catch(error => console.log(error))
    }

    useEffect(() => { getUserTodos() }, [])

    function modifyDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
    }

    function statusClass(status) {
        switch (status) {
            case 'COMPLETED':   return 'bg-success'
            case 'IN_PROGRESS': return 'bg-primary'
            case 'CANCELLED':   return 'bg-secondary'
            default:            return 'bg-warning text-dark' 
        }
    }

    function deleteTodo(username, id) {
        deleteTodoApi(username, id)
            .then(() => {
                setMessage(`Todo deleted successfully`)
                getUserTodos()
            })
            .catch(error => console.log(error))
    }

    function updateTodo(id) { navigate(`/todo/${id}`) }
    function createTodo() { navigate('/todo/-1') }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="m-0">Things You Want To Do!</h1>
                <button className="btn btn-primary" onClick={createTodo}>
                    <i className="bi bi-plus-lg me-1"></i> New Todo
                </button>
            </div>

            {message && <div className="alert alert-success">{message}</div>}

            <table className="table table-hover align-middle bg-white shadow-sm rounded">
                <thead className="table-light">
                    <tr>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Target Date</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td><span className={`badge ${statusClass(todo.status)}`}>{todo.status}</span></td>
                            <td>{modifyDate(todo.targetDate)}</td>
                            <td className="text-end">
                                <button className="btn btn-sm btn-outline-success me-2" title="Edit"
                                    onClick={() => updateTodo(todo.id)}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger" title="Delete"
                                    onClick={() => deleteTodo(username, todo.id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {todos.length === 0 &&
                <p className="text-muted text-center mt-4">No todos yet — create your first one!</p>}
        </div>
    )
}

export default ListTodosComponent