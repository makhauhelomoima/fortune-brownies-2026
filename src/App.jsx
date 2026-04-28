import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

// ===== FORT KNOX CONFIG 🖤💛 =====
const ACADEMY_PDF_URL = 'https://lsljnbljovnaclinwxva.supabase.co/storage/v1/object/public/fort-knox-files/Academy/Fort_Knox_Academy_Founding_Recipe.pdf.pdf';
const ACADEMY_PRICE = M250 / $14.40 until July 25th, then normal price M500 / $28.80;
const VERCEL_URL = 'https://fortune-brownies-2026.vercel.app';
const ADMIN_EMAIL = 'makhauhelomoima@gmail.com';
const WHATSAPP_NUMBER = '+26657031600';
============================================

export default function App() {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPaidAcademy, setIsPaidAcademy] = useState(false)
  const [purchasedItems, setPurchasedItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('landing') // NEW: Start on landing
  const [showAuth, setShowAuth] = useState(false)
  
  // Admin stats
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [academyRevenue, setAcademyRevenue] = useState(0)
  const [giftShopRevenue, setGiftShopRevenue] = useState(0)
  const [totalSignups, setTotalSignups] = useState(0)
  const [allUsers, setAllUsers] = useState([])
  const [allPayments, setAllPayments] = useState([])
  
  const isAdmin = user?.email === ADMIN_EMAIL

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setView('home')
        checkAcademyPayment(session.user.id)
        checkGiftShopPurchases(session.user.id)
        if (session.user.email === ADMIN_EMAIL) fetchAdminStats()
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setView('home')
        checkAcademyPayment(session.user.id)
        checkGiftShopPurchases(session.user.id)
        if (session.user.email === ADMIN_EMAIL) fetchAdminStats()
      } else {
        setView('landing')
        setIsPaidAcademy(false)
        setPurchasedItems([])
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

  async function checkAcademyPayment(userId) {
    const { data } = await supabase.from('users').select('paid').eq('id', userId).single()
    setIsPaidAcademy(data?.paid || false)
  }

  async function checkGiftShopPurchases(userId) {
    const { data } = await supabase
      .from('payments')
      .select('product_id')
      .eq('user_id', userId)
      .eq('product_type', 'giftshop')
      .eq('status', 'completed')
    setPurchasedItems(data?.map(p => p.product_id) || [])
  }

  async function fetchAdminStats() {
    const { data: payments } = await supabase.from('payments').select('*, users(email)').order('created_at', { ascending: false })
    if (payments) {
      setAllPayments(payments)
      const academy = payments.filter(p => p.product_type === 'academy').reduce((sum, p) => sum + p.amount_maluti, 0)
      const giftshop = payments.filter(p => p.product_type === 'giftshop').reduce((sum, p) => sum + p.amount_maluti, 0)
      setAcademyRevenue(academy)
      setGiftShopRevenue(giftshop)
      setTotalRevenue(academy + giftshop)
    }
    
    const { data: users } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    setAllUsers(users || [])
    setTotalSignups(users?.length || 0)
  }

  function resetAdminStats() {
    setTotalRevenue(0); setAcademyRevenue(0); setGiftShopRevenue(0); setTotalSignups(0)
    setAllUsers([]); setAllPayments([])
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
    setIsPaidAcademy(false)
    setPurchasedItems([])
    setView('landing')
    setShowAuth(false)
  }

  async function handleAcademyPayment() {
    if (!user) {
      setShowAuth(true)
      return alert('Create account first, Queen')
    }
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
    setIsPaidAcademy(true)
    if (isAdmin) fetchAdminStats()
    setLoading(false)
    
    window.open(ACADEMY_PDF_URL, '_blank')
    alert('Welcome to Fort Knox Academy! 🖤💛 Founding Recipe downloading.')
  }

  async function buyGiftShopItem(item) {
    if (!user) {
      setShowAuth(true)
      return alert('Create account first, Queen')
    }
    
    if (purchasedItems.includes(item.id)) {
      window.open(item.pdf_url, '_blank')
      alert(`Re-downloading ${item.item_name}. You own this 🤍🧡`)
      return
    }
    
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
    
    setPurchasedItems([...purchasedItems, item.id])
    if (isAdmin) fetchAdminStats()
    
    window.open(item.pdf_url, '_blank')
    alert(`Thank you! ${item.item_name} purchased for M${item.price_maluti}. Fortune Brownies ©2026 🔐`)
  }

  // ===== BLACK & GOLD STYLES 🖤💛 =====
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
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '24px',
      fontWeight: '900',
      letterSpacing: '1px',
      margin: 0,
      textShadow: '0 0 15px rgba(255,215,0,0.6)'
    },
    tagline: {
      fontSize: '20px',
      color: '#FFA500',
      margin: '10px 0 0 0',
      fontWeight: '600'
    },
    heroTitle: {
      fontSize: '44px',
      fontWeight: '900',
      textAlign: 'center',
      margin: '40px 0 20px 0',
      lineHeight: '1.2'
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#FFA500',
      textAlign: 'center',
      margin: '0 0 40px 0',
      lineHeight: '1.6'
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
    loginBtn: {
      padding: '12px 24px',
      background: '#FFD700',
      border: 'none',
      borderRadius: '8px',
      color: '#000',
      fontSize: '18px',
      fontWeight: '800',
      cursor: 'pointer'
    },
    price: {
      fontSize: '52px',
      fontWeight: '900',
      color: '#FFD700',
      textAlign: 'center',
      margin: '15px 0',
      textShadow: '0 0 15px rgba(255,215,0,0.4)'
    },
    priceSub: {
      fontSize: '18px',
      color: '#FFA500',
      textAlign: 'center',
      margin: '0 0 20px 0'
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
    },
    lockBadge: {
      display: 'inline-block',
      background: '#FF0000',
      color: '#FFF',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '800',
      marginLeft: '10px'
    },
    exclusiveBadge: {
      display: 'inline-block',
      background: '#FFD700',
      color: '#000',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '900',
      marginBottom: '15px'
    },
    paymentBtn: {
      width: '100%',
      padding: '18px',
      background: '#FFD700',
      border: 'none',
      borderRadius: '10px',
      color: '#000',
      fontSize: '20px',
      fontWeight: '800',
      cursor: 'pointer',
      marginBottom: '12px'
    },
    footer: {
      textAlign: 'center',
      color: '#666',
      fontSize: '14px',
      marginTop: '40px',
      paddingTop: '20px',
      borderTop: '1px solid #333'
    }
  }

  // ===== LANDING PAGE - MATCHES YOUR SCREENSHOT =====
  if (!user && view === 'landing') {
    return (
      <div style={styles.app}>
        <div style={styles.header}>
          <h1 style={styles.logo}>Fortune Brownies ©2026</h1>
          <button style={styles.loginBtn} onClick={() => setShowAuth(true)}>Login</button>
        </div>

        {!showAuth ? (
          <>
            <h1 style={styles.heroTitle}>We don't sell<br/>brownies.<br/>We sell freedom.</h1>
            <p style={styles.heroSubtitle}>
              Lesotho's first automated micro-franchise<br/>for women.<br/>One tray at a time.
            </p>

            <div style={styles.card}>
              <h2 style={{...styles.price, fontSize: '36px', margin: '0 0 10px 0'}}>M250 Founding Member</h2>
              <p style={styles.priceSub}>
                ≈ $14.40 USD<br/>
                0% monthly fees. Forever.<br/><br/>
                M50 per referral. Auto-paid to Ecocash/Mpesa.
              </p>
              
              <p style={{...styles.priceSub, fontWeight: '800', fontSize: '20px', color: '#FFD700'}}>
                Get Access - Choose Payment:
              </p>

              <button style={styles.paymentBtn} onClick={() => {setShowAuth(true); alert('Create account, then send M250 via Ecocash to MAKHAUHELO MOIMA. Use email as reference.')}}>
                1. Ecocash - *199#
              </button>
              <button style={styles.paymentBtn} onClick={() => {setShowAuth(true); alert('Create account, then send M250 via Mpesa to MAKHAUHELO MOIMA. Use email as reference.')}}>
                2. Mpesa - *200#
              </button>
              <button style={styles.paymentBtn} onClick={() => {setShowAuth(true); alert('Create account, then send M250 via Lesotho Post Bank to MAKHAUHELO MOIMA. Use email as reference.')}}>
                3. Post Bank - *120*223# / EFT
              </button>

              <p style={{...styles.priceSub, fontSize: '14px', marginTop: '20px'}}>
                Price goes back to M500.00 ≈ $28.80 USD on July 25th
              </p>
            </div>

            <div style={styles.footer}>
              Fortune Brownies ©2026 | Fort Knox Academy<br/>
              CEO: Makhauhelo Moima
            </div>
          </>
        ) : (
          <div style={styles.card}>
            <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '32px'}}>Fortune Brownies ©2026<br/>Fort Knox Academy</h2>
            <p style={{textAlign: 'center', color: '#FFA500', marginBottom: '25px'}}>Member Access</p>
            <input style={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input style={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={styles.button} onClick={signIn} disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
            <button style={{...styles.button, ...styles.buttonSecondary}} onClick={signUp} disabled={loading}>Create Account</button>
            <button style={{...styles.button, ...styles.buttonSecondary, marginTop: '10px'}} onClick={() => setShowAuth(false)}>← Back to Home</button>
          </div>
        )}
      </div>
    )
  }

  // ===== LOGGED IN APP =====
  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.logo}>Fortune Brownies ©2026</h1>
          <p style={{...styles.tagline, fontSize: '16px', margin: 0}}>Fort Knox Academy</p>
        </div>
        <button style={{...styles.loginBtn, background: '#000', border: '2px solid #FFD700', color: '#FFD700'}} onClick={signOut}>Sign Out</button>
      </div>

      <div style={styles.nav}>
        <button style={{...styles.navBtn, ...(view === 'home' ? styles.navActive : {})}} onClick={() => setView('home')}>Home</button>
        <button style={{...styles.navBtn, ...(view === 'academy' ? styles.navActive : {})}} onClick={() => setView('academy')}>Academy</button>
        <button style={{...styles.navBtn, ...(view === 'giftshop' ? styles.navActive : {})}} onClick={() => setView('giftshop')}>
          Visit Gift-Shop <span style={styles.lockBadge}>🔐</span>
        </button>
        {isAdmin && <button style={{...styles.navBtn, ...(view === 'admin' ? styles.navActive : {})}} onClick={() => setView('admin')}>Admin</button>}
      </div>

      {view === 'home' && (
        <div style={styles.card}>
          <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '36px'}}>Your Empire</h2>
          <p style={{textAlign: 'center', color: '#FFA500', fontSize: '22px', fontWeight: '600'}}>
            {isPaidAcademy ? '👑 Academy Member: Lifetime Access' : 'Start building your baking bank today'}
          </p>
          <button style={styles.button} onClick={() => setView('academy')}>
            {isPaidAcademy ? 'Access Academy' : `Join Academy - M${ACADEMY_PRICE}`}
          </button>
          <button style={{...styles.button, ...styles.buttonSecondary}} onClick={() => setView('giftshop')}>
            Visit Gift-Shop 🔐 Fortune Brownies ©2026
          </button>
        </div>
      )}

      {view === 'academy' && (
        <div style={styles.card}>
          <h2 style={{textAlign: 'center', marginTop: 0, fontSize: '36px'}}>Fort Knox Academy</h2>
          <div style={styles.price}>M{ACADEMY_PRICE}</div>
          <p style={{textAlign: 'center', color: '#FFA500', marginBottom: '25px', lineHeight: '1.8', fontSize: '20px'}}>
            Pay Once → Lifetime Access<br/>
            Master Recipe + All Future Guides FREE<br/>
            Learn cost control for any economy
          </p>
          {isPaidAcademy ? (
            <>
              <p style={{color: '#00FF00', textAlign: 'center', fontWeight: '800', fontSize: '22px'}}>✅ Lifetime Member Access</p>
              <button style={styles.button} onClick={() => window.open(ACADEMY_PDF_URL, '_blank')}>
                Download Founding Recipe PDF
              </button>
              <p style={{textAlign: 'center', color: '#FFA500', fontSize: '16px', marginTop: '15px'}}>
                Future Academy guides auto-unlock here. No extra payment.
              </p>
            </>
          ) : (
            <>
              <button style={styles.button} onClick={handleAcademyPayment} disabled={loading}>
                {loading ? 'Processing...' : `Join Academy - M${ACADEMY_PRICE}`}
              </button>
              <p style={{textAlign: 'center', color: '#FFA500', fontSize: '16px', marginTop: '15px'}}>
                Pay via M-Pesa, EcoCash, or Lesotho Post Bank to:<br/>
                <strong>MAKHAUHELO MOIMA</strong><br/>
                Use your email as reference
              </p>
            </>
          )}
        </div>
      )}

      {view === 'giftshop' && (
        <div>
          <h2 style={{textAlign: 'center', color: '#FFD700', marginBottom: '10px', fontSize: '36px'}}>
            Gift Shop 🔐
          </h2>
          <p style={{textAlign: 'center', color: '#FF0000', fontSize: '18px', fontWeight: '700', marginBottom: '25px'}}>
            Fortune Brownies ©2026 - No Handouts. Pay Per Recipe.
          </p>
          <div style={{display: 'grid', gap: '20px'}}>
            {products.length === 0 ? (
              <div style={styles.card}><p style={{textAlign: 'center', color: '#FFA500', fontSize: '20px'}}>Loading inventory... 🤍🧡</p></div>
            ) : (
              products.map(item => {
                const alreadyPurchased = purchasedItems.includes(item.id)
                return (
                  <div key={item.id} style={styles.card}>
                    <div style={styles.exclusiveBadge}>EXCLUSIVE OFFER</div>
                    <h3 style={{margin: '0 0 15px 0', fontSize: '28px'}}>
                      {item.item_name}
                      <span style={styles.lockBadge}>🔐 M{item.price_maluti}</span>
                    </h3>
                    <div style={{...styles.price, fontSize: '40px'}}>M{item.price_maluti}</div>
                    {item.description && <p style={{color: '#FFA500', fontSize: '18px', lineHeight: '1.6'}}>{item.description}</p>}
                    {alreadyPurchased ? (
                      <>
                        <p style={{color: '#00FF00', textAlign: 'center', fontWeight: '800', fontSize: '18px'}}>✅ Purchased</p>
                        <button style={styles.button} onClick={() => buyGiftShopItem(item)}>
                          Re-Download PDF
                        </button>
                      </>
                    ) : (
                      <>
                        <button style={styles.button} onClick={() => buyGiftShopItem(item)} disabled={loading}>
                          {loading ? 'Processing...' : `Buy Now - M${item.price_maluti}`}
                        </button>
                        <p style={{textAlign: 'center', color: '#FFA500', fontSize: '14px', marginTop: '10px'}}>
                          Pay via M-Pesa, EcoCash, or Post Bank to:<br/>
                          <strong>MAKHAUHELO MOIMA</strong>
                        </p>
                      </>
                    )}
                  </div>
                )
              })
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
                <div style={styles.statLabel}>Gift Shop 🔐</div>
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
                    <th style={styles.th}>Academy Paid</th>
                    <th style={styles.th}>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length === 0 ? (
                    <tr><td colSpan="3" style={{...styles.td, textAlign: 'center', color: '#FFA500'}}>No members yet</td></tr>
                  ) : (
                    allUsers.map(u => (
                      <tr key={u.id}>
                        <td style={styles.td}>{u.email}</td>
                        <td style={{...styles.td, color: u.paid ? '#00FF00' : '#FF0000', fontWeight: '800'}}>
                          {u.paid ? '✅ M250' : '❌ NO'}
                        </td>
                        <td style={styles.td}>{new Date(u.created_at).toLocaleDateString()}</td>
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
                  </tr>
                </thead>
                <tbody>
                  {allPayments.length === 0 ? (
                    <tr><td colSpan="4" style={{...styles.td, textAlign: 'center', color: '#FFA500'}}>No sales yet - Launch tonight</td></tr>
                  ) : (
                    allPayments.map(p => (
                      <tr key={p.id}>
                        <td style={styles.td}>{new Date(p.created_at).toLocaleDateString()}</td>
                        <td style={styles.td}>{p.users?.email || 'Unknown'}</td>
                        <td style={styles.td}>
                          {p.product_type === 'academy' ? 'Academy M250' : `Red Velvet M${p.amount_maluti}`}
                        </td>
                        <td style={{...styles.td, color: '#00FF00', fontWeight: '800'}}>M{p.amount_maluti}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div style={styles.footer}>
        Fortune Brownies ©2026 | Fort Knox Academy<br/>
        CEO: Makhauhelo Moima
      </div>
    </div>
  )
}