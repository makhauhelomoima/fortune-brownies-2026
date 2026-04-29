import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lsljnbljovnaclinwxva.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGpuYmxqb3ZuYWNsaW53eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjU5NjAsImV4cCI6MjA5MjY0MTk2MH0.tzouGrC6paS91NFkXNSWI8ZWlMX2RPZlR2W3uspdrr4')

export default function GiftShop({ profile }) {
  const [locked, setLocked] = useState(!profile.purchased_giftshop && profile.role!== 'admin')

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-black text-[#ff6a00] w-full overflow-x-hidden">
      <div className="w-full px-3 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-xs font-bold">Fortune Brownies ©2026 <span className="bg-red-600 text-white px-1 ml-1 text-[10px] rounded">CEO</span></h1>
            <h2 className="text-xs font-bold">FORT KNOX ACADEMY</h2>
          </div>
          <button onClick={signOut} className="border border-[#ff6a00] px-2 py-1 rounded text-xs">Sign Out</button>
        </div>

        <hr className="border-[#ff6a00] mb-3" />

        {/* Nav */}
        <div className="grid grid-cols-4 gap-1 mb-3">
          <button onClick={() => window.location.href='/'} className="border border-[#ff6a00] py-2 rounded text-[11px]">Home</button>
          <button onClick={() => window.location.href='/academy'} className="border border-[#ff6a00] py-2 rounded text-[11px]">Academy</button>
          <button className="bg-[#ff6a00] text-black py-2 rounded text-[11px] font-bold">Gift-Shop</button>
          <button onClick={() => window.location.href=profile.role === 'admin'? '/admin' : '/member'} className="border border-[#ff6a00] py-2 rounded text-[11px]">
            {profile.role === 'admin'? 'Admin' : 'Dashboard'}
          </button>
        </div>

        {locked? (
          <div className="border-2 border-[#ff6a00] rounded-lg p-4 text-center shadow-[0_0_15px_#ff6a00]">
            <div className="text-4xl mb-2">🔒</div>
            <h3 className="text-lg font-bold mb-2">GIFT SHOP LOCKED</h3>
            <p className="text-xs mb-3">Pay M200.00 to unlock exclusive products</p>
            <button className="w-full bg-[#ff6a00] text-black py-3 rounded font-bold text-sm">Pay M200 - Unlock Now</button>
            <p className="text-[10px] mt-2 opacity-70">CEO has free access</p>
          </div>
        ) : (
          <div className="border-2 border-[#ff6a00] rounded-lg p-4 shadow-[0_0_15px_#ff6a00]">
            <h3 className="text-center text-lg font-bold mb-3">Red Velvet Money Cake Tutorial</h3>
            <div className="text-center text-3xl font-bold mb-2">M200</div>
            <div className="text-xs mb-3 space-y-1">
              <p>✅ Full video tutorial</p>
              <p>✅ Ingredient list + costing</p>
              <p>✅ Marketing templates</p>
              <p>✅ Lifetime access</p>
            </div>
            <button className="w-full bg-[#ff6a00] text-black py-3 rounded font-bold text-sm mb-2">Download PDF</button>
            <button className="w-full border border-[#ff6a00] py-3 rounded font-bold text-sm">Watch Tutorial</button>
          </div>
        )}

        <hr className="border-[#ff6a00] my-3" />
        <div className="text-center text-[10px]">
          <p className="font-bold">Fortune Brownies ©2026</p>
          <p className="font-bold">FORT KNOX ACADEMY</p>
        </div>

      </div>
    </div>
  )
}
