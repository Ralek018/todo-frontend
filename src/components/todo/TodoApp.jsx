import './TodoApp.css'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import FooterComponent from './FooterComponent'
import AdminComponent from './AdminComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import TodoComponent from './TodoComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import RegisterComponent from './RegisterComponent'

function AutheticatedRoute({children}){

    const authContext = useAuth()

    if (authContext.isLoading) {
        return null           
    }

    if(authContext.isAuthenticated){
        return children
    }

    return <Navigate to="/"/>
    
}

function AdminRoute({ children }) {           
    const { isAuthenticated, isAdmin, isLoading } = useAuth()
    if (isLoading) return null
    if (isAuthenticated && isAdmin) return children
    return <Navigate to="/" />
}

export default function TodoApp (){
    return(
        <div className="TodoApp">
            
            <AuthProvider>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path='/' element={<LoginComponent />}></Route>
                    <Route path='/login' element={<LoginComponent />}></Route>
                    <Route path='/register' element={<RegisterComponent />}></Route>
                    <Route path='/welcome/:userName' element={
                        <AutheticatedRoute>
                            <WelcomeComponent />
                        </AutheticatedRoute>
                        }></Route>
                    <Route path='*' element={<ErrorComponent />}></Route>
                    <Route path='/todos' element={
                    <AutheticatedRoute>    
                        <ListTodosComponent />
                    </AutheticatedRoute>}></Route>
                    <Route path='/todo/:id' element={
                    <AutheticatedRoute>    
                        <TodoComponent />
                    </AutheticatedRoute>}></Route>
                    <Route path='/admin' element={
                    <AdminRoute>
                        <AdminComponent />
                    </AdminRoute>}></Route>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}