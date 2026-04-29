import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

export default function Dashboard() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [copyMsg, setCopyMsg] = useState('')

  // AUTO-CALC METRICS FROM SUPABASE
  const paidMembers = members.filter(m => m.paid === true)
  const totalRevenue = paidMembers.length * 250
  
  const academyRevenue = members
   .filter(m => m.paid === true && m.member_tier === 'founding')
   .length * 250

  const headCount = paidMembers.length

  useEffect(() => {
    checkUser()
    fetchMembers()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/login'
    } else {
      setUser(user)
    }
  }

  async function fetchMembers() {
    setLoading(true)
    try {
      const { data, error } = await supabase
       .from('founding_members')
       .select('*')
       .order('created_at', { ascending: false })

      if (error) {
        console.error('Fort Knox Error:', error)
      } else {
        setMembers(data || [])
      }
    } catch (err) {
      console.error('Connection Error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  // COPY REFERRAL LINK FUNCTION - LAZY THOMAS PROOF
  function copyReferralLink(code) {
    const link = `https://fortune-brownies-2026.vercel.app/signup?ref=${code}`
    navigator.clipboard.writeText(link)
    setCopyMsg(`Copied: ${code}`)
    setTimeout(() => setCopyMsg(''), 3000)
  }

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-yellow-400 text-xl animate-pulse">Loading Fort Knox Vault...</div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-yellow-400 font-bold text-lg">
              Fortune Brownies ©2026 <span className="bg-red-600 text-xs px-1 ml-1">CEO</span>
            </h1>
            <h2 className="text-yellow-400 font-bold">FORT KNOX ACADEMY</h2>
            <p className="text-gray-400 text-xs mt-1">
              Logged in: {user?.email}
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="border border-yellow-500 text-yellow-400 px-4 py-2 rounded text-sm hover:bg-yellow-500 hover:text-black"
          >
            Logout
          </button>
        </div>

        {copyMsg && (
          <div className="bg-green-900 border border-green-500 text-green-400 text-center p-2 rounded mb-4 text-sm">
            ✅ {copyMsg}
          </div>
        )}

        {/* REVENUE EMPIRE */}
        <div className="border border-yellow-500 rounded-lg p-4 mb-4">
          <h2 className="text-yellow-400 text-center font-bold mb-3 text-lg">
            💰 REVENUE EMPIRE 💰
          </h2>
          
          <div className="text-center mb-4">
            <div className="text-yellow-400 text-5xl font-bold">M{totalRevenue}</div>
            <div className="text-gray-400 text-sm">TOTAL REVENUE</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border border-yellow-700 rounded p-3 text-center bg-gray-900">
              <div className="text-yellow-400 text-2xl font-bold">M{academyRevenue}</div>
              <div className="text-xs text-gray-400">Academy M250</div>
            </div>
            <div className="border border-yellow-700 rounded p-3 text-center bg-gray-900">
              <div className="text-yellow-400 text-2xl font-bold">M0</div>
              <div className="text-xs text-gray-400">Gift Shop 🎁</div>
            </div>
            <div className="border border-yellow-700 rounded p-3 text-center bg-gray-900">
              <div className="text-yellow-400 text-2xl font-bold">{headCount}</div>
              <div className="text-xs text-gray-400">Paid Head Count</div>
            </div>
          </div>
        </div>

        {/* REFERRAL EMPIRE - THOMAS PROOF TABLE */}
        <div className="border border-yellow-500 rounded-lg p-4 mb-4">
          <h2 className="text-yellow-400 text-center font-bold mb-3 text-lg">
            🔗 REFERRAL EMPIRE 🔗
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-yellow-300 border-b border-yellow-800">
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Tier</th>
                  <th className="text-left p-2">Paid</th>
                  <th className="text-left p-2">Referral Link</th>
                  <th className="text-center p-2">Refs</th>
                  <th className="text-left p-2">M50 Earned</th>
                </tr>
              </thead>
              <tbody>
                {members.length > 0? members.map((member) => (
                  <tr key={member.id} className="border-b border-gray-800 hover:bg-gray-900">
                    <td className="p-2 text-xs break-all max-w-[150px]">{member.email}</td>
                    <td className="p-2 text-xs">
                      <span className={member.member_tier === 'founding'? 'text-yellow-400' : 'text-gray-400'}>
                        {member.member_tier || 'none'}
                      </span>
                    </td>
                    <td className="p-2 text-xs">
                      {member.paid? (
                        <span className="text-green-400 font-bold">✅ M250</span>
                      ) : (
                        <span className="text-gray-500">⬜ Pending</span>
                      )}
                    </td>
                    <td className="p-2 text-xs">
                      {member.referral_code? (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-yellow-400 text-xs">
                            {member.referral_code}
                          </span>
                          <button
                            onClick={() => copyReferralLink(member.referral_code)}
                            className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold hover:bg-yellow-400"
                          >
                            Copy Link
                          </button>
                        </div>
                      ) : 'N/A'}
                    </td>
                    <td className="p-2 text-xs text-center font-bold text-yellow-400">
                      {member.referral_count || 0}
                    </td>
                    <td className="p-2 text-xs text-yellow-400 font-bold">
                      M{member.referral_earnings || 0}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-8">
                      No members yet - Share your referral link to start
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ALL SALES LEDGER */}
        <div className="border border-yellow-500 rounded-lg p-4 mb-4">
          <h2 className="text-yellow-400 text-center font-bold mb-2 text-lg">
            💸 ALL SALES LEDGER 💸
          </h2>
          <div className="text-center text-gray-500 py-4">
            {headCount === 0? 
              'No sales yet - Post your referral link' : 
              `${headCount} verified M250 sales recorded | M${totalRevenue} total`
            }
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-yellow-400 text-sm mt-8 mb-4">
          <div className="font-bold">Fortune Brownies ©2026</div>
          <div>FORT KNOX ACADEMY</div>
          <div className="text-xs text-gray-500 mt-1">CEO: Makhauhelo Moima</div>
          <div className="text-xs text-gray-600 mt-2">We don't sell brownies. We sell freedom.</div>
        </div>

      </div>
    </div>
  )
}