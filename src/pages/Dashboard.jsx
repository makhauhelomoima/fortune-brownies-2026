import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

export default function Dashboard() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  // Auto-calculate metrics from Supabase
  const totalRevenue = members
    .filter(m => m.paid === true)
    .length * 250

  const academyRevenue = members
    .filter(m => m.paid === true && m.member_tier === 'founding')
    .length * 250

  const headCount = members.filter(m => m.paid === true).length

  useEffect(() => {
    fetchMembers()
  }, [])

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
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading Fort Knox Vault...</div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER + LOGOUT */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-yellow-400 font-bold text-lg">
              Fortune Brownies ©2026 <span className="bg-red-600 text-xs px-1 ml-1">CEO</span>
            </h1>
            <h2 className="text-yellow-400 font-bold">FORT KNOX ACADEMY</h2>
          </div>
          <button 
            onClick={handleLogout}
            className="border border-yellow-500 text-yellow-400 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>

        {/* REVENUE EMPIRE */}
        <div className="border border-yellow-500 rounded-lg p-4 mb-4">
          <h2 className="text-yellow-400 text-center font-bold mb-3">
            💰 REVENUE EMPIRE 💰
          </h2>
          
          <div className="text-center mb-4">
            <div className="text-yellow-400 text-4xl font-bold">M{totalRevenue}</div>
            <div className="text-gray-400 text-sm">TOTAL REVENUE</div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-yellow-700 rounded p-3 text-center">
              <div className="text-yellow-400 text-lg font-bold">M{academyRevenue}</div>
              <div className="text-xs text-gray-400">Academy M250</div>
            </div>
            <div className="border border-yellow-700 rounded p-3 text-center">
              <div className="text-yellow-400 text-lg font-bold">M0</div>
              <div className="text-xs text-gray-400">Gift Shop 🎁</div>
            </div>
            <div className="border border-yellow-700 rounded p-3 text-center">
              <div className="text-yellow-400 text-lg font-bold">{headCount}</div>
              <div className="text-xs text-gray-400">Head Count</div>
            </div>
          </div>
        </div>

        {/* REFERRAL EMPIRE - THOMAS PROOF */}
        <div className="border border-yellow-500 rounded-lg p-4 mb-4">
          <h2 className="text-yellow-400 text-center font-bold mb-3">
            🔗 REFERRAL EMPIRE 🔗
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-yellow-300 border-b border-yellow-800">
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Tier</th>
                  <th className="text-left p-2">Paid</th>
                  <th className="text-left p-2">Code</th>
                  <th className="text-center p-2">Refs</th>
                  <th className="text-left p-2">M50 Earned</th>
                </tr>
              </thead>
              <tbody>
                {members.length > 0 ? members.map((member) => (
                  <tr key={member.id} className="border-b border-gray-800 hover:bg-gray-900">
                    <td className="p-2 text-xs break-all">{member.email}</td>
                    <td className="p-2 text-xs">
                      <span className={member.member_tier === 'founding'? 'text-yellow-400' : 'text-gray-400'}>
                        {member.member_tier || 'none'}
                      </span>
                    </td>
                    <td className="p-2 text-xs">
                      {member.paid? (
                        <span className="text-green-400">✅ M250</span>
                      ) : (
                        <span className="text-gray-500">⬜ Pending</span>
                      )}
                    </td>
                    <td className="p-2 text-xs font-mono text-yellow-400">
                      {member.referral_code || 'N/A'}
                    </td>
                    <td className="p-2 text-xs text-center font-bold">
                      {member.referral_count || 0}
                    </td>
                    <td className="p-2 text-xs text-yellow-400 font-bold">
                      M{member.referral_earnings || 0}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-6">
                      No members yet - Launch tonight
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ALL SALES LEDGER */}
        <div className="border border-yellow-500 rounded-lg p-4 mb-4">
          <h2 className="text-yellow-400 text-center font-bold mb-2">
            💸 ALL SALES LEDGER 💸
          </h2>
          <div className="text-center text-gray-500 py-4">
            {headCount === 0? 'No sales yet - Launch tonight' : `${headCount} verified sales recorded`}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-yellow-400 text-sm mt-8 mb-4">
          <div className="font-bold">Fortune Brownies ©2026</div>
          <div>FORT KNOX ACADEMY</div>
          <div className="text-xs text-gray-500 mt-1">CEO: Makhauhelo Moima</div>
        </div>

      </div>
    </div>
  )
}