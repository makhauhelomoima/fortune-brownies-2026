import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase, getCurrentUser } from './lib/supabase'
import AuthCallback from './pages/AuthCallback'

// --- PAGES ---
function Home() {
  return (
    <div style={{background: '#000', color: '#FFD700', minHeight: '100vh', 
                 display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{ textAlign: 'center' }}>
        <h1>🖤💛 FORTUNE1</h1>
        <p>Fort Knox Brownies</p>
        <a href="/login" style={{color: '#FFD700'}}>Login</a>
      </div>
    </div>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) {
      alert('Error: ' + error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div style={{background: '#000', color: '#FFD700', minHeight: '100vh', 
                 display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>🖤💛 Fort Knox Login</h1>
        {sent? (
          <p>Check your email for the magic link, Queen 👑</p>
        ) : (
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{padding: '10px', margin: '10px', background: '#111', 
                      color: '#FFD700', border: '1px solid #FFD700'}}
              required
            />
            <br/>
            <button type="submit" 
                    style={{padding: '10px 20px', background: '#FFD700', 
                            color: '#000', border: 'none', cursor: 'pointer'}}>
              Send Magic Link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then((data) => {
      setUser(data)
      setLoading(false)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div style={{background: '#000', color: '#FFD700', minHeight: '100vh', 
                   display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h2>Loading Fort Knox... 🖤💛</h2>
      </div>
    )
  }

  return (
    <div style={{background: '#000', color: '#FFD700', minHeight: '100vh', padding: '20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>🖤💛 FORTUNE1 Dashboard</h1>
        <button onClick={handleLogout} 
                style={{padding: '10px 20px', background: '#FFD700', 
                        color: '#000', border: 'none', cursor: 'pointer'}}>
          Logout
        </button>
      </div>
      
      <div style={{marginTop: '40px', border: '1px solid #FFD700', padding: '20px'}}>
        <h2>Welcome, {user?.first_name || 'Queen'} 👑</h2>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Auth ID:</strong> {user?.auth_id}</p>
        <p><strong>Member since:</strong> {new Date(user?.created_at).toLocaleDateString()}</p>
      </div>

      <div style={{marginTop: '20px', border: '1px solid #FFD700', padding: '20px'}}>
        <h3>Fort Knox Status: OPERATIONAL 🍫♾️</h3>
        <p>RLS: Enabled | Schema: Clean | Black & Gold: Intact</p>
      </div>
    </div>
  )
}

// --- PROTECTED ROUTE ---
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{background: '#000', color: '#FFD700', minHeight: '100vh', 
                   display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h2>Checking Fort Knox gates... 🖤💛</h2>
      </div>
    )
  }

  return session? children : <Navigate to="/login" />
}

// --- MAIN APP ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
    }
