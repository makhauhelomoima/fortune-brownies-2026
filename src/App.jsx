import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Home from './pages/Home'
import Login from './pages/Login'
import Member from './pages/Member'
import Admin from './pages/Admin'
import Academy from './pages/Academy'
import GiftShop from './pages/GiftShop'

const supabase = createClient(
  'https://lsljnbljovnaclinwxva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGpuYmxqb3ZuYWNsaW53eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjU5NjAsImV4cCI6MjA5MjY0MTk2MH0.tzouGrC6paS91NFkXNSWI8ZWlMX2RPZlR2W3uspdrr4'
)

function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data)
    setLoading(false)
  }

  if (loading) return <div className="min-h-screen bg-black text-[#fbbf24] flex items-center justify-center">Loading Fort Knox...</div>

  const isAdmin = profile?.role === 'admin'
  const isMember = profile?.is_member || isAdmin

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!session? <Login /> : <Navigate to={isAdmin? "/admin" : "/member"} />} />
        <Route path="/member" element={session && isMember? <Member profile={profile} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={session && isAdmin? <Admin profile={profile} /> : <Navigate to="/login" />} />
        <Route path="/academy" element={session && isMember? <Academy profile={profile} /> : <Navigate to="/login" />} />
        <Route path="/giftshop" element={session && isMember? <GiftShop profile={profile} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App