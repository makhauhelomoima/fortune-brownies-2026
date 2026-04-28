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
            className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-300"
          >
            Login
          </button>
        </div>

        <h1 className="text-5xl font-bold mb-6">
          We don't sell brownies.<br/>
          We sell freedom.
        </h1>
        
        <p className="text-lg mb-10 text-gray-300">
          Lesotho's first automated micro-franchise for women. One tray at a time.
        </p>

        <div className="border-2 border-yellow-400 rounded-xl p-8 mb-8 bg-gray-900/50">
          <h3 className="text-3xl font-bold mb-4">M250 Founding Member</h3>
          <p className="text-xl mb-2 text-gray-300">\$14.40 USD</p>
          <p className="mb-2">0% monthly fees. Forever.</p>
          <p className="mb-6">M50 per referral. Auto-paid to Ecocash/Mpesa.</p>
          
          <a 
            href="https://wa.me/26657031600?text=I%20want%20FORTUNE1%20M250%20Founding%20Member"
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg inline-block hover:bg-yellow-300"
          >
            Join WhatsApp - M250 / $14.40
          </a>
          
          <p className="text-sm mt-6 text-gray-400">
            M250 / $14.40 now. Price goes back to normal M500.00 / $28.80 on July 25th
          </p>
        </div>

        <div className="text-sm text-gray-400">
          <p className="font-bold text-yellow-400">CEO Direct WhatsApp: +266 570 31600</p>
          <p className="text-xs mt-3">Founded: January 2026 | Dev: April 18, 2026 | Launch: April 25, 2026</p>
          <p className="text-xs mt-1">© 2026 Fortune Brownies. From Khubetsoana to the world 🤍🇱🇸</p>
        </div>
      </div>
    </div>
  )
}

export default App