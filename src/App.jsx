import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  // FORT KNOX SESSION + ROLE LISTENER
  useEffect(() => {
    // Check current session on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsAdmin(session?.user?.email === 'makhauhelomoima@gmail.com')
      setLoading(false)
    })

    // Listen for login/logout changes - THIS FIXES MAGIC LINK
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsAdmin(session?.user?.email === 'makhauhelomoima@gmail.com')
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // LOGIN FUNCTION
  const handleLogin = async () => {
    const email = prompt('Enter your email for magic link')
    if (email) {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) alert('Error: ' + error.message)
      else alert('Check your email for the magic link!')
    }
  }

  // LOGOUT FUNCTION
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div style={{ background: '#000', color: '#FFD700', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Loading Fort Knox... 🖤💛</h1>
      </div>
    )
  }

  return (
    <div style={{ background: '#000', color: '#FFD700', minHeight: '100vh', padding: '20px', fontFamily: 'Arial' }}>
      {!session ? (
        // PUBLIC VIEW - NOT LOGGED IN
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Fortune Brownies 🍫</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>M250 Founding Member Program</p>
          <button 
            onClick={handleLogin}
            style={{ 
              background: '#FFD700', 
              color: '#000', 
              border: 'none', 
              padding: '15px 30px', 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Login / Join
          </button>
        </div>
      ) : isAdmin ? (
        // HQ DASHBOARD - ONLY MAKHAUHELO SEES THIS
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #FFD700', paddingBottom: '20px', marginBottom: '30px' }}>
            <h1>Fort Knox HQ 👑</h1>
            <button 
              onClick={handleLogout}
              style={{ background: '#FFD700', color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
          <h2>Welcome, CEO Makhauhelo</h2>
          <p>Logged in as: {session.user.email}</p>
          <div style={{ background: '#111', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
            <h3>Quick Stats</h3>
            <p>Members: Coming soon...</p>
            <p>Revenue: Coming soon...</p>
          </div>
        </div>
      ) : (
        // MEMBER DASHBOARD - NEW USERS SEE THIS
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #FFD700', paddingBottom: '20px', marginBottom: '30px' }}>
            <h1>Welcome to Fortune Brownies 🍫</h1>
            <button 
              onClick={handleLogout}
              style={{ background: '#FFD700', color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
          <h2>Founding Member Portal</h2>
          <p>Logged in as: {session.user.email}</p>
          <div style={{ background: '#111', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
            <h3>Your Status</h3>
            <p>Membership: Founding Member ♾️</p>
            <p>Payment: Complete your M250 payment via USSD</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App  // <-- THIS LINE FIXES YOUR BUILD ERROR