import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// FORT KNOX: Supabase client - Vite uses import.meta.env
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

function App() {
  // FORT KNOX: Form state
  const [name, setName] = useState('')
  const [town, setTown] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  // FORT KNOX: Login handler
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: prompt('Enter your email for magic link:'),
      options: {
        emailRedirectTo: window.location.origin
      }
    })
    if (error) {
      alert('Login error: ' + error.message)
      console.log('Supabase login error:', error)
    } else {
      alert('Check your email for the magic link!')
    }
  }

  // FORT KNOX: Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('founding_members')
      .insert([{ name, town, phone, email, paid: false }])
    
    if (error) {
      alert('Signup error: ' + error.message)
    } else {
      alert('Details saved! Now complete payment below.')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <h1 className="text-yellow-400 text-sm font-bold">Fortune Brownies ©2026</h1>
        <button 
          onClick={handleLogin}
          className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm hover:bg-yellow-300"
        >
          Login
        </button>
      </header>

      {/* Main - FORT KNOX: w-[90%] + px-2 = No cutoff */}
      <main className="w-[90%] max-w-xl md:max-w-2xl mx-auto text-center px-2 py-8">
        <h2 className="text-4xl md:text-6xl font-black text-yellow-400 mb-4">
          We don't sell brownies.<br />We sell freedom.
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Lesotho's first automated micro-franchise for women.<br />
          One tray at a time.
        </p>

        {/* Payment Card */}
        <div className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">M250 Founding Member</h3>
          <p className="text-gray-400 mb-1">≈ $14.40 USD</p>
          <p className="text-gray-400 text-sm mb-4">0% monthly fees. Forever.</p>
          <p className="text-gray-300 text-sm mb-6">M50 per referral. Auto-paid to Ecocash/Mpesa.</p>
          
          <h4 className="text-yellow-400 font-bold mb-4">Get Access - Choose Payment:</h4>
          
          {/* FORT KNOX: USSD %23 encoding fixes # cutoff */}
          <div className="space-y-3">
            <a 
              href="tel:*199%23" 
              className="block w-full bg-yellow-400 text-black py-3 rounded font-bold hover:bg-yellow-300"
            >
              1. Ecocash - *199#
            </a>
            <a 
              href="tel:*200%23" 
              className="block w-full bg-yellow-400 text-black py-3 rounded font-bold hover:bg-yellow-300"
            >
              2. Mpesa - *200#
            </a>
            <a 
              href="tel:*120*223%23" 
              className="block w-full bg-yellow-400 text-black py-3 rounded font-bold hover:bg-yellow-300"
            >
              3. Post Bank - *120*223# / EFT
            </a>
          </div>

          <p className="text-gray-500 text-xs mt-4">
            Price goes back to M500.00 ≈ $28.80 USD on July 25th
          </p>
        </div>

        {/* FORT KNOX: Form with z-10 + onChange = Typing works */}
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-yellow-400 rounded-lg p-6 text-left">
          <h3 className="text-yellow-400 font-bold mb-4 text-center">Reserve Your Spot</h3>
          <div className="space-y-4">
            <input 
              type="text"
              placeholder="Full Name"
              className="relative z-10 w-full p-3 bg-black border border-yellow-400 rounded text-white placeholder-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input 
              type="text"
              placeholder="Town/Village"
              className="relative z-10 w-full p-3 bg-black border border-yellow-400 rounded text-white placeholder-gray-500"
              value={town}
              onChange={(e) => setTown(e.target.value)}
              required
            />
            <input 
              type="tel"
              placeholder="Phone: 5700 0000"
              className="relative z-10 w-full p-3 bg-black border border-yellow-400 rounded text-white placeholder-gray-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input 
              type="email"
              placeholder="Email"
              className="relative z-10 w-full p-3 bg-black border border-yellow-400 rounded text-white placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="w-full bg-yellow-400 text-black py-3 rounded font-bold hover:bg-yellow-300"
            >
              Submit Details
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 text-gray-500 text-sm">
        <p className="text-yellow-400 font-bold">CEO Direct WhatsApp: +266 570 31600</p>
        <p>Founded: Jan 2026 | Dev: Apr 18 | Launch: Apr 25</p>
        <p>© 2026 Fortune Brownies. From Khubetsoana to the world 🤍🧡</p>
      </footer>
    </div>
  )
}

export default App