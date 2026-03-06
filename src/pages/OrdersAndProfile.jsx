// ── OrderSuccessPage ──────────────────────────────────────────────────────────
import { useNav } from '../contexts/NavContext'
import Btn from '../components/shared/Btn'

export function OrderSuccessPage({ order }) {
  const { nav } = useNav()
  return (
    <div style={{ maxWidth: 600, margin: '60px auto', padding: '0 16px', textAlign: 'center' }}>
      <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '40px 32px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(0,177,79,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 16px', animation: 'bounce-in 0.5s ease' }}>✅</div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: 'var(--success)', marginBottom: 8 }}>ชำระเงินสำเร็จ!</h2>
        <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 20 }}>ขอบคุณสำหรับการสั่งซื้อ คำสั่งซื้อของคุณกำลังดำเนินการ</p>
        <div style={{ background: '#f8f8f8', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'left' }}>
          {[['หมายเลขคำสั่งซื้อ', order?.id, true], ['วันที่สั่งซื้อ', order?.date, false], ['ยอดชำระ', `฿${order?.total?.toLocaleString()}`, false]].map(([k, v, mono]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
              <span style={{ color: 'var(--text3)' }}>{k}</span>
              <span style={{ fontWeight: mono ? 800 : 600, color: mono ? 'var(--primary)' : 'var(--text)', fontFamily: mono ? 'monospace' : 'inherit' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn onClick={() => nav('orders')} variant="outline" style={{ flex: 1 }}>ดูคำสั่งซื้อ</Btn>
          <Btn onClick={() => nav('home')} variant="green" style={{ flex: 1 }}>ช้อปต่อ →</Btn>
        </div>
      </div>
    </div>
  )
}

// ── OrdersPage ────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { useOrders } from '../contexts/OrderContext'
import { ORDER_STATUS } from '../data/mockData'

export function OrdersPage() {
  const { orders } = useOrders()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px' }}>
      <h2 className="fade-up" style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>📦 คำสั่งซื้อของฉัน</h2>

      {/* Filter tabs */}
      <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '4px 6px', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 2, marginBottom: 14, overflowX: 'auto' }}>
        {[['all', 'ทั้งหมด'], ...Object.entries(ORDER_STATUS).map(([k, v]) => [k, v.label])].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id)}
            style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: filter === id ? 'var(--primary)' : 'none', color: filter === id ? '#fff' : 'var(--text2)', fontFamily: 'var(--font)', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}
          >{label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text3)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>ยังไม่มีคำสั่งซื้อ</div>
          </div>
        ) : filtered.map((order, i) => {
          const st = ORDER_STATUS[order.status] || ORDER_STATUS.pending
          return (
            <div key={order.id} className="fade-up card-hover"
              style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', animationDelay: `${i * 0.05}s` }}
            >
              <div style={{ background: '#f8f8f8', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{order.id}</span>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{order.date}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: st.bg, color: st.color }}>{st.icon} {st.label}</span>
              </div>
              <div style={{ padding: '14px 20px' }}>
                {order.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 13 }}>
                    <span style={{ color: 'var(--text2)' }}>{item.name} x{item.qty}</span>
                    <span style={{ fontWeight: 600 }}>฿{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px dashed var(--border)', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--text3)' }}>
                    {order.payment === 'card' ? '💳 บัตร' : order.payment === 'promptpay' ? '📲 PromptPay' : '🏦 โอน'}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 900, color: 'var(--primary)' }}>฿{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── ProfilePage ───────────────────────────────────────────────────────────────
import { useAuth } from '../contexts/AuthContext'
import { Avatar, Badge } from '../components/shared'

export function ProfilePage() {
  const { user } = useAuth()
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow)', textAlign: 'center' }}>
        <Avatar initials={user?.avatar} size={72} />
        <h2 style={{ fontSize: 22, fontWeight: 900, marginTop: 16, marginBottom: 4 }}>{user?.name}</h2>
        <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 20 }}>{user?.email}</p>
        <Badge color="var(--primary)">
          {user?.role === 'admin' ? '⚙️ Administrator' : '👤 Customer'}
        </Badge>
      </div>
    </div>
  )
}
