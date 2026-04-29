import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lsljnbljovnaclinwxva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGpuYmxqb3ZuYWNsaW53eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjU5NjAsImV4cCI6MjA5MjY0MTk2MH0.tzouGrC6paS91NFkXNSWI8ZWlMX2RPZlR2W3uspdrr4'
)

export default function Admin({ profile }) {
  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [academyRevenue, setAcademyRevenue] = useState(0)
  const [giftshopRevenue, setGiftshopRevenue] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data: membersData } = await supabase
     .from('profiles')
     .select('id,email,is_member,created_at,referral_code,referred_by')
     .order('created_at', { ascending: false })

    const safeMembers = membersData || []
    setMembers(safeMembers)
    
    const memberCount = safeMembers.filter(m => m.is_member).length
    setAcademyRevenue(memberCount * 250)
    setTotalRevenue(memberCount * 250) // Add giftshop later
    setGiftshopRevenue(0)
    setLoading(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-[#fbbf24] flex items-center justify-center">
        Loading Fort Knox Vault...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-[#fbbf24] w-full overflow-x-hidden">
      <div className="w-full px-3 py-4">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-xs font-bold">
              Fortune Brownies ©2026 
              <span className="bg-red-600 text-white px-1 ml-1 text-xs rounded">CEO</span>
            </h1>
            <h2 className="text-xs font-bold">FORT KNOX ACADEMY</h2>
          </div>
          <button onClick={signOut} className="border border-[#fbbf24] px-2 py-1 rounded text-xs active:scale-95">
            Sign Out
          </button>
        </div>

        <hr className="border-[#fbbf24] mb-3" />

        {/* NAV TABS */}
        <div className="grid grid-cols-4 gap-1 mb-3">
          <button onClick={() => navigate('/')} className="border border-[#fbbf24] py-2 rounded text-xs active:scale-95">
            Home
          </button>
          <button onClick={() => navigate('/academy')} className="border border-[#fbbf24] py-2 rounded text-xs active:scale-95">
            Academy
          </button>
          <button onClick={() => navigate('/giftshop')} className="border border-[#fbbf24] py-2 rounded text-xs active:scale-95">
            Gift-Shop
          </button>
          <button className="bg-[#fbbf24] text-black py-2 rounded text-xs font-bold">
            Admin
          </button>
        </div>

        {/* REVENUE EMPIRE */}
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-3 shadow-[0_0_15px_#fbbf24]">
          <div className="text-center">
            <h3 className="text-sm font-bold">💰 REVENUE EMPIRE 💰</h3>
            <div className="text-3xl font-bold mt-1">M{totalRevenue}</div>
            <div className="text-xs">TOTAL REVENUE</div>
            
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="border border-[#fbbf24] rounded p-2">
                <p className="text-lg font-bold">M{academyRevenue}</p>
                <p className="text-xs opacity-70">Academy M250</p>
              </div>
              <div className="border border-[#fbbf24] rounded p-2">
                <p className="text-lg font-bold">M{giftshopRevenue}</p>
                <p className="text-xs opacity-70">Gift Shop 🛍️</p>
              </div>
              <div className="border border-[#fbbf24] rounded p-2">
                <p className="text-lg font-bold">{members.length}</p>
                <p className="text-xs opacity-70">Head Count</p>
              </div>
            </div>
          </div>
        </div>

        {/* ALL MEMBERS TABLE */}
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-3">
          <h3 className="text-center text-sm font-bold mb-2">👥 ALL MEMBERS TABLE 👥</h3>
          <div className="grid grid-cols-3 text-xs border-b border-[#fbbf24] pb-1 mb-1 gap-1">
            <div>Email</div><div>Academy</div><div>Joined</div>
          </div>
          {members.length === 0? (
            <div className="text-center text-xs py-2">No members yet</div>
          ) : (
            members.map((m) => (
              <div key={m.id} className="grid grid-cols-3 text-xs py-1 border-b border-[#fbbf24]/30 gap-1 items-center">
                <div className="break-all">{m.email}</div>
                <div>{m.is_member? '✅ M250' : '❌'}</div>
                <div>{new Date(m.created_at).toLocaleDateString()}</div>
              </div>
            ))
          )}
        </div>

        {/* ALL SALES LEDGER */}
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-4">
          <h3 className="text-center text-sm font-bold mb-2">💸 ALL SALES LEDGER 💸</h3>
          <div className="grid grid-cols-4 text-xs border-b border-[#fbbf24] pb-1 mb-1 gap-1">
            <div>Date</div><div>Customer</div><div>Product</div><div>Amount</div>
          </div>
          <div className="text-center text-xs py-2 opacity-70">
            No sales yet - Launch tonight
          </div>
        </div>

        <hr className="border-[#fbbf24] mb-3" />
        
        {/* FOOTER */}
        <div className="text-center text-xs">
          <p className="font-bold">Fortune Brownies ©2026</p>
          <p className="font-bold">FORT KNOX ACADEMY</p>
          <p className="mt-1">CEO: Makhauhelo Moima</p>
        </div>

      </div>
    </div>
  )
}