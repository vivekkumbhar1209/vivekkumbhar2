import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const token = localStorage.getItem('login-token')

  return token ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
