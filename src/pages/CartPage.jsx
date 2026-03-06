import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useNav } from '../contexts/NavContext'
import Btn from '../components/shared/Btn'

export default function CartPage() {
  const { cart, dispatch } = useCart()
  const { user }           = useAuth()
  const { nav }            = useNav()

  if (!user) { nav('login'); return null }

  const checkedItems = cart.filter(i => i.checked !== false)
  const subtotal     = checkedItems.reduce((s, i) => s + i.price * i.qty, 0)
  const allChecked   = cart.length > 0 && cart.every(i => i.checked !== false)

  if (cart.length === 0) return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 16px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>ตะกร้าของคุณว่างเปล่า</h2>
      <p style={{ color: 'var(--text3)', marginBottom: 24 }}>เพิ่มสินค้าที่ชอบลงตะกร้าได้เลย!</p>
      <Btn onClick={() => nav('home')} variant="green">ช้อปเลย →</Btn>
    </div>
  )

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 16px' }}>
      <h2 className="fade-up" style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>🛒 ตะกร้าสินค้า ({cart.length} รายการ)</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, alignItems: 'start' }}>
        {/* ── Items ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Select all */}
          <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: 'var(--shadow-sm)' }}>
            <input type="checkbox" checked={allChecked} onChange={e => dispatch({ type: 'CHECK_ALL', checked: e.target.checked })} style={{ width: 16, height: 16, accentColor: 'var(--primary)', cursor: 'pointer' }} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>เลือกทั้งหมด ({cart.length})</span>
            {checkedItems.length > 0 && (
              <button onClick={() => dispatch({ type: 'CLEAR_CHECKED' })} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--danger)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>ลบที่เลือก</button>
            )}
          </div>

          {cart.map((item, i) => (
            <div key={item.id} className="fade-up"
              style={{ background: '#fff', borderRadius: 'var(--radius)', padding: 16, display: 'flex', gap: 14, alignItems: 'center', boxShadow: 'var(--shadow-sm)', animationDelay: `${i * 0.05}s` }}
            >
              <input type="checkbox" checked={item.checked !== false} onChange={() => dispatch({ type: 'TOGGLE_CHECK', id: item.id })} style={{ width: 16, height: 16, accentColor: 'var(--primary)', cursor: 'pointer', flexShrink: 0 }} />
              <div style={{ width: 80, height: 80, background: 'var(--primary-pale)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0 }}>{item.image}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>หมวด: {item.category}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 16 }}>฿{item.price.toLocaleString()}</span>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
                    <button onClick={() => item.qty === 1 ? dispatch({ type: 'REMOVE', id: item.id }) : dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })} style={{ width: 28, height: 28, border: 'none', background: '#f8f8f8', cursor: 'pointer', fontSize: 14 }}>−</button>
                    <span style={{ width: 36, textAlign: 'center', fontSize: 13, fontWeight: 700 }}>{item.qty}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })} style={{ width: 28, height: 28, border: 'none', background: '#f8f8f8', cursor: 'pointer', fontSize: 14 }}>+</button>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 15 }}>฿{(item.price * item.qty).toLocaleString()}</div>
                <button onClick={() => dispatch({ type: 'REMOVE', id: item.id })} style={{ marginTop: 6, background: 'none', border: 'none', color: 'var(--text4)', cursor: 'pointer', fontSize: 18 }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text4)' }}
                >🗑</button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Summary ── */}
        <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 22, boxShadow: 'var(--shadow)', position: 'sticky', top: 120 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>สรุปคำสั่งซื้อ</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text2)' }}>
              <span>ราคาสินค้า ({checkedItems.reduce((s, i) => s + i.qty, 0)} ชิ้น)</span>
              <span>฿{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text2)' }}>
              <span>ค่าจัดส่ง</span>
              <span style={{ color: 'var(--success)', fontWeight: 700 }}>ฟรี</span>
            </div>
          </div>
          <div style={{ borderTop: '2px dashed var(--border)', paddingTop: 14, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: 15 }}>ยอดรวม</span>
              <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 22 }}>฿{subtotal.toLocaleString()}</span>
            </div>
          </div>
          <Btn onClick={() => checkedItems.length > 0 && nav('checkout')} variant="green" full size="lg" disabled={checkedItems.length === 0}>
            ดำเนินการชำระเงิน ({checkedItems.length})
          </Btn>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
            {['💳', '🏦', '📲'].map(i => <span key={i} style={{ fontSize: 18 }}>{i}</span>)}
          </div>
          <p style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', marginTop: 8 }}>ชำระเงินปลอดภัยด้วย Stripe</p>
        </div>
      </div>
    </div>
  )
}
