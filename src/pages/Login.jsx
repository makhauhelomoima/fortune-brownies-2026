import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // NORMAL LOGIN
  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setMessage('Wrong password. Try again or reset below.')
    } else {
      window.location.href = '/dashboard' // Or wherever Admin is
    }
    setLoading(false)
  }

  // PASSWORD RESET - THIS FIXES YOUR PROBLEM
  async function handlePasswordReset() {
    if (!email) {
      setMessage('Enter your email first, then click Reset Password')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://ownies-2026.vercel.app/reset-password', // Page where they set new password
    })
    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Check your email. Password reset link sent ✅')
    }
    setLoading(false)
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="border border-yellow-500 rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-yellow-400 text-center font-bold text-xl mb-4">
          FORT KNOX LOGIN
        </h1>
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-900 border border-yellow-700 rounded text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-900 border border-yellow-700 rounded text-white"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black font-bold p-2 rounded mb-2"
          >
            {loading? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* THIS IS THE RESET BUTTON THOMAS NEEDS */}
        <button
          onClick={handlePasswordReset}
          disabled={loading}
          className="w-full border border-yellow-500 text-yellow-400 p-2 rounded"
        >
          Forgot Password? Reset Here
        </button>

        {message && (
          <div className="text-center text-sm mt-3 text-yellow-400">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}