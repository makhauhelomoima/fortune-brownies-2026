import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lsljnbljovnaclinwxva.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGpuYmxqb3ZuYWNsaW53eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjU5NjAsImV4cCI6MjA5MjY0MTk2MH0.tzouGrC6paS91NFkXNSWI8ZWlMX2RPZlR2W3uspdrr4')

export default function Admin({ profile }) {
  const [members, setMembers] = useState([])
  const [sales, setSales] = useState([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [payouts, setPayouts] = useState([])

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data: membersData } = await supabase
    .from('profiles')
    .select(`id,email,is_member,created_at,referral_code,referred_by`)
    .order('created_at', { ascending: false })
    
    setMembers(membersData || [])

    const { data: salesData } = await supabase.from('sales').select('*')
    setSales(salesData || [])
    setTotalRevenue(salesData?.reduce((sum, s) => sum + s.amount, 0) || 0)

    // Calculate payouts: M50 per referral
    const payoutMap = {}
    membersData?.forEach(m => {
      const refCount = membersData.filter(x => x.referred_by === m.id).length
      if (refCount > 0) payoutMap[m.email] = refCount * 50
    })
    setPayouts(Object.entries(payoutMap))
  }

  const copyReferralLink = (code) => {
    const link = `${window.location.origin}?ref=${code}`
    navigator.clipboard.writeText(link)
    alert(`Link copied:\n${link}`)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-black text-[#fbbf24] w-full overflow-x-hidden">
      <div className="w-full px-3 py-4">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-xs font-bold">Fortune Brownies ©2026 <span className="bg-red-600 text-white px-1 ml-1 text-[10px] rounded">CEO</span></h1>
            <h2 className="text-xs font-bold">FORT KNOX ACADEMY</h2>
          </div>
          <button onClick={signOut} className="border border-[#fbbf24] px-2 py-1 rounded text-xs">Sign Out</button>
        </div>

        <hr className="border-[#fbbf24] mb-3" />

        {/* Nav */}
        <div className="grid grid-cols-4 gap-1 mb-3">
          <button onClick={() => window.location.href='/'} className="border border-[#fbbf24] py-2 rounded text-[11px]">Home</button>
          <button onClick={() => window.location.href='/academy'} className="border border-[#fbbf24] py-2 rounded text-[11px]">Academy</button>
          <button onClick={() => window.location.href='/giftshop'} className="border border-[#fbbf24] py-2 rounded text-[11px]">Gift-Shop</button>
          <button className="bg-[#fbbf24] text-black py-2 rounded text-[11px] font-bold">Admin</button>
        </div>

        {/* Revenue Empire */}
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-3 shadow-[0_0_15px_#fbbf24]">
          <div className="text-center">
            <h3 className="text-sm font-bold">💰 REVENUE EMPIRE 💰</h3>
            <div className="text-3xl font-bold mt-1">M{totalRevenue}</div>
            <div className="text-[10px]">TOTAL REVENUE | {members.length} Members</div>
          </div>
        </div>

        {/* Payment Outs */}
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-3">
          <h3 className="text-center text-sm font-bold mb-2">💸 PAYMENT-OUTS DUE 💸</h3>
          {payouts.length === 0? (
            <div className="text-center text-[10px] py-2">No payouts pending</div>
          ) : (
            payouts.map(([email, amount]) => (
              <div key={email} className="flex justify-between text-xs py-1 border-b border-[#fbbf24]/30">
                <span className="break-all">{email}</span>
                <span className="font-bold">M{amount}</span>
              </div>
            ))
          )}
        </div>

        {/* All Members Table */}
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-4">
          <h3 className="text-center text-sm font-bold mb-2">👥 ALL MEMBERS 👥</h3>
          <div className="grid grid-cols-5 text-[10px] border-b border-[#fbbf24] pb-1 mb-1 gap-1">
            <div>Email</div><div>M250</div><div>Joined</div><div>Ref Code</div><div>Link</div>
          </div>
          {members.map((m) => (
            <div key={m.id} className="grid grid-cols-5 text-[10px] py-1 border-b border-[#fbbf24]/30 gap-1 items-center">
              <div className="break-all">{m.email.split('@')[0]}</div>
              <div>{m.is_member? '✅' : '❌'}</div>
              <div>{new Date(m.created_at).toLocaleDateString()}</div>
              <div className="font-bold">{m.referral_code || 'N/A'}</div>
              <button onClick={() => copyReferralLink(m.referral_code)} disabled={!m.referral_code} className="bg-[#fbbf24] text-black px-1 py-0.5 rounded text-[9px] disabled:opacity-30">Copy</button>
            </div>
          ))}
        </div>

        <hr className="border-[#fbbf24] mb-3" />
        <div className="text-center text-[10px]">
          <p className="font-bold">Fortune Brownies ©2026</p>
          <p className="font-bold">FORT KNOX ACADEMY</p>
        </div>

      </div>
    </div>
  )
}
