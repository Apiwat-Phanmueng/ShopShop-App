import { useState } from 'react'
import { PRODUCTS } from '../data/mockData'
import { ORDER_STATUS } from '../data/mockData'
import { useOrders } from '../contexts/OrderContext'
import { useAuth } from '../contexts/AuthContext'
import { useNav } from '../contexts/NavContext'
import { Stars } from '../components/shared'
import Btn from '../components/shared/Btn'

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '18px 20px', boxShadow: 'var(--shadow-sm)', borderLeft: `4px solid ${color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{icon}</div>
        <span style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 700 }}>{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 900, color, letterSpacing: '-0.03em' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{sub}</div>}
    </div>
  )
}

export default function AdminPanel() {
  const { orders }      = useOrders()
  const { user }        = useAuth()
  const { nav }         = useNav()
  const [tab, setTab]   = useState('overview')
  const products        = PRODUCTS

  if (!user || user.role !== 'admin') return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>ไม่มีสิทธิ์เข้าถึง</h2>
      <Btn onClick={() => nav('home')} variant="green">กลับหน้าแรก</Btn>
    </div>
  )

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)

  const TABS = [
    ['overview',  '📊', 'ภาพรวม'],
    ['orders',    '📦', 'คำสั่งซื้อ'],
    ['products',  '🏷️', 'สินค้า'],
    ['analytics', '📈', 'วิเคราะห์'],
  ]

  const TH = ({ children }) => (
    <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text3)', letterSpacing: '0.04em' }}>{children}</th>
  )

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 16px' }}>
      {/* Header */}
      <div className="fade-up" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4, letterSpacing: '0.1em' }}>ADMIN DASHBOARD</div>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 900 }}>⚙️ ShopShop Admin Panel</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff' }}>{user.avatar}</div>
          <div>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{user.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Administrator</div>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 2, padding: '4px 6px', marginBottom: 16, overflowX: 'auto' }}>
        {TABS.map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: tab === id ? 'var(--primary)' : 'none', color: tab === id ? '#fff' : 'var(--text2)', fontFamily: 'var(--font)', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6 }}
          >{icon} {label}</button>
        ))}
      </div>

      {/* ── Overview ── */}
      {tab === 'overview' && (
        <div className="fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
            <StatCard icon="💰" label="รายได้รวม"       value={`฿${totalRevenue.toLocaleString()}`} sub="ทุกคำสั่งซื้อ"  color="var(--success)" />
            <StatCard icon="📦" label="คำสั่งซื้อทั้งหมด" value={orders.length}                      sub="ทุกสถานะ"       color="var(--info)" />
            <StatCard icon="🏷️" label="สินค้าทั้งหมด"   value={products.length}                     sub="รายการในร้าน"  color="var(--accent)" />
            <StatCard icon="👥" label="ผู้ใช้งาน"        value={2}                                   sub="สมาชิกทั้งหมด" color="#7c3aed" />
          </div>

          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 15, fontWeight: 800 }}>คำสั่งซื้อล่าสุด</h3>
              <Btn size="sm" variant="ghost" onClick={() => setTab('orders')}>ดูทั้งหมด →</Btn>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#f8f8f8' }}>
                {['Order ID', 'สินค้า', 'ยอดรวม', 'สถานะ', 'ชำระด้วย'].map(h => <TH key={h}>{h}</TH>)}
              </tr></thead>
              <tbody>
                {orders.slice(0, 5).map(o => {
                  const st = ORDER_STATUS[o.status] || ORDER_STATUS.pending
                  return (
                    <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#fafafa' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 12, color: 'var(--primary)', fontWeight: 700 }}>{o.id}</td>
                      <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text2)', maxWidth: 200 }}>{o.items.map(i => i.name).join(', ').slice(0, 30)}...</td>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: 'var(--success)' }}>฿{o.total.toLocaleString()}</td>
                      <td style={{ padding: '12px 14px' }}><span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: st.bg, color: st.color }}>{st.label}</span></td>
                      <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text3)' }}>{o.payment}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Orders tab ── */}
      {tab === 'orders' && (
        <div className="fade-in" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 800 }}>คำสั่งซื้อทั้งหมด ({orders.length})</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ background: '#f8f8f8' }}>
              {['Order ID', 'วันที่', 'สินค้า', 'ยอดรวม', 'สถานะ', 'ชำระ', 'จัดการ'].map(h => <TH key={h}>{h}</TH>)}
            </tr></thead>
            <tbody>
              {orders.map(o => {
                const st = ORDER_STATUS[o.status] || ORDER_STATUS.pending
                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fafafa' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 12, color: 'var(--primary)', fontWeight: 700 }}>{o.id}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text3)' }}>{o.date}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text2)', maxWidth: 200 }}>{o.items.map(i => `${i.name} x${i.qty}`).join(', ')}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 800, color: 'var(--success)' }}>฿{o.total.toLocaleString()}</td>
                    <td style={{ padding: '12px 14px' }}><span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: st.bg, color: st.color }}>{st.label}</span></td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text3)' }}>{o.payment}</td>
                    <td style={{ padding: '12px 14px' }}><Btn size="sm" variant="ghost" style={{ fontSize: 11 }}>แก้ไข</Btn></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Products tab ── */}
      {tab === 'products' && (
        <div className="fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800 }}>สินค้าทั้งหมด ({products.length})</h3>
            <Btn size="sm" variant="green">+ เพิ่มสินค้า</Btn>
          </div>
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#f8f8f8' }}>
                {['สินค้า', 'หมวดหมู่', 'ราคา', 'สต็อก', 'ขายแล้ว', 'คะแนน', 'จัดการ'].map(h => <TH key={h}>{h}</TH>)}
              </tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fafafa' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 24 }}>{p.image}</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px' }}><span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: 'rgba(22,163,74,0.08)', color: 'var(--primary)' }}>{p.category}</span></td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--primary)', fontSize: 13 }}>฿{p.price.toLocaleString()}</td>
                    <td style={{ padding: '10px 14px' }}><span style={{ fontSize: 12, fontWeight: 700, color: p.stock < 10 ? 'var(--danger)' : 'var(--success)' }}>{p.stock}</span></td>
                    <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text2)' }}>{p.sold.toLocaleString()}</td>
                    <td style={{ padding: '10px 14px' }}><Stars rating={p.rating} /></td>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <Btn size="sm" variant="ghost" style={{ fontSize: 11 }}>แก้ไข</Btn>
                        <Btn size="sm" variant="ghost" style={{ fontSize: 11, color: 'var(--danger)', borderColor: 'var(--danger)' }}>ลบ</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Analytics tab ── */}
      {tab === 'analytics' && (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Revenue chart */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 22, boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 18 }}>รายได้รายวัน (7 วันล่าสุด)</h3>
            {[['1 มี.ค.', 12400], ['2 มี.ค.', 8900], ['3 มี.ค.', 15600], ['4 มี.ค.', 11200], ['5 มี.ค.', 18000], ['6 มี.ค.', 9800], ['วันนี้', 14500]].map(([day, val]) => (
              <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: 'var(--text3)', width: 50, flexShrink: 0 }}>{day}</span>
                <div style={{ flex: 1, height: 20, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(val / 18000) * 100}%`, background: 'linear-gradient(90deg, var(--primary-light), var(--primary))', borderRadius: 4, transition: 'width 0.8s ease' }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', width: 65, textAlign: 'right', flexShrink: 0 }}>฿{val.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Top products */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 22, boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 18 }}>สินค้าขายดี</h3>
            {[...products].sort((a, b) => b.sold - a.sold).slice(0, 6).map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: i < 3 ? 'var(--primary)' : '#f0f0f0', color: i < 3 ? '#fff' : 'var(--text3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: 20 }}>{p.image}</span>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', flexShrink: 0 }}>{p.sold.toLocaleString()} ชิ้น</span>
              </div>
            ))}
          </div>

          {/* Category breakdown */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 22, boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 16 }}>สัดส่วนตามหมวดหมู่</h3>
            {Object.entries(
              products.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc }, {})
            ).map(([cat, count]) => {
              const pct = Math.round((count / products.length) * 100)
              const colors = { 'อิเล็กทรอนิกส์': '#1a94ff', 'แฟชั่น': '#f472b6', 'ความงาม': '#a78bfa', 'รองเท้า': '#16a34a', 'อาหาร': '#ff9500', 'บ้านและสวน': '#22c55e' }
              return (
                <div key={cat} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text2)' }}>{cat}</span>
                    <span style={{ fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div style={{ height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: colors[cat] || 'var(--primary)', borderRadius: 3, transition: 'width 0.8s' }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order status */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 22, boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 16 }}>สถานะคำสั่งซื้อ</h3>
            {[['✅', 'ส่งแล้ว', 'delivered', '#00b14f'], ['🚚', 'กำลังส่ง', 'shipping', '#7c3aed'], ['⏳', 'รอดำเนินการ', 'pending', '#ff9500']].map(([icon, label, status, color]) => {
              const cnt = orders.filter(o => o.status === status).length
              return (
                <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, marginBottom: 8, background: '#f8f8f8' }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 18, fontWeight: 900, color }}>{cnt}</span>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>รายการ</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
