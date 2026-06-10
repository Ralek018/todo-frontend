import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import { createTodoApi, retrieveUserTodoById, updateTodoApi } from "./api/TodoService"
import { useEffect, useState } from "react"
import { Form, Formik, Field, ErrorMessage } from "formik"
import moment from "moment"

export default function TodoComponent() {

    const navigate = useNavigate()
    const authContext = useAuth()
    const username = authContext.username
    const { id } = useParams()

    const [description, setDesc] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const [status, setStatus] = useState('PENDING')

    const isNew = id == -1

    useEffect(() => { retrieveTodos() }, [id])

    function retrieveTodos() {
        if (!isNew) {
            retrieveUserTodoById(username, id)
                .then(response => {
                    setDesc(response.data.description)
                    setTargetDate(response.data.targetDate)
                    setStatus(response.data.status)
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        const todo = {
            description: values.description,
            targetDate: values.targetDate,
            status: values.status
        }
        if (isNew) {
            createTodoApi(username, todo).then(() => navigate('/todos')).catch(e => console.log(e))
        } else {
            updateTodoApi(username, id, todo).then(() => navigate('/todos')).catch(e => console.log(e))
        }
    }

    function validate(values) {
        let errors = {}
        if (values.description.length < 5) errors.description = 'Enter at least 5 characters'
        if (!values.targetDate || !moment(values.targetDate).isValid())
            errors.targetDate = 'Enter a valid target date'
        return errors
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">{isNew ? 'Add Todo' : 'Edit Todo'}</h2>

                            <Formik initialValues={{ description, targetDate, status }}
                                enableReinitialize={true}
                                onSubmit={onSubmit}
                                validate={validate}
                                validateOnChange={false}
                                validateOnBlur={false}>
                                {
                                    () => (
                                        <Form>
                                            <div className="mb-3">
                                                <label className="form-label">Description</label>
                                                <Field type="text" className="form-control" name="description" />
                                                <ErrorMessage name="description" component="div"
                                                    className="text-danger small mt-1" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Target Date</label>
                                                <Field type="date" className="form-control" name="targetDate" />
                                                <ErrorMessage name="targetDate" component="div"
                                                    className="text-danger small mt-1" />
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label">Status</label>
                                                <Field as="select" className="form-select" name="status">
                                                    <option value="PENDING">Pending</option>
                                                    <option value="IN_PROGRESS">In progress</option>
                                                    <option value="COMPLETED">Completed</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </Field>
                                            </div>

                                            <div className="d-flex gap-2">
                                                <button className="btn btn-success flex-fill" type="submit">
                                                    <i className="bi bi-check-lg me-1"></i>Save
                                                </button>
                                                <button className="btn btn-outline-secondary flex-fill" type="button"
                                                    onClick={() => navigate('/todos')}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}