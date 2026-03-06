import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useNav } from '../contexts/NavContext'
import Btn from '../components/shared/Btn'
import { Badge, Stars, Toast } from '../components/shared'

const REVIEWS = [
  { user: 'สมหมาย A.', rating: 5, text: 'สินค้าดีมาก ส่งไวมาก แพคกิ้งสวยงาม แนะนำเลยค่ะ!', date: '3 มี.ค.' },
  { user: 'วันชัย K.',  rating: 4, text: 'ตรงปก คุณภาพดี แต่ส่งช้าไปนิด', date: '5 มี.ค.' },
]

export default function ProductPage({ product }) {
  const { dispatch } = useCart()
  const { user }     = useAuth()
  const { nav }      = useNav()
  const [qty, setQty]   = useState(1)
  const [tab, setTab]   = useState('desc')
  const [toast, setToast] = useState(null)

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  const addToCart = () => {
    if (!user) { nav('login'); return }
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD', item: product })
    setToast('เพิ่มลงตะกร้าเรียบร้อย!')
  }

  const buyNow = () => {
    if (!user) { nav('login'); return }
    dispatch({ type: 'ADD', item: product })
    nav('cart')
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 16px' }}>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: 6, fontSize: 12, color: 'var(--text3)', marginBottom: 16, alignItems: 'center' }}>
        <span onClick={() => nav('home')} style={{ cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)' }}
        >หน้าแรก</span>
        <span>›</span><span>{product.category}</span>
        <span>›</span><span style={{ color: 'var(--text)' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 20, marginBottom: 20 }}>
        {/* Image */}
        <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, boxShadow: 'var(--shadow-sm)', minHeight: 340 }}>
          {product.image}
        </div>

        {/* Details */}
        <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 28, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <Badge color="var(--primary)">🏪 ShopShop Mall</Badge>
            <Badge color="var(--accent)" bg="rgba(255,149,0,0.1)">⚡ Flash Sale</Badge>
            {discount > 0 && <Badge color="var(--success)" bg="rgba(0,177,79,0.1)">-{discount}% OFF</Badge>}
          </div>

          <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12, lineHeight: 1.3 }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
            <Stars rating={product.rating} />
            <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700 }}>{product.rating}</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>|</span>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>รีวิว {REVIEWS.length} รายการ</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>|</span>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>ขายแล้ว {product.sold.toLocaleString()} ชิ้น</span>
          </div>

          {/* Price */}
          <div style={{ background: 'var(--primary-pale)', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ color: 'var(--primary)', fontSize: 30, fontWeight: 900 }}>฿{product.price.toLocaleString()}</span>
              <span style={{ color: 'var(--text4)', fontSize: 16, textDecoration: 'line-through' }}>฿{product.originalPrice.toLocaleString()}</span>
              <span style={{ background: 'var(--primary)', color: '#fff', fontSize: 12, fontWeight: 800, padding: '2px 8px', borderRadius: 4 }}>-{discount}%</span>
            </div>
          </div>

          {/* Vouchers */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8, fontWeight: 600 }}>คูปอง</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['ลด ฿50', 'ส่งฟรี', 'Flash 10%'].map(v => (
                <span key={v} style={{ fontSize: 11, padding: '3px 10px', border: '1px dashed var(--primary)', color: 'var(--primary)', borderRadius: 4, cursor: 'pointer', background: 'var(--primary-pale)' }}>{v}</span>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 600, width: 70 }}>จำนวน</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, border: 'none', background: '#f8f8f8', cursor: 'pointer', fontSize: 16 }}>−</button>
              <span style={{ width: 48, textAlign: 'center', fontSize: 14, fontWeight: 700 }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ width: 36, height: 36, border: 'none', background: '#f8f8f8', cursor: 'pointer', fontSize: 16 }}>+</button>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>เหลือ {product.stock} ชิ้น</span>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn onClick={addToCart} variant="outline" size="lg" style={{ flex: 1 }}>🛒 เพิ่มลงตะกร้า</Btn>
            <Btn onClick={buyNow} variant="green" size="lg" style={{ flex: 1 }}>ซื้อเลย</Btn>
          </div>

          <div style={{ marginTop: 16, padding: '12px 14px', background: '#f8f8f8', borderRadius: 8, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[['🔒', 'ชำระเงินปลอดภัย'], ['🔄', 'คืนสินค้าใน 15 วัน'], ['🚚', 'ส่งฟรี']].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text2)', fontWeight: 500 }}><span>{icon}</span>{text}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          {[['desc', 'รายละเอียดสินค้า'], ['reviews', `รีวิว (${REVIEWS.length})`], ['shipping', 'การจัดส่ง']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ padding: '14px 24px', border: 'none', background: 'none', fontFamily: 'var(--font)', fontSize: 14, fontWeight: 700, cursor: 'pointer', color: tab === id ? 'var(--primary)' : 'var(--text3)', borderBottom: `2px solid ${tab === id ? 'var(--primary)' : 'transparent'}`, marginBottom: -1, transition: 'all 0.2s' }}
            >{label}</button>
          ))}
        </div>
        <div style={{ padding: 24 }}>
          {tab === 'desc' && (
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8 }}>
              {product.desc}<br /><br />
              สินค้าคุณภาพสูง ผ่านการรับรองมาตรฐาน รับประกัน 1 ปี บริการหลังการขายดีเยี่ยม
            </p>
          )}
          {tab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {REVIEWS.map((r, i) => (
                <div key={i} style={{ padding: '14px 16px', background: '#f8f8f8', borderRadius: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff' }}>{r.user.slice(0, 2)}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{r.user}</div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Stars rating={r.rating} /><span style={{ fontSize: 11, color: 'var(--text3)' }}>{r.date}</span></div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text2)' }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
          {tab === 'shipping' && (
            <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8 }}>
              🚚 ส่งฟรีทุกออเดอร์ผ่าน Kerry, Flash, J&amp;T<br />
              ⏱ ระยะเวลาจัดส่ง 1-3 วันทำการ<br />
              📦 ติดตามพัสดุได้ทุก steps<br />
              🔄 คืนฟรีภายใน 15 วัน
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
