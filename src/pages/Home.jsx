function Home() {
  return (
    <div className="min-h-screen bg-black text-yellow-400">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex justify-between items-center border-b border-yellow-400 pb-4">
          <div>
            <h1 className="text-2xl font-bold">Fortune Brownies ©2026</h1>
            <p className="text-sm">FORT KNOX ACADEMY</p>
          </div>
          <a href="/login" className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">Login</a>
        </header>

        <main className="text-center py-12">
          <h2 className="text-4xl font-bold mb-4">We don't sell brownies.<br/>We sell freedom.</h2>
          <p className="mb-8">Lesotho's first automated micro-franchise<br/>for women.<br/>One tray at a time.</p>

          <div className="border-2 border-yellow-400 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-2">M250 Founding Member</h3>
            <p className="text-sm mb-4">≈ $14.40 USD<br/>0% monthly fees. Forever.</p>
            <p className="mb-4">M50 per referral. Auto-paid to Ecocash/Mpesa.</p>
            <p className="font-bold mb-4">Get Access - Choose Payment:</p>
            
            <div className="space-y-3">
              <div className="bg-yellow-400 text-black py-3 rounded font-bold">1. Ecocash - *199#</div>
              <div className="bg-yellow-400 text-black py-3 rounded font-bold">2. Mpesa - *200#</div>
              <div className="bg-yellow-400 text-black py-3 rounded font-bold">3. Post Bank - *120*223# / EFT</div>
            </div>
            
            <p className="text-xs mt-4">Price goes back to M500.00 ≈ $28.80 USD on July 25th</p>
          </div>
        </main>

        <footer className="text-center border-t border-yellow-400 pt-4 mt-8">
          <p className="font-bold">Fortune Brownies ©2026</p>
          <p className="text-sm">FORT KNOX ACADEMY</p>
          <p className="text-sm">CEO: Makhauhelo Moima</p>
        </footer>
      </div>
    </div>
  )
}

export default Home