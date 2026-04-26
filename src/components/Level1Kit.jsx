import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Level1Kit() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    location: ''
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

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
      setMessage('Application received! Check payment steps below.');
      setFormData({ name: '', email: '', whatsapp: '', location: '' });
    } catch (error) {
      setStatus('error');
      setMessage('Error: ' + error.message + '. WhatsApp +26657031600 for help.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border-4 border-orange-400">
        
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-orange-600 mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>
            FORTUNE BROWNIES ©2026
          </h1>
          <div className="bg-orange-100 inline-block px-4 py-1 rounded-full">
            <p className="text-lg font-bold text-orange-800">LEVEL 1: KITCHEN HUSTLER</p>
          </div>
          <p className="text-gray-600 mt-3 text-lg">
            Turn M250 into M2,500/month. Lesotho's first digital franchise game.
          </p>
        </div>

        <div className="bg-amber-50 p-5 rounded-lg mb-6 border-l-4 border-amber-500">
          <h2 className="font-bold text-xl mb-3 text-amber-900">You Get Instantly:</h2>
          <ul className="space-y-2 text-gray-800">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Licensed Brand:</strong> Fortune Brownies name + logo to use</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Fudgy Brownie Recipe:</strong> Exact ingredients + method</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>50 Fortune Slips PDF:</strong> Inspiring messages for customers</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>WhatsApp Sales Scripts:</strong> Copy/paste messages that close</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Cost Calculator:</strong> Know profit on every tray</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Upgrade Path:</strong> Unlock Level 2 Cart Queen M650</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="Makhauhelo Moima"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="you@gmail.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp Number *</label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="+266 5703 1600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              placeholder="Maseru, Lesotho"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 px-6 rounded-lg text-lg transition disabled:bg-gray-400 shadow-lg"
          >
            {status === 'loading' ? 'SENDING...' : 'START MY HUSTLE - M250'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg text-center font-bold ${
            status === 'success' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-red-100 text-red-800 border-2 border-red-300'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300 mt-6">
          <h3 className="font-black text-xl mb-4 text-green-900 text-center">
            PAY M250 - CHOOSE YOUR METHOD:
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-green-200 shadow-sm">
              <p className="font-black text-green-700 text-lg mb-1">1. ECOCASH</p>
              <p className="text-3xl font-mono font-bold text-gray-900">+266 6281 8000</p>
              <p className="text-sm text-gray-600 mt-1">Name: Makhauhelo Moima</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-2 border-green-200 shadow-sm">
              <p className="font-black text-green-700 text-lg mb-1">2. MPESA</p>
              <p className="text-3xl font-mono font-bold text-gray-900">+266 5703 1600</p>
              <p className="text-sm text-gray-600 mt-1">Name: Makhauhelo Moima</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-2 border-green-200 shadow-sm">
              <p className="font-black text-green-700 text-lg mb-1">3. BANK TRANSFER</p>
              <p className="text-sm font-bold text-gray-700">Lesotho Post Bank</p>
              <p className="text-xl font-mono font-bold text-gray-900">1036202900018</p>
              <p className="text-sm text-gray-600 mt-1">Name: Makhauhelo Moima</p>
              <p className="text-xs text-gray-500">Ref: Your WhatsApp Number</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-4">
            <p className="text-sm font-bold text-yellow-900">
              AFTER PAYMENT: WhatsApp proof of payment + your email to +266 5703 1600
            </p>
            <p className="text-xs text-yellow-800 mt-1">
              Kit delivered via WhatsApp in 10 minutes. No PayPal. No waiting.
            </p>
          </div>
        </div>

        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © 2026 Fortune Brownies | Level 1 Kitchen Hustler | Maseru, LS
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Questions? WhatsApp: +266 5703 1600
          </p>
        </div>

      </div>
    </div>
  );
                 }
