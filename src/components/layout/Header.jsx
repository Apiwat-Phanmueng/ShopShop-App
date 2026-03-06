import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { useNav } from '../../contexts/NavContext'
import { Avatar } from '../shared'
import Btn from '../shared/Btn'

export default function Header({ search, setSearch }) {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const { nav } = useNav()
  const [userMenu, setUserMenu] = useState(false)

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const menuItems = [
    { icon: '👤', label: 'โปรไฟล์ของฉัน', action: () => nav('profile') },
    { icon: '📦', label: 'คำสั่งซื้อของฉัน', action: () => nav('orders') },
    ...(user?.role === 'admin'
      ? [{ icon: '⚙️', label: 'แผงควบคุม Admin', action: () => nav('admin') }]
      : []),
    { icon: '🚪', label: 'ออกจากระบบ', action: logout, danger: true },
  ]

  return (
    <header style={{
      background: 'var(--primary)', position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 2px 8px rgba(22,163,74,0.3)',
    }}>
      {/* ── Top bar ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', padding: '4px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
          {['ดาวน์โหลดแอป', 'ติดตาม ShopShop', 'ขายบน ShopShop'].map(t => (
            <span key={t}
              style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
            >{t}</span>
          ))}
        </div>
      </div>

      {/* ── Main row ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Logo */}
        <div onClick={() => nav('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🛒</div>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 22, letterSpacing: '-0.03em' }}>ShopShop</span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 680, position: 'relative' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && nav('home')}
            placeholder="ค้นหาสินค้า..."
            style={{ width: '100%', padding: '10px 48px 10px 16px', borderRadius: 8, border: 'none', fontSize: 14, outline: 'none', fontFamily: 'var(--font)' }}
          />
          <button
            onClick={() => nav('home')}
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, padding: '0 18px', background: 'var(--primary-light)', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer', color: '#fff', fontSize: 16 }}
          >🔍</button>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {/* Cart icon */}
          <button
            onClick={() => nav('cart')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 8, color: '#fff', fontSize: 22, transition: 'transform 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 2, width: 18, height: 18,
                borderRadius: '50%', background: '#ffb300', color: '#333',
                fontSize: 10, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'bounce-in 0.3s ease',
              }}>{cartCount}</span>
            )}
          </button>

          {/* User menu */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setUserMenu(v => !v)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.12)' }}
              >
                <Avatar initials={user.avatar} size={28} bg="rgba(255,255,255,0.25)" />
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>▾</span>
              </div>

              {userMenu && (
                <div className="fade-in" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#fff', borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', minWidth: 180, overflow: 'hidden', zIndex: 200 }}>
                  {menuItems.map(item => (
                    <button
                      key={item.label}
                      onClick={() => { item.action(); setUserMenu(false) }}
                      style={{ width: '100%', padding: '12px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 13, fontFamily: 'var(--font)', color: item.danger ? 'var(--danger)' : 'var(--text)', display: 'flex', alignItems: 'center', gap: 10, transition: 'background 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = item.danger ? '#fff3f0' : '#f8f8f8' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
                    >
                      <span>{item.icon}</span>{item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 6 }}>
              <Btn onClick={() => nav('login')} variant="ghost" size="sm" style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }}>เข้าสู่ระบบ</Btn>
              <Btn onClick={() => nav('register')} size="sm" style={{ background: '#fff', color: 'var(--primary)' }}>สมัครสมาชิก</Btn>
            </div>
          )}
        </div>
      </div>

      {/* ── Category bar ── */}
      <div style={{ background: 'rgba(0,0,0,0.1)', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex' }}>
          {['Flash Sale 🔥', 'Voucher', 'LiveStream', 'ใหม่ล่าสุด', 'เครื่องใช้ไฟฟ้า', 'แฟชั่น', 'อาหาร', 'ความงาม'].map(cat => (
            <button key={cat} onClick={() => nav('home')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', color: 'rgba(255,255,255,0.85)', fontSize: 12, fontFamily: 'var(--font)', fontWeight: 500, whiteSpace: 'nowrap', transition: 'all 0.15s', borderBottom: '2px solid transparent' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderBottomColor = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderBottomColor = 'transparent' }}
            >{cat}</button>
          ))}
        </div>
      </div>
    </header>
  )
}
