import { Navigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  )
  const checkTokenExpiration = useAuthStore(
    (state) => state.checkTokenExpiration
  )
  if (!isAuthenticated || !checkTokenExpiration()) {
    return <Navigate to="/" replace />
  }
console.log(isAuthenticated);
  return children
}