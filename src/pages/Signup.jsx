import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [refCode, setRefCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get('ref')
    if (ref) {
      setRefCode(ref)
      setMessage(`Referred by: ${ref} ✅ You both earn when you pay M250`)
    }
  }, [])

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
    if (authError) {
      setMessage('Error: ' + authError.message)
      setLoading(false)
      return
    }

    const userCode = `FORT-${email.split('@')[0].toUpperCase().slice(0,4)}${Math.floor(Math.random()*99)}`
    
    const { error: dbError } = await supabase.from('founding_members').insert({
      id: authData.user.id,
      email: email,
      paid: false,
      member_tier: 'founding',
      referral_code: userCode,
      referred_by: refCode || null,
      referral_count: 0,
      referral_earnings: 0
    })

    if (dbError) {
      setMessage('Database error: ' + dbError.message)
    } else {
      setMessage('Account created ✅ Check email to confirm. Pay M250 to activate.')
      setTimeout(() => window.location.href = '/login', 4000)
    }
    setLoading(false)
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="border border-yellow-500 rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-yellow-400 text-center font-bold text-xl mb-1">Fortune Brownies ©2026</h1>
        <h2 className="text-yellow-400 text-center font-bold text-lg mb-2">FORT KNOX ACADEMY</h2>
        <p className="text-gray-400 text-center text-xs mb-6">M250 Founding Member - Lifetime Access</p>

        {refCode && (
          <div className="bg-yellow-900 border border-yellow-500 rounded p-2 mb-4 text-center">
            <div className="text-yellow-400 text-xs">You were referred by:</div>
            <div className="text-yellow-400 font-bold font-mono">{refCode}</div>
          </div>
        )}
        
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 bg-gray-900 border border-yellow-700 rounded text-white text-sm" required />
          <input type="password" placeholder="Password - min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 bg-gray-900 border border-yellow-700 rounded text-white text-sm" required minLength={6} />
          <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-black font-bold p-2 rounded mb-2 text-sm">
            {loading? 'Creating Account...' : 'Join Fort Knox - M250'}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/login" className="text-yellow-400 text-xs">Already a member? Login here</a>
        </div>

        {message && <div className="text-center text-xs mt-3 text-yellow-400">{message}</div>}
      </div>
    </div>
  )
}