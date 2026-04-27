import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Supabase handles the code exchange automatically
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    })
  }, [navigate])

  return (
    <div style={{
      background: '#000', 
      color: '#FFD700', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>🖤💛</h1>
        <h2>Logging you in to Fort Knox...</h2>
        <p>Welcome back, Makhauhelo</p>
      </div>
    </div>
  )
    }
