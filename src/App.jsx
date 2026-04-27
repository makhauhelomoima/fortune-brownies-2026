import { useState, useEffect } from 'react'
import { supabase } from './supabase'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function signInWithEmail() {
    const email = prompt('Enter your email for Magic Link')
    if (email) {
      await supabase.auth.signInWithOtp({ email })
      alert('Check your email for Magic Link!')
    }
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm">Fortune Brownies ©2026</div>
          <button 
            onClick={signInWithEmail}
            className="bg-yellow-400 text-black px-4 py-2 rounded font-bold"
          >
            Login
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-4">
          🖤💛 FORTUNE1
        </h1>
        
        <h2 className="text-3xl font-bold mb-2">
          We don't sell brownies.
        </h2>
        <h2 className="text-3xl font-bold mb-8">
          We sell freedom.
        </h2>

        <p className="text-lg mb-8">
          Lesotho's first automated micro-franchise for women. One tray at a time.
        </p>

        <div className="border-2 border-yellow-400 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold mb-4">M250 Founding Member</h3>
          <p className="mb-2">0% monthly fees. Forever.</p>
          <p className="mb-4">M50 per referral. Auto-paid to Ecocash/Mpesa.</p>
          <a 
            href="https://wa.me/26657031600?text=I%20want%20FORTUNE1%20M250"
            className="bg-yellow-400 text-black px-6 py-3 rounded font-bold inline-block"
          >
            Join WhatsApp - M250
          </a>
          <p className="text-sm mt-4">Standard price M500 after July 25, 2026</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded">
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm">Founder</div>
            <div className="text-xs">You tested it 🤍</div>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm">Systems</div>
            <div className="text-xs">Supabase + Vercel + WhatsApp</div>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <div className="text-2xl font-bold">150+</div>
            <div className="text-sm">Countries</div>
            <div className="text-xs">Paystack enabled</div>
          </div>
        </div>

        <div className="text-sm">
          <p className="font-bold">CEO Direct WhatsApp: +266 570 31600</p>
          <p className="text-xs mt-2">Founded: January 2026 | Dev: April 18, 2026 | Launch: April 25, 2026</p>
          <p className="text-xs">© 2026 Fortune Brownies. From Khubetsoana to the world 🤍🇱🇸</p>
        </div>
      </div>
    </div>
  )
}

export default App
