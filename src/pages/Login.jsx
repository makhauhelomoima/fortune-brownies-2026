import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

const supabase = createClient(
  'https://lsljnbljovnaclinwxva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGpuYmxqb3ZuYWNsaW53eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjU5NjAsImV4cCI6MjA5MjY0MTk2MH0.tzouGrC6paS91NFkXNSWI8ZWlMX2RPZlR2W3uspdrr4'
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (isAdminLogin) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }
    // App.jsx will auto-redirect based on role
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-4">
      <div className="max-w-md mx-auto mt-20">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Fortune Brownies ©2026</h1>
          <h2 className="text-xl font-bold">FORT KNOX ACADEMY</h2>
        </div>

        <div className="border-2 border-yellow-400 rounded-lg p-6 shadow-[0_0_15px_#facc15]">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-yellow-400 rounded p-3 mb-3 text-yellow-400 placeholder-yellow-400/50" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-yellow-400 rounded p-3 mb-4 text-yellow-400 placeholder-yellow-400/50" 
          />
          
          <button 
            onClick={() => handleLogin(false)}
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 rounded font-bold mb-2 disabled:opacity-50"
          >
            Member Access
          </button>
          
          <button 
            onClick={() => handleLogin(true)}
            disabled={loading}
            className="w-full border-2 border-red-600 text-red-600 py-3 rounded font-bold disabled:opacity-50"
          >
            CEO Login
          </button>
        </div>

        <div className="text-center text-sm mt-6">
          <p className="font-bold">Fortune Brownies ©2026</p>
          <p className="font-bold">FORT KNOX ACADEMY</p>
          <p className="mt-1">CEO: Makhauhelo Moima</p>
        </div>
      </div>
    </div>
  )
}