import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthSecurity } from './AuthProvider'

interface IRequireAuthProps {
  children: JSX.Element
}
const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
  let location = useLocation()
  const { isAuthenticated } = useAuthSecurity()
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default RequireAuth
