import { useState } from 'react'

export default function App() {
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [formData, setFormData] = useState({
    name: '', town: '', phone: '', email: ''
  })

  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const openUSSD = (ussd) => {
    const encoded = encodeURIComponent(ussd)
    window.location.href = `tel:${encoded}`
  }

  const confirmPaymentWhatsApp = (method, ussd, account) => {
    const msg = `FORTUNE1 PAYMENT SENT
Name: ${formData.name}
Town: ${formData.town}
Phone: ${formData.phone}
Email: ${formData.email}
Reference: ${formData.phone}
Method: ${method}
USSD Used: ${ussd}
Amount: M250 ≈ $14.40 USD
Sent to: ${account}
Status: MONEY SENT VIA USSD. SEND LEVEL 1 KIT.`
    
    const whatsappNumber = method === 'Ecocash' ? '26662818000' : '26657031600'
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const PaymentForm = ({ method, account, number, ussd, isEFT }) => (
    <div className="border-2 border-yellow-400 rounded-xl p-5 bg-gray-900 text-left">
      <h4 className="font-bold text-2xl mb-4 text-center text-yellow-400">{method}</h4>
      
      <div className="space-y-4 mb-4">
        <input 
          type="text"
          name="name" 
          value={formData.name}
          placeholder="Insert your name" 
          onChange={handleInput} 
          autoComplete="name"
          className="w-full p-4 rounded bg-black border-2 border-yellow-400 text-white text-lg outline-none focus:ring-2 focus:ring-yellow-400" 
          style={{pointerEvents: 'auto', touchAction: 'manipulation'}}
        />
        <input 
          type="text"
          name="town" 
          value={formData.town}
          placeholder="Insert your town" 
          onChange={handleInput}
          autoComplete="address-level2"
          className="w-full p-4 rounded bg-black border-2 border-yellow-400 text-white text-lg outline-none focus:ring-2 focus:ring-yellow-400"
          style={{pointerEvents: 'auto', touchAction: 'manipulation'}}
        />
        <input 
          type="tel"
          name="phone" 
          value={formData.phone}
          placeholder="Insert number" 
          onChange={handleInput}
          autoComplete="tel"
          className="w-full p-4 rounded bg-black border-2 border-yellow-400 text-white text-lg outline-none focus:ring-2 focus:ring-yellow-400"
          style={{pointerEvents: 'auto', touchAction: 'manipulation'}}
        />
        <input 
          type="email"
          name="email" 
          value={formData.email}
          placeholder="Insert email" 
          onChange={handleInput}
          autoComplete="email"
          className="w-full p-4 rounded bg-black border-2 border-yellow-400 text-white text-lg outline-none focus:ring-2 focus:ring-yellow-400"
          style={{pointerEvents: 'auto', touchAction: 'manipulation'}}
        />
        <input 
          type="text"
          value={formData.phone} 
          disabled 
          placeholder="Reference: [your number]"
          className="w-full p-4 rounded bg-gray-800 border-2 border-yellow-400/30 text-gray-400 text-lg" 
        />
      </div>

      <div className="bg-yellow-400/10 p-4 rounded mb-4 text-sm">
        <p className="font-bold mb-2">Join the Fortune Brownies © 2026 Fort Knox Kitchen Hustlers Level 1 @ M250</p>
        <p className="mb-2">Save M250. Normal Price M500.00 ≈ $28.80 USD</p>
        <p className="font-bold text-yellow-400">Send to: {account}</p>
        {number && <p className="text-yellow-400">Number: {number}</p>}
        <p className="font-bold text-green-400 mt-2 text-lg">USSD: {ussd}</p>
      </div>

      {!isEFT ? (
        <>
          <button 
            onClick={() => openUSSD(ussd)}
            disabled={!formData.name || !formData.phone}
            className="w-full bg-green-600 hover:bg-green-500 active:bg-green-700 disabled:bg-gray-700 disabled:text-gray-400 text-white font-bold py-5 rounded-lg text-xl transition-all mb-3"
          >
            1. Tap to Dial {ussd} & Pay M250
          </button>
          <button 
            onClick={() => confirmPaymentWhatsApp(method, ussd, account)}
            disabled={!formData.name || !formData.phone}
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 text-white font-bold py-4 rounded-lg text-lg transition-all"
          >
            2. I Sent Money - Confirm via WhatsApp
          </button>
          <p className="text-xs text-center mt-2 text-gray-400">
            Step 1 opens your phone dialer. Step 2 notifies Queen.
          </p>
        </>
      ) : (
        <>
          <div className="bg-blue-400/10 p-3 rounded mb-3 text-sm">
            <p className="font-bold mb-1">EFT Details:</p>
            <p>Bank: Lesotho Post Bank</p>
            <p>Account: 1036202900018</p>
            <p>Name: MAKHAUHELO MOIMA</p>
            <p>Branch: BONHOMME, MASERU</p>
            <p>Reference: {formData.phone || '[Your Phone Number]'}</p>
          </div>
          <button 
            onClick={() => openUSSD(ussd)}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-lg text-lg transition-all mb-3"
          >
            Tap to Dial {ussd} Mobile Banking
          </button>
          <button 
            onClick={() => confirmPaymentWhatsApp(method, ussd, account)}
            disabled={!formData.name || !formData.phone}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-400 text-white font-bold py-4 rounded-lg text-xl transition-all"
          >
            I Sent EFT - Confirm via WhatsApp
          </button>
        </>
      )}
    </div>
  )

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-start p-2 md:p-4 font-sans">
      <div className="w-[95%] md:max-w-2xl mx-auto text-center">
        
        <div className="flex justify-between items-center mb-6 px-2">
          <p className="text-lg md:text-xl font-bold">Fortune Brownies ©2026</p>
          <button className="bg-yellow-400 text-black px-5 py-3 rounded font-bold text-base">
            Login
          </button>
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight px-2">
          We don't sell brownies.<br/>
          We sell freedom.
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-300 px-4">
          Lesotho's first automated micro-franchise for women. One tray at a time.
        </p>

        {!paymentMethod ? (
          <div className="border-2 border-yellow-400 rounded-xl p-6 md:p-8 mb-6 bg-gray-900">
            <h3 className="text-3xl md:text-4xl font-bold mb-3">M250 Founding Member</h3>
            <p className="text-xl md:text-2xl mb-2 text-gray-300">≈ $14.40 USD</p>
            <p className="text-lg mb-1">0% monthly fees. Forever.</p>
            <p className="text-lg mb-6">M50 per referral. Auto-paid to Ecocash/Mpesa.</p>
            
            <h4 className="font-bold text-2xl mb-4">Get Access - Choose Payment:</h4>
            <div className="space-y-4">
              <button onClick={() => setPaymentMethod('Ecocash')}
                className="bg-yellow-400 text-black px-6 py-5 rounded-lg font-bold text-xl w-full hover:bg-yellow-300 active:bg-yellow-500">
                1. Ecocash - *199#
              </button>
              <button onClick={() => setPaymentMethod('Mpesa')}
                className="bg-yellow-400 text-black px-6 py-5 rounded-lg font-bold text-xl w-full hover:bg-yellow-300 active:bg-yellow-500">
                2. Mpesa - *200#
              </button>
              <button onClick={() => setPaymentMethod('PostBank')}
                className="bg-yellow-400 text-black px-6 py-5 rounded-lg font-bold text-xl w-full hover:bg-yellow-300 active:bg-yellow-500">
                3. Post Bank - *120*223# / EFT
              </button>
            </div>
            
            <p className="text-base mt-4 text-gray-400">
              Price goes back to M500.00 ≈ $28.80 USD on July 25th
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <button onClick={() => setPaymentMethod(null)} className="mb-4 text-lg text-gray-400 underline">
              ← Back to payment methods
            </button>
            {paymentMethod === 'Ecocash' && <PaymentForm method="Ecocash" account="+26662818000" number="+26662818000" ussd="*199#" />}
            {paymentMethod === 'Mpesa' && <PaymentForm method="Mpesa" account="+26657031600" number="+26657031600" ussd="*200#" />}
            {paymentMethod === 'PostBank' && <PaymentForm method="Lesotho Post Bank" account="1036202900018, MAKHAUHELO MOIMA" ussd="*120*223#" isEFT={true} />}
          </div>
        )}

        <div className="text-center text-base text-gray-400 px-4 pb-8">
          <p className="font-bold text-yellow-400 mb-1 text-lg">CEO Direct WhatsApp: +266 570 31600</p>
          <p>Founded: Jan 2026 | Dev: Apr 18 | Launch: Apr 25</p>
          <p className="mt-3">© 2026 Fortune Brownies. From Khubetsoana to the world 🤍🇱🇸</p>
        </div>

      </div>
    </main>
  )
}