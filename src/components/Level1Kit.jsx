import React, { useState, useEffect } from 'react';
import { supabase, getCurrentPricing, registerFranchisee } from '../lib/supabase';

const Level1Kit = () => {
  const [pricing, setPricing] = useState({ price: 250, usd: 13.50, isLaunch: true, daysLeft: 90 });
  const [settings, setSettings] = useState({});
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const priceData = await getCurrentPricing();
      setPricing(priceData);

      const { data } = await supabase.from('settings').select('key, value');
      const settingsObj = {};
      data?.forEach(s => settingsObj[s.key] = s.value);
      setSettings(settingsObj);
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerFranchisee({
        phone,
        fullName: fullName || 'Makhauhelo Moima',
        referredBy: referralCode || null
      });
      
      const msg = `I paid M${pricing.price} for Level 1 Kit. Name: ${fullName}. Phone: ${phone}. My new code: ${data.referral_code}`;
      const whatsappNum = settings.whatsapp_support?.replace('+', '') || '26657031600';
      window.location.href = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`;
      setSubmitted(true);
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl text-[#FFD700] font-black mb-4">🤍💛🖤♾️</h1>
          <p className="text-xl">Success! Check WhatsApp {settings.whatsapp_support}</p>
          <p className="text-sm mt-4">Kit sent. Welcome to Fort Knox.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-8" style={{fontFamily: 'Open Sans, sans-serif'}}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-black text-[#FFD700] mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>
          🍫 FORTUNE BROWNIES 2026 ♾️
        </h1>
        <h2 className="text-center text-2xl md:text-3xl font-black text-[#FFD700] mb-6" style={{fontFamily: 'Montserrat, sans-serif'}}>
          LEVEL 1: KITCHEN HUSTLER
        </h2>

        {pricing.isLaunch ? (
          <div className="bg-[#8B0000] border-4 border-[#FFD700] p-6 mb-8 text-center animate-pulse">
            <p className="text-[#FFD700] text-xl md:text-2xl font-black mb-2">🔥 90-DAY LAUNCH SPECIAL 🔥</p>
            <p className="text-4xl md:text-6xl font-black text-white mb-2">
              M{pricing.price} <span className="text-2xl text-[#90EE90]">(${pricing.usd} / R{pricing.price})</span>
            </p>
            <p className="text-[#FFD700] text-lg font-bold">Price increases to M500 in {pricing.daysLeft} days</p>
            <p className="text-white text-xl font-black mt-2">SAVE M250 - JOIN NOW</p>
          </div>
        ) : (
          <div className="bg-[#0a0a0a] border-4 border-[#FFD700] p-6 mb-8 text-center">
            <p className="text-4xl md:text-6xl font-black text-white">
              M{pricing.price} <span className="text-2xl text-[#90EE90]">(${pricing.usd} / R{pricing.price})</span>
            </p>
          </div>
        )}

        <div className="bg-[#0a0a0a] border-4 border-[#FFD700] p-6 mb-8">
          <h3 className="text-center text-[#FFD700] text-2xl font-black mb-4" style={{fontFamily: 'Montserrat, sans-serif'}}>
            FORT KNOX PAYMENT VAULT
          </h3>
          <div className="text-center space-y-2 text-lg">
            <p><strong>Account:</strong> {settings.owner_name || 'Makhauhelo Moima'}</p>
            <p><strong>Bank:</strong> {settings.bank_name || 'Lesotho Post Bank'}</p>
            <p><strong>Account No:</strong> {settings.bank_account || '1036202900018'}</p>
            <p><strong>Mpesa:</strong> {settings.mpesa_number || '+26657031600'}</p>
            <p><strong>Ecocash:</strong> {settings.ecocash_number || '+26662818000'}</p>
            <p><strong>Reference:</strong> Your phone number</p>
            <div className="h-0.5 bg-[#FFD700] my-4"></div>
            <p className="text-[#FFD700] text-2xl font-black">Level 1: M{pricing.price} <span className="text-[#90EE90] text-lg">(${pricing.usd})</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border-2 border-[#FFD700] p-6 mb-8">
          <h3 className="text-[#FFD700] text-xl font-black mb-4">STEP 1: PAY → STEP 2: REGISTER HERE</h3>
          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full p-4 mb-3 text-black text-lg rounded" required />
          <input type="tel" placeholder="Phone: 26657031600" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-4 mb-3 text-black text-lg rounded" required />
          <input type="text" placeholder="Referral Code (optional)" value={referralCode} onChange={e => setReferralCode(e.target.value)} className="w-full p-4 mb-4 text-black text-lg rounded" />
          <button type="submit" disabled={loading} className="w-full bg-[#FFD700] text-black py-4 text-xl md:text-2xl font-black rounded-lg hover:bg-[#FFC700] disabled:opacity-50" style={{fontFamily: 'Montserrat, sans-serif'}}>
            {loading ? 'REGISTERING...' : `I PAID M${pricing.price} - SEND MY KIT`}
          </button>
        </form>

        <p className="text-center text-sm text-[#FFD700]">Support: WhatsApp {settings.whatsapp_support || '+26657031600'} | 🤍💛🖤♾️</p>
      </div>
    </div>
  );
};

export default Level1Kit;
