import { useEffect, useState } from "react"
import { retrieveAllUsers, deleteUserApi, toggleUserApi, changeUserRoleApi } from "./api/UserService"

function AdminComponent() {
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')

    function load() {
        retrieveAllUsers()
            .then(res => setUsers(res.data.todoUsers))  
            .catch(err => {
                if (err.response?.status === 403) setMessage("Admin access required to view this page.")
                else console.log(err)
            })
    }

    useEffect(() => { load() }, [])

    const toggle = (u) => toggleUserApi(u).then(load).catch(e => console.log(e))
    const setRole = (u, role) => changeUserRoleApi(u, role).then(load).catch(e => console.log(e))
    const remove = (u) => deleteUserApi(u).then(() => { setMessage(`Deleted ${u}`); load() }).catch(e => console.log(e))

    return (
        <div className="container">
            <h1 className="mb-3">User Management</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <table className="table table-hover align-middle bg-white shadow-sm">
                <thead className="table-light">
                    <tr>
                        <th>Username</th><th>Email</th><th>Role</th><th>Status</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>
                                <select className="form-select form-select-sm" value={u.role}
                                    onChange={(e) => setRole(u.username, e.target.value)}>
                                    <option value="ROLE_USER">ROLE_USER</option>
                                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                                </select>
                            </td>
                            <td>
                                <span className={`badge ${u.enabled ? 'bg-success' : 'bg-secondary'}`}>
                                    {u.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                            </td>
                            <td className="text-end">
                                <button className="btn btn-sm btn-outline-secondary me-2"
                                    onClick={() => toggle(u.username)}>
                                    {u.enabled ? 'Disable' : 'Enable'}
                                </button>
                                <button className="btn btn-sm btn-outline-danger"
                                    onClick={() => remove(u.username)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminComponent