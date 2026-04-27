import { Link } from 'react-router-dom'

function App() {
  return (
    <div style={{
      backgroundColor: '#000000',
      color: '#D4AF37',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        padding: '0.5rem 0'
      }}>
        <h3 style={{ fontSize: '1.1rem', color: '#D4AF37' }}>Fortune Brownies ©2026</h3>
        <Link to="/login" style={{
          backgroundColor: '#00C851',
          color: '#000000',
          padding: '10px 20px',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}>
          Login
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '0.8rem',
          lineHeight: '1.2',
          color: '#D4AF37'
        }}>
          We don't sell brownies.<br/>We sell freedom.
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '1.5rem',
          padding: '0 0.5rem',
          color: '#D4AF37',
          opacity: '0.9'
        }}>
          Lesotho's first automated micro-franchise for women. One tray at a time.
        </p>

        <div style={{
          backgroundColor: '#0a0a0a',
          border: '2px solid #D4AF37',
          borderRadius: '12px',
          padding: '1.2rem',
          margin: '0 auto 1.5rem auto',
          maxWidth: '380px'
        }}>
          <h2 style={{ 
            fontSize: '1.4rem', 
            marginBottom: '0.8rem',
            color: '#D4AF37'
          }}>
            M250 Founding Member
          </h2>
          <p style={{ marginBottom: '0.4rem', fontSize: '1rem', color: '#D4AF37' }}>
            0% monthly fees. Forever.
          </p>
          <p style={{ marginBottom: '1.2rem', fontSize: '1rem', color: '#D4AF37' }}>
            M50 per referral. Auto-paid to Ecocash/Mpesa.
          </p>
          <a href="https://wa.me/26657031600" style={{
            display: 'block',
            backgroundColor: '#D4AF37',
            color: '#000000',
            padding: '14px',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '0.8rem'
          }}>
            Join WhatsApp — M250
          </a>
          <p style={{ fontSize: '0.9rem', opacity: '0.7', color: '#D4AF37' }}>
            Standard price M500 after July 25, 2026
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.8rem',
          marginBottom: '1.5rem',
          maxWidth: '380px',
          margin: '0 auto 1.5rem auto'
        }}>
          <div style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid #D4AF37',
            padding: '0.8rem 0.4rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#D4AF37' }}>0</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#D4AF37' }}>Employees</div>
            <div style={{ fontSize: '0.8rem', opacity: '0.7', color: '#D4AF37' }}>Fully automated</div>
          </div>
          <div style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid #D4AF37',
            padding: '0.8rem 0.4rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#D4AF37' }}>3</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#D4AF37' }}>Systems</div>
            <div style={{ fontSize: '0.8rem', opacity: '0.7', color: '#D4AF37' }}>Automated stack</div>
          </div>
          <div style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid #D4AF37',
            padding: '0.8rem 0.4rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#D4AF37' }}>150+</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#D4AF37' }}>Countries</div>
            <div style={{ fontSize: '0.8rem', opacity: '0.7', color: '#D4AF37' }}>Global reach</div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid #D4AF37',
          borderRadius: '12px',
          padding: '1.2rem',
          margin: '0 auto 1.5rem auto',
          maxWidth: '380px'
        }}>
          <h2 style={{ 
            fontSize: '1.3rem', 
            marginBottom: '1rem',
            color: '#D4AF37'
          }}>
            How It Works
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '0.5rem' }}>
            {[
              {num: '1', title: 'Pay M250 Once', sub: 'Ecocash/Mpesa to +266 570 31600. Send screenshot.'},
              {num: '2', title: 'Get Referral Link', sub: 'Share on WhatsApp Status. Each signup = M50 to you.'},
              {num: '3', title: 'Cash Out Monthly', sub: 'Automated payouts on 26th. 0% fees. Forever.'}
            ].map((step, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  backgroundColor: '#D4AF37',
                  color: '#000000',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.5rem auto',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  {step.num}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem', color: '#D4AF37' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: '0.7', color: '#D4AF37' }}>
                  {step.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '0.4rem', color: '#D4AF37' }}>
            <strong>CEO Direct WhatsApp: +266 570 31600</strong>
          </p>
          <p style={{ fontSize: '0.85rem', opacity: '0.6', marginBottom: '0.4rem', color: '#D4AF37' }}>
            Founded: January 2026 | Dev: April 18, 2026 | Launch: April 25, 2026
          </p>
          <p style={{ fontSize: '0.85rem', opacity: '0.6', color: '#D4AF37' }}>
            © 2026 Fortune Brownies. From Khubetsoana to the world 🇱🇸
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
