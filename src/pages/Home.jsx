export default function Home() {
  const handleEcocash = () => {
    window.location.href = 'tel:*199#'
  }

  const handleMpesa = () => {
    window.location.href = 'tel:*200#'
  }

  const handlePostBank = () => {
    alert('Post Bank Payment:\n\nDial: *120*223#\nOR\nEFT to:\Makhauhelo Moima\nAcc: 1036202900018\nBranch: BONHOMME\n\nSend proof to WhatsApp: +266 57031600')
  }

  const handleLogin = () => {
    alert('Login coming tonight at 8PM.\n\nM250 Members get Dashboard access after payment.\n\nSend payment proof to WhatsApp to get instant access.')
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-4">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-lg font-bold">Fortune Brownies ©2026</h1>
            <h2 className="text-md">FORT KNOX ACADEMY</h2>
          </div>
          <button 
            onClick={handleLogin}
            className="bg-yellow-400 text-black px-4 py-1 rounded font-bold text-sm"
          >
            Login
          </button>
        </div>

        <hr className="border-yellow-400 mb-8" />

        {/* Hero */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 leading-tight">
            We don't just sell<br/>brownies.<br/>We sell freedom.
          </h3>
          <p className="text-sm mb-1">Lesotho's first automated micro-franchise</p>
          <p className="text-sm mb-1">for women.</p>
          <p className="text-sm">One tray at a time.</p>
        </div>

        {/* M250 Box */}
        <div className="border-2 border-yellow-400 rounded-lg p-6 shadow-[0_0_20px_#facc15]">
          <div className="text-center mb-4">
            <h4 className="text-xl font-bold mb-1">M250 Founding Member</h4>
            <p className="text-sm">≈ $14.40 USD</p>
            <p className="text-sm">0% monthly fees. Forever.</p>
          </div>
          
          <div className="text-center text-sm mb-4">
            <p>M50 per referral. Auto-paid to Ecocash/Mpesa.</p>
          </div>

          <div className="text-center mb-4">
            <p className="font-bold mb-3">Get Access - Choose Payment:</p>
            
            <button 
              onClick={handleEcocash}
              className="w-full bg-yellow-400 text-black py-3 rounded mb-2 font-bold active:bg-yellow-500"
            >
              1. Ecocash - *199#
            </button>
            
            <button 
              onClick={handleMpesa}
              className="w-full bg-yellow-400 text-black py-3 rounded mb-2 font-bold active:bg-yellow-500"
            >
              2. Mpesa - *200#
            </button>
            
            <button 
              onClick={handlePostBank}
              className="w-full bg-yellow-400 text-black py-3 rounded mb-4 font-bold active:bg-yellow-500"
            >
              3. Post Bank - *120*223# / EFT
            </button>
          </div>

          <p className="text-xs text-center">
            Price goes back to M500.00 ≈ $28.80 USD on July 25th
          </p>
        </div>

        <hr className="border-yellow-400 my-8" />

        {/* Footer */}
        <div className="text-center text-sm">
          <p className="font-bold">Fortune Brownies ©2026</p>
          <p className="font-bold">FORT KNOX ACADEMY</p>
          <p className="mt-2">CEO: Makhauhelo Moima</p>
        </div>

      </div>
    </div>
  )
}