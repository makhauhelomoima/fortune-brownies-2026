export default function App() {
  return (
    <main className="min-h-screen bg-black text-amber-50 font-sans">
      <div className="container mx-auto px-4 py-8 md:py-16">
        
        {/* NAV */}
        <nav className="flex justify-between items-center mb-12">
          <div className="text-2xl font-black text-amber-400">Fortune Brownies ©2026</div>
          <a 
            href="#join" 
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-all shadow-lg shadow-amber-500/30"
          >
            Join M250
          </a>
        </nav>

        {/* HERO */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 leading-tight">
            We don't sell brownies.<br/>We sell freedom.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-200 font-semibold max-w-3xl mx-auto">
            Lesotho's first automated micro-franchise for women. One tray at a time.
          </p>
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl border border-amber-500/30">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-amber-400">
              M250 Founding Member
            </h2>
            <p className="text-lg mb-2 text-amber-100">0% monthly fees. Forever.</p>
            <p className="text-lg mb-6 text-amber-100">M50 per referral. Auto-paid to Ecocash/Mpesa.</p>
            <a 
              href="https://wa.me/26657031600?text=FORT%20KNOX%20M250" 
              className="bg-gradient-to
