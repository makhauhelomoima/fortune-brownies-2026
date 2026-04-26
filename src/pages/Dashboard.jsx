import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      navigate('/login')
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) console.log('Error:', error)
    else setProfile(data)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const copyReferralLink = () => {
    const link = `https://fortunebrownies-2026.vercel.app/?ref=${profile?.referral_code}`
    navigator.clipboard.writeText(link)
    alert('Referral link copied! 🧡🍫♾️')
  }

  if (loading) return (
    <div style={{
      backgroundColor: '#000',
      color: '#FF6A00',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.6rem'
    }}>
      Loading Fort Knox...
    </div>
  )

  return (
    <div style={{
      backgroundColor: '#000000',
      color: '#FF6A00',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h1 style={{ fontSize: '1.9rem' }}>Fort Knox Vault 🧡🍫♾️</h1>
          <button onClick={handleLogout} style={{
            backgroundColor: '#FF6A00',
            color: '#000000',
            padding: '12px 18px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            Lock
          </button>
        </div>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '2px solid #FF6A00',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            {profile?.full_name || profile?.email}
          </h2>
          <div style={{ 
            backgroundColor: '#FF6A00', 
            color: '#000', 
            padding: '8px 14px', 
            borderRadius: '20px',
            display: 'inline-block',
            fontWeight: 'bold',
            marginBottom: '1rem',
            fontSize: '1.1rem'
          }}>
            Rank: {profile?.rank}
          </div>
          <p style={{ fontSize: '1rem', opacity: '0.8' }}>
            Member since: {new Date(profile?.created_at).toLocaleDateString()}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #FF6A00',
            padding: '1.3rem',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 'bold' }}>
              {profile?.total_referrals}
            </div>
            <div style={{ fontSize: '1.1rem' }}>Referrals</div>
          </div>
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #FF6A00',
            padding: '1.3rem',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 'bold' }}>
              {profile?.points_balance}
            </div>
            <div style={{ fontSize: '1.1rem' }}>Points</div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '2px solid #FF6A00',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Wallet Balance</div>
          <div style={{ fontSize: '2.7rem', fontWeight: 'bold' }}>
            M{profile?.wallet_balance?.toFixed(2)}
          </div>
        </div>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '2px solid #FF6A00',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Your Referral Link</h3>
          <div style={{
            backgroundColor: '#000',
            border: '1px solid #FF6A00',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '1rem',
            marginBottom: '1rem',
            wordBreak: 'break-all'
          }}>
            fortunebrownies-2026.vercel.app/?ref={profile?.referral_code}
          </div>
          <button onClick={copyReferralLink} style={{
            width: '100%',
            backgroundColor: '#FF6A00',
            color: '#000000',
            padding: '16px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            Copy Referral Link
          </button>
        </div>
      </div>
    </div>
  )
    }
