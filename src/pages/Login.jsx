import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else window.location.href = '/dashboard'
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-amber-50 flex items-center justify-center px-4">
      <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-amber-500/30">
        <h1 className="text-3xl font-black text-amber-400 mb-6 text-center">Fort Knox Login</h1>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 mb-4 text-amber-50 focus:outline-none focus:border-amber-400"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-amber-500/30 rounded-lg px-4 py-3 mb-4 text-amber-50 focus:outline-none focus:border-amber-400"
            required
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button 
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 disabled:opacity-50 text-black font-black py-3 rounded-lg text-lg transition-all"
          >
            {loading ? 'Opening Vault...' : 'Enter Fort Knox'}
          </button>
        </form>
        <p className="text-center text-amber-200/60 text-sm mt-6">
          New? Pay M250 first. WhatsApp +266 570 31600
        </p>
      </div>
    </main>
  )
}
