import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert(error.message)
      else navigate('/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) alert(error.message)
      else alert('Check your email for confirmation! Then login.')
    }
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#000000', color: '#D4AF37', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <form onSubmit={handleAuth} style={{ backgroundColor: '#0a0a0a', padding: '2rem', borderRadius: '16px', border: '2px solid #D4AF37', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.6rem', color: '#D4AF37' }}>Fort Knox Access</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '1rem', backgroundColor: '#000000', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '8px', fontSize: '1.05rem' }} required />
        <input type="password" placeholder="Password - min 6 chars" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '1.5rem', backgroundColor: '#000000', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '8px', fontSize: '1.05rem' }} required />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', backgroundColor: '#00C851', color: '#000000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', marginBottom: '1rem' }}>
          {loading ? 'Processing...' : isLogin ? 'Unlock Fort Knox' : 'Create Account'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} style={{ textAlign: 'center', textDecoration: 'underline', cursor: 'pointer', fontSize: '1rem', color: '#D4AF37' }}>
          {isLogin ? 'Need account? Sign up' : 'Have account? Login'}
        </p>
      </form>
    </div>
  )
                       }
