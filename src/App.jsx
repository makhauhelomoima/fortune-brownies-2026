import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

// ===== FORT KNOX CONFIG =====
const ACADEMY_PDF_URL = 'https://lsljnbljovnaclinwxva.supabase.co/storage/v1/object/public/fort-knox-files/Academy/Fort_Knox_Academy_Founding_Recipe.pdf.pdf';
const ACADEMY_PRICE = 250;
const VERCEL_URL = 'https://fortune-brownies-2026.vercel.app';
const ADMIN_EMAIL = 'makhauhelomolimo@gmail.com';
// ============================================

export default function App() {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('home')
  
  // Admin stats
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [academyRevenue, setAcademyRevenue] = useState(0)
  const [giftShopRevenue, setGiftShopRevenue] = useState(0)
  const [totalSignups, setTotalSignups] = useState(0)
  const [allUsers, setAllUsers] = useState([])
  const [allPayments, setAllPayments] = useState([])
  const [referrals, setReferrals] = useState([])
  
  const isAdmin = user?.email === ADMIN_EMAIL

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        checkPayment(session.user.id)
        if (session.user.email === ADMIN_EMAIL) fetchAdminStats()
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        checkPayment(session.user.id)
        if (session.user.email === ADMIN_EMAIL) fetchAdminStats()
      } else {
        setIsPaid(false)
        resetAdminStats()
      }
    })

    fetchProducts()
    return () => subscription.unsubscribe()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase.from('gift_shop').select('*').order('price_maluti', { ascending: true })
    setProducts(data || [])
  }

  async function checkPayment(userId) {
    const { data } = await supabase.from('users').select('paid').eq('id', userId).single()
    setIsPaid(data?.paid || false)
  }

  async function fetchAdminStats() {
    // All payments with user emails
    const { data: payments } = await supabase.from('payments').select('*, users(email)').order('created_at', { ascending: false })
    if (payments) {
      setAllPayments(payments)
      const academy = payments.filter(p => p.product_type === 'academy').reduce((sum, p) => sum + p.amount_maluti, 0)
      const giftshop = payments.filter(p => p.product_type === 'giftshop').reduce((sum, p) => sum + p.amount_maluti, 0)
      setAcademyRevenue(academy)
      setGiftShopRevenue(giftshop)
      setTotalRevenue(academy + giftshop)
    }
    
    // All users
    const { data: users } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    setAllUsers(users || [])
    setTotalSignups(users?.length || 0)
    
    // Referrals placeholder - add logic later
    setReferrals([
      { name: 'No referrals yet', rank: 'Start promoting', amount: 0, status: 'Waiting for first sale' }
    ])
  }

  function resetAdminStats() {
    setTotalRevenue(0); setAcademyRevenue(0); setGiftShopRevenue(0); setTotalSignups(0)
    setAllUsers([]); setAllPayments([]); setReferrals([])
  }

  async function signUp() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: VERCEL_URL } })
    if (error) alert(error.message)
    else alert('Check your email to confirm signup, Queen!')
    setLoading(false)
  }

  async function signIn() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    setLoading(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setIsPaid(false)
    setView('home')
  }

  async function handleAcademyPayment() {
    if (!user) return alert('Sign in first, Queen')
    setLoading(true)
    
    const { error } = await supabase.from('payments').insert([{ 
      user_id: user.id, 
      amount_maluti: ACADEMY_PRICE, 
      product_type: 'academy',
      status: 'completed'
    }])
    
    if (error) {
      alert('Payment error: ' + error.message)
      setLoading(false)
      return
    }

    await supabase.from('users').upsert({ id: user.id, email: user.email, paid: true })
    setIsPaid(true)
    if (isAdmin) fetchAdminStats()
    setLoading(false)
    
    window.open(ACADEMY_PDF_URL, '_blank')
    alert('Welcome to Fort Knox Academy! 🖤💛 Download starting...')
  }

  async function buyGiftShopItem(item) {
    if (!user) return alert('Sign in first, Queen')
    setLoading(true)
    
    const { error } = await supabase.from('payments').insert([{ 
      user_id: user.id, 
      amount_maluti: item.price_maluti, 
      product_type: 'giftshop', 
      product_id: item.id,
      status: 'completed'
    }])
    
    setLoading(false)
    if (error) return alert('Payment error: ' + error.message)
    
    if (isAdmin) fetchAdminStats()
    window.open(item.pdf_url, '_blank')
    alert(`Thank you! ${item.item_name} download starting... 🤍🧡`)
  }

  // ===== BIGGER BLACK & GOLD STYLES =====
  const styles = {
    app: {
      minHeight: '100vh',
      background: '#000',
      color: '#FFD700',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px',
      maxWidth: '700px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      borderBottom: '3px solid #FFD700',
      paddingBottom: '25px',
      marginBottom: '30px'
    },
    logo: {
      fontSize: '44px',
      fontWeight: '900',
      letterSpacing: '3px',
      margin: '0 0 15px 0',
      textShadow: '0 0 15px rgba(255,215,0,0.6)'
    },
    tagline: {
      fontSize: '20px',
      color: '#FFA500',
      margin: 0,
      fontWeight: '600'
    },
    card: {
      background: '#111',
      border: '2px solid #FFD700',
      borderRadius: '16px',
      padding: '30px',
      marginBottom: '25px',
      boxShadow: '0 0 25px rgba(255,215,0,0.3)'
    },
    input: {
      width: '100%',
      padding: '18px',
      marginBottom: '16px',
      background: '#000',
      border: '2px solid #FFD700',
      borderRadius: '10px',
      color: '#FFD700',
      fontSize: '20px',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '20px',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      border: 'none',
      borderRadius: '10px',
      color: '#000',
      fontSize: '22px',
      fontWeight: '800',
      cursor: 'pointer',
      marginBottom: '12px'
    },
    buttonSecondary: {
      background: '#000',
      border: '2px solid #FFD700',
      color: '#FFD700'
    },
    price: {
      fontSize: '52px',
      fontWeight: '900',
      color: '#FFD700',
      textAlign: 'center',
      margin: '15px 0',
      textShadow: '0 0 15px rgba(255,215,0,0.4)'
    },
    statNumber: {
      fontSize: '48px',
      fontWeight: '900',
      color: '#FFD700',
      textAlign: 'center',
      margin: '10px 0'
    },
    statLabel: {
      fontSize: '20px',
      color: '#FFA500',
      textAlign: 'center',
      fontWeight: '700'
    },
    nav: {
      display: 'flex',
      gap: '12px',
      marginBottom: '25px',
      flexWrap: 'wrap'
    },
    navBtn: {
      flex: 1,
      minWidth: '110px',
      padding: '16px',
      background: '#111',
      border: '2px solid #FFD700',
      borderRadius: '10px',
      color: '#FFD700',
      cursor: 'pointer',
      fontWeight: '700',
      fontSize: '18px'
    },
    navActive: {
      background: '#FFD700',
      color: '#000'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '18px'
    },
    th: {
      borderBottom: '3px solid #FFD700',
      padding: '16px 12px',
      textAlign: 'left',
      color: '#FFA500',
      fontSize: '18px',
      fontWeight: '800'
    },
    td: {
      borderBottom: '1px solid #333',
      padding: '16px 12px',
      fontSize: '17px'
    }
  }

  if (!user) {
    return (
      <div style={styles.app}>
        <div style={styles.header}>
          <h1 style={styles.logo}>FORT KNOX 🍫</h1>
          <p style={styles.tagline}>Turn Your Kitchen Into a Bank</p>
        </div>
        <div style={styles.card}>
          <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '32px'}}>Member Access</h2>
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button style={styles.button} onClick={signIn} disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
          <button style={{...styles.button, ...styles.buttonSecondary}} onClick={signUp} disabled={loading}>Create Account</button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.logo}>FORT KNOX 🍫</h1>
        <p style={styles.tagline}>{isAdmin ? 'CEO Dashboard' : `Welcome, ${user.email}`}</p>
        <button style={{...styles.button, ...styles.buttonSecondary, marginTop: '15px', padding: '14px', fontSize: '18px'}} onClick={signOut}>Sign Out</button>
      </div>

      <div style={styles.nav}>
        <button style={{...styles.navBtn, ...(view === 'home' ? styles.navActive : {})}} onClick={() => setView('home')}>Home</button>
        <button style={{...styles.navBtn, ...(view === 'academy' ? styles.navActive : {})}} onClick={() => setView('academy')}>Academy</button>
        <button style={{...styles.navBtn, ...(view === 'giftshop' ? styles.navActive : {})}} onClick={() => setView('giftshop')}>Gift Shop</button>
        {isAdmin && <button style={{...styles.navBtn, ...(view === 'admin' ? styles.navActive : {})}} onClick={() => setView('admin')}>Admin</button>}
      </div>

      {view === 'home' && (
        <div style={styles.card}>
          <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '36px'}}>Your Empire</h2>
          <p style={{textAlign: 'center', color: '#FFA500', fontSize: '22px', fontWeight: '600'}}>
            {isPaid ? '👑 Academy Member: Full Access Unlocked' : 'Start building your baking bank today'}
          </p>
          <button style={styles.button} onClick={() => setView('academy')}>
            {isPaid ? 'Access Academy' : `Join Academy - M${ACADEMY_PRICE}`}
          </button>
          <button style={{...styles.button, ...styles.buttonSecondary}} onClick={() => setView('giftshop')}>Browse Gift Shop</button>
        </div>
      )}

      {view === 'academy' && (
        <div style={styles.card}>
          <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '36px'}}>Fort Knox Academy</h2>
          <div style={styles.price}>M{ACADEMY_PRICE}</div>
          <p style={{textAlign: 'center', color: '#FFA500', marginBottom: '25px', lineHeight: '1.8', fontSize: '20px'}}>
            Lifetime Access<br/>
            Master Recipe + 6 Signature Flavors<br/>
            Cost M100 → Sell M180 → Profit M80 per tray<br/>
            <strong style={{fontSize: '24px'}}>Bake 5 trays/week = M1,600/month</strong>
          </p>
          {isPaid ? (
            <>
              <p style={{color: '#00FF00', textAlign: 'center', fontWeight: '800', fontSize: '22px'}}>✅ You have access</p>
              <button style={styles.button} onClick={() => window.open(ACADEMY_PDF_URL, '_blank')}>Download Founding Recipe PDF</button>
            </>
          ) : (
            <button style={styles.button} onClick={handleAcademyPayment} disabled={loading}>
              {loading ? 'Processing...' : `Join Academy - M${ACADEMY_PRICE}`}
            </button>
          )}
        </div>
      )}

      {view === 'giftshop' && (
        <div>
          <h2 style={{textAlign: 'center', color: '#FFD700', marginBottom: '25px', fontSize: '36px'}}>Gift Shop</h2>
          <div style={{display: 'grid', gap: '20px'}}>
            {products.length === 0 ? (
              <div style={styles.card}><p style={{textAlign: 'center', color: '#FFA500', fontSize: '20px'}}>New kits dropping soon... 🤍🧡</p></div>
            ) : (
              products.map(item => (
                <div key={item.id} style={styles.card}>
                  <h3 style={{margin: '0 0 15px 0', fontSize: '28px'}}>{item.item_name}</h3>
                  <div style={{...styles.price, fontSize: '40px'}}>M{item.price_maluti}</div>
                  {item.description && <p style={{color: '#FFA500', fontSize: '18px', lineHeight: '1.6'}}>{item.description}</p>}
                  <button style={styles.button} onClick={() => buyGiftShopItem(item)} disabled={loading}>
                    {loading ? 'Processing...' : `Buy Now - M${item.price_maluti}`}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {view === 'admin' && isAdmin && (
        <div>
          <div style={styles.card}>
            <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '36px'}}>💰 REVENUE EMPIRE 💰</h2>
            <div style={styles.statNumber}>M{totalRevenue}</div>
            <div style={styles.statLabel}>TOTAL REVENUE</div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '30px'}}>
              <div style={{background: '#000', padding: '20px', borderRadius: '12px', border: '2px solid #FFD700'}}>
                <div style={{...styles.statNumber, fontSize: '36px'}}>M{academyRevenue}</div>
                <div style={styles.statLabel}>Academy M250</div>
              </div>
              <div style={{background: '#000', padding: '20px', borderRadius: '12px', border: '2px solid #FFD700'}}>
                <div style={{...styles.statNumber, fontSize: '36px'}}>M{giftShopRevenue}</div>
                <div style={styles.statLabel}>Gift Shop</div>
              </div>
              <div style={{background: '#000', padding: '20px', borderRadius: '12px', border: '2px solid #FFD700'}}>
                <div style={{...styles.statNumber, fontSize: '36px'}}>{totalSignups}</div>
                <div style={styles.statLabel}>Head Count</div>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '32px'}}>👥 ALL MEMBERS TABLE 👥</h2>
            <div style={{overflowX: 'auto'}}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Paid Academy</th>
                    <th style={styles.th}>Joined Date</th>
                    <th style={styles.th}>User ID</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length === 0 ? (
                    <tr><td colSpan="4" style={{...styles.td, textAlign: 'center', color: '#FFA500'}}>No members yet</td></tr>
                  ) : (
                    allUsers.map(u => (
                      <tr key={u.id}>
                        <td style={styles.td}>{u.email}</td>
                        <td style={{...styles.td, color: u.paid ? '#00FF00' : '#FF0000', fontWeight: '800'}}>
                          {u.paid ? '✅ YES M250' : '❌ NO'}
                        </td>
                        <td style={styles.td}>{new Date(u.created_at).toLocaleDateString()}</td>
                        <td style={{...styles.td, fontSize: '14px', color: '#666'}}>{u.id.substring(0,8)}...</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '32px'}}>💸 ALL SALES LEDGER 💸</h2>
            <div style={{overflowX: 'auto'}}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Product</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allPayments.length === 0 ? (
                    <tr><td colSpan="5" style={{...styles.td, textAlign: 'center', color: '#FFA500'}}>No sales yet - Post launch tonight</td></tr>
                  ) : (
                    allPayments.map(p => (
                      <tr key={p.id}>
                        <td style={styles.td}>{new Date(p.created_at).toLocaleDateString()}</td>
                        <td style={styles.td}>{p.users?.email || 'Unknown'}</td>
                        <td style={styles.td}>{p.product_type === 'academy' ? 'Academy M250' : 'Gift Shop'}</td>
                        <td style={{...styles.td, color: '#00FF00', fontWeight: '800'}}>M{p.amount_maluti}</td>
                        <td style={{...styles.td, color: '#00FF00'}}>{p.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '32px'}}>🏆 REFERRALS & PAYOUTS 🏆</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Rank</th>
                  <th style={styles.th}>Earned</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((ref, i) => (
                  <tr key={i}>
                    <td style={styles.td}>{ref.name}</td>
                    <td style={styles.td}>{ref.rank}</td>
                    <td style={{...styles.td, color: '#FFD700', fontWeight: '800'}}>M{ref.amount}</td>
                    <td style={styles.td}>{ref.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}