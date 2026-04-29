import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPassword'

export default function App() {
  const path = window.location.pathname
  
  if (path === '/signup') return <Signup />
  if (path === '/dashboard') return <Dashboard />
  if (path === '/reset-password') return <ResetPassword />
  return <Login />
}