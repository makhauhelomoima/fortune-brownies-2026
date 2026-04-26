import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Level1Kit() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    location: ''
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // COUNTDOWN TO JULY 25, 2026
  useEffect(() => {
    const targetDate = new Date('2026-07-25T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('franchisees')
        .insert([
          { 
            ...formData, 
            level: 1, 
            payment_status: 'pending',
            amount_paid: 250,
            created_at: new Date()
          }
        ]);

      if (error) throw error;
      
      setStatus('success');
      setMessage('Application received! Payment details below.');
    } catch (error) {
      setStatus('error');
      setMessage('Error: ' + error.message + '. WhatsApp +26657031600');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* COUNTDOWN BANNER - M500 AFTER */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl p-4 mb-6 text-center border-2 border-yellow-400">
          <p className="text-black font-black text-sm mb-2">🔥 FOUNDING MEMBER PRICING ENDS:</p>
          <div className="flex justify-center gap-3 text-black">
            <div className="bg-black/20 px-3 py-2 rounded-lg">
              <div className="text-2xl font-black text-white">{timeLeft.days}</div>
              <div className="text-xs font-bold">DAYS</div>
            </div>
            <div className="bg-black/20 px-3 py-2 rounded-lg">
              <div className="text-2xl font-black text-white">{timeLeft.hours}</div>
              <div className="text-xs font-bold">HRS</div>
            </div>
            <div className="bg-black/20 px-3 py-2 rounded-lg">
              <div className="text-2xl font-black text-white">{timeLeft.minutes}</div>
              <div className="text-xs font-bold">MIN</div>
            </div>
            <div className="bg-black/20 px-3 py-2 rounded-lg">
              <div className="text-2xl font-black text-white">{timeLeft.seconds}</div>
              <div className="text-xs font-bold">SEC</div>
            </div>
          </div>
          <p className="text-black font-bold text-sm mt-2">July 25, 2026 - Price goes to M500 after</p>
        </div>

        {/* FORT KNOX BADGE */}
        <div className="text-center mb-6">
          <div className="bg-yellow-500 inline-block px-3 py-1 rounded-full">
            <p className="text-xs font-black text-black tracking-wider">FORT KNOX MODE 🔒</p>
          </div>
        </div>

        {/* HEADER - M500 STRIKE-THROUGH */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-yellow-500 mb-3" style={{fontFamily: 'Montserrat, sans-serif'}}>
            The Fortune Brownies ©2026
          </h1>
          <p className="text-xl text-gray-300 mb-2">Own your town. One tray at a time.</p>
          <p className="text-gray-400">
            <span className="line-through text-red-400">M500</span> <span className="text-yellow-500 font-black">M250 Founding Member Price</span> - 0% fees. Direct to your bank.
          </p>
        </div>

        {/* WHAT YOU GET */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-2xl font-black text-yellow-500 mb-4">What You Get for M250:</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-3 mt-1">🍫</span>
              <span><strong>Secret recipe + tray costing calculator</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-3 mt-1">🎓</span>
              <span><strong>Fortune University:</strong> 7 video modules</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-3 mt-1">🔒</span>
              <span><strong>Private WhatsApp:</strong> Fort Knox Mode</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-3 mt-1">📱</span>
              <span><strong>Canva flyers + WhatsApp scripts</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-3 mt-1">📊</span>
              <span><strong>HQ Dashboard access</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-3 mt-1">🎙️</span>
              <span><strong>Personal voice note welcome</strong> from Makhauhelo</span>
            </li>
          </ul>
        </div>

        {/* WHY NOT STRIPE */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-2xl font-black text-yellow-500 mb-4">Why Not Paddle or Stripe?</h2>
          <p className="text-gray-300 mb-3">
            KFC doesn't use middlemen for secret recipe. Neither do we.
          </p>
          <p className="text-white font-bold mb-2">
            0% fees. 100% yours. Direct Ecocash/Mpesa/EFT to you.
          </p>
          <p className="text-gray-400 text-sm">
            Your money hits your account in 2 mins. No 30-day hold. No 20% cut.
          </p>
        </div>

        {/* LOCATION */}
        <div className="text-center text-gray-500 text-sm mb-8">
          📍 Khubetsoana, Maseru — Your town next 🇱🇸
        </div>

        {/* BUY BUTTON OR FORM */}
        {!showForm ? (
          <div className="sticky bottom-4">
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-5 px-6 rounded-xl text-xl transition shadow-2xl animate-pulse"
            >
              Lock M250 Price Before July 25 🍫
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">Only 100 founding member spots • Saves M250</p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl p-6 border-2 border-yellow-500">
            <h3 className="text-2xl font-black text-yellow-500 mb-6 text-center">
              Step 1: Reserve Your Spot
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
                placeholder="Full Name *"
              />
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
                placeholder="Email *"
              />
              
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
                placeholder="WhatsApp Number *"
              />
              
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
                placeholder="Location - e.g. Khubetsoana *"
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 px-6 rounded-lg text-lg transition disabled:bg-gray-700"
              >
                {status === 'loading' ? 'SAVING...' : 'LOCK MY M250 SPOT'}
              </button>
            </form>

            {message && (
              <div className={`mb-6 p-4 rounded-lg text-center font-bold ${
                status === 'success' ? 'bg-green-900 text-green-300 border border-green-500' : 'bg-red-900 text-red-300 border border-red-500'
              }`}>
                {message}
              </div>
            )}

            {/* PAYMENT DETAILS - ONLY SHOW AFTER CLICK */}
            <div className="border-t-2 border-yellow-500 pt-6">
              <h3 className="text-2xl font-black text-yellow-500 mb-4 text-center">
                Step 2: Pay M250 Before Deadline
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="bg-black p-4 rounded-lg border border-yellow-600">
                  <p className="font-black text-yellow-500 mb-1">1. ECOCASH</p>
                  <p className="text-2xl font-mono font-bold text-white">+266 6281 8000</p>
                  <p className="text-sm text-gray-400">Name: Makhauhelo Moima</p>
                </div>
                
                <div className="bg-black p-4 rounded-lg border border-yellow-600">
                  <p className="font-black text-yellow-500 mb-1">2. MPESA</p>
                  <p className="text-2xl font-mono font-bold text-white">+266 5703 1600</p>
                  <p class
