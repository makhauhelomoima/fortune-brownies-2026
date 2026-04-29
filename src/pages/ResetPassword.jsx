import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleReset(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login',
    })
    if (error) setMessage(error.message)
    else setMessage('Password reset link sent! Check your email.')
    setLoading(false)
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="border border-yellow-500 rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-yellow-400 text-center font-bold text-xl mb-1">Fortune Brownies ©2026</h1>
        <h2 className="text-yellow-400 text-center font-bold text-lg mb-6">RESET PASSWORD</h2>
        <form onSubmit={handleReset}>
          <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 bg-gray-900 border border-yellow-700 rounded text-white text-sm" required />
          <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-black font-bold p-2 rounded mb-2 text-sm">
            {loading? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="text-center mt-4"><a href="/login" className="text-yellow-400 text-xs">Back to Login</a></div>
        {message && <div className="text-center text-xs mt-3 text-yellow-400">{message}</div>}
      </div>
    </div>
  )
}