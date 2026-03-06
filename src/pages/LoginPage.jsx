import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNav } from '../contexts/NavContext'
import Btn from '../components/shared/Btn'
import { Spinner } from '../components/shared'

export default function LoginPage() {
  const { login } = useAuth()
  const { nav } = useNav()
  const [tab, setTab]           = useState('email')
  const [email, setEmail]       = useState('user@shopee.com')
  const [password, setPassword] = useState('1234')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handle = async () => {
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 700))
    if (!login(email, password)) setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    else nav('home')
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    border: '1.5px solid var(--border)', borderRadius: 8,
    fontSize: 14, outline: 'none', fontFamily: 'var(--font)', transition: 'border 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff3f0 0%, #fff 60%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Decorative top strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280, background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', zIndex: 0 }} />

      <div className="fade-up" style={{ position: 'relative', zIndex: 1, display: 'flex', width: '100%', maxWidth: 860, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        {/* ── Left panel ── */}
        <div style={{ flex: 1, background: 'linear-gradient(160deg, var(--primary), var(--primary-light))', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#fff' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🛒</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>ShopShop</h2>
          <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.6 }}>แพลตฟอร์ม E-commerce<br />ที่ดีที่สุดในไทย</p>

          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['✓ สินค้าหลายล้านชิ้น', '✓ ส่งฟรีทุกออเดอร์', '✓ ชำระเงินปลอดภัย Stripe', '✓ คืนสินค้าได้ใน 15 วัน'].map(t => (
              <span key={t} style={{ fontSize: 13, opacity: 0.9 }}>{t}</span>
            ))}
          </div>

          <div style={{ marginTop: 28, padding: 14, background: 'rgba(255,255,255,0.15)', borderRadius: 10, fontSize: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>🧪 Demo Accounts</div>
            <div style={{ opacity: 0.9 }}>User: user@shopee.com / 1234</div>
            <div style={{ opacity: 0.9 }}>Admin: admin@shopee.com / admin</div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div style={{ flex: 1, background: '#fff', padding: '48px 40px' }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>เข้าสู่ระบบ</h3>
          <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 28 }}>ยินดีต้อนรับกลับมา!</p>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '2px solid var(--border)', marginBottom: 24 }}>
            {[{ id: 'email', label: '📧 อีเมล' }, { id: 'phone', label: '📱 เบอร์โทร' }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ padding: '8px 16px', border: 'none', background: 'none', fontFamily: 'var(--font)', fontSize: 13, fontWeight: 600, color: tab === t.id ? 'var(--primary)' : 'var(--text3)', borderBottom: `2px solid ${tab === t.id ? 'var(--primary)' : 'transparent'}`, marginBottom: -2, cursor: 'pointer', transition: 'all 0.2s' }}
              >{t.label}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>อีเมล</label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>รหัสผ่าน</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)' }}
                onKeyDown={e => e.key === 'Enter' && handle()}
              />
            </div>

            {error && (
              <div style={{ background: '#fff3f0', border: '1px solid #ffccc7', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--danger)' }}>
                ⚠️ {error}
              </div>
            )}

            <Btn onClick={handle} variant="green" full size="lg" disabled={loading}>
              {loading && <Spinner />} {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Btn>

            <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text3)' }}>หรือเข้าสู่ระบบด้วย</div>

            <div style={{ display: 'flex', gap: 8 }}>
              {[['🇫', 'Facebook'], ['🔍', 'Google']].map(([icon, name]) => (
                <button key={name}
                  style={{ flex: 1, padding: '10px', border: '1.5px solid var(--border)', borderRadius: 8, background: '#fff', fontFamily: 'var(--font)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                >{icon} {name}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
