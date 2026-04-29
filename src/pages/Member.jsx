import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lsljnbljovnaclinwxva.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbGpuYmxqb3ZuYWNsaW53eHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjU5NjAsImV4cCI6MjA5MjY0MTk2MH0.tzouGrC6paS91NFkXNSWI8ZWlMX2RPZlR2W3uspdrr4'
)

export default function Member({ profile }) {
  const [myRevenue, setMyRevenue] = useState(0)
  const [myReferrals, setMyReferrals] = useState([])
  const [rank, setRank] = useState(0)
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data: referrals } = await supabase.from('profiles').select('*').eq('referred_by', profile.id)
    setMyReferrals(referrals || [])
    setMyRevenue((referrals?.length || 0) * 50)

    const { data: allProfiles } = await supabase.from('profiles').select('email, id')
    const ranks = await Promise.all(allProfiles.map(async (p) => {
      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('referred_by', p.id)
      return { email: p.email, count: count || 0 }
    }))
    ranks.sort((a, b) => b.count - a.count)
    setLeaderboard(ranks.slice(0, 5))
    setRank(ranks.findIndex(r => r.email === profile.email) + 1)
  }

  const copyLink = () => {
    const link = `${window.location.origin}?ref=${profile.referral_code}`
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
        <div className="flex justify-between items-start mb-3">
          <div>
            <h1 className="text-xs font-bold">Fortune Brownies ©2026 <span className="bg-red-600 text-white px-1 ml-1 text-xs rounded">CEO</span></h1>
            <h2 className="text-xs font-bold">FORT KNOX ACADEMY</h2>
          </div>
          <button onClick={signOut} className="border border-[#fbbf24] px-2 py-1 rounded text-xs">Sign Out</button>
        </div>
        <hr className="border-[#fbbf24] mb-3" />
        <div className="grid grid-cols-4 gap-1 mb-3">
          <button onClick={() => window.location.href='/'} className="border border-[#fbbf24] py-2 rounded text-xs">Home</button>
          <button onClick={() => window.location.href='/academy'} className="border border-[#fbbf24] py-2 rounded text-xs">Academy</button>
          <button onClick={() => window.location.href='/giftshop'} className="border border-[#fbbf24] py-2 rounded text-xs">Gift-Shop</button>
          <button className="bg-[#fbbf24] text-black py-2 rounded text-xs font-bold">Dashboard</button>
        </div>
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-3 shadow-[0_0_15px_#fbbf24]">
          <div className="text-center">
            <h3 className="text-sm font-bold">💰 MY REVENUE 💰</h3>
            <div className="text-3xl font-bold mt-1">M{myRevenue}</div>
            <div className="text-xs">From {myReferrals.length} Referrals</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="border border-[#fbbf24] rounded p-2 text-center">
            <div className="text-xl font-bold">#{rank}</div>
            <div className="text-xs">Your Rank</div>
          </div>
          <button onClick={copyLink} className="border border-[#fbbf24] rounded p-2 text-center bg-[#fbbf24] text-black">
            <div className="text-xs font-bold">Copy Link</div>
            <div className="text-xs">{profile.referral_code}</div>
          </button>
        </div>
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-3">
          <h3 className="text-center text-sm font-bold mb-2">🏆 LEADERBOARD 🏆</h3>
          {leaderboard.map((user, i) => (
            <div key={i} className="flex justify-between text-xs py-1 border-b border-[#fbbf24]/30">
              <span>#{i+1} {user.email.split('@')[0]}</span>
              <span>{user.count} refs</span>
            </div>
          ))}
        </div>
        <div className="border-2 border-[#fbbf24] rounded-lg p-3 mb-4">
          <h3 className="text-center text-sm font-bold mb-2">👥 MY REFERRALS 👥</h3>
          {myReferrals.length === 0? (
            <div className="text-center text-xs py-2">No referrals yet. Share your link!</div>
          ) : (
            myReferrals.map((ref) => (
              <div key={ref.id} className="text-xs py-1 border-b border-[#fbbf24]/30 break-all">{ref.email}</div>
            ))
          )}
        </div>
        <hr className="border-[#fbbf24] mb-3" />
        <div className="text-center text-xs">
          <p className="font-bold">Fortune Brownies ©2026</p>
          <p className="font-bold">FORT KNOX ACADEMY</p>
        </div>
      </div>
    </div>
  )
}