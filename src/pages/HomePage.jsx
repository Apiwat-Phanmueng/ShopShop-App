import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useNav } from '../contexts/NavContext'
import Btn from '../components/shared/Btn'
import { Stars, Toast } from '../components/shared'

export default function HomePage({ search }) {
  const { user }             = useAuth()
  const { cart, dispatch }   = useCart()
  const { nav }              = useNav()
  const [category, setCategory] = useState('ทั้งหมด')
  const [sort, setSort]         = useState('popular')
  const [toast, setToast]       = useState(null)

  const filtered = PRODUCTS
    .filter(p => {
      const matchCat    = category === 'ทั้งหมด' || p.category === category
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
    .sort((a, b) => {
      if (sort === 'popular')    return b.sold  - a.sold
      if (sort === 'price_asc')  return a.price - b.price
      if (sort === 'price_desc') return b.price - a.price
      return b.rating - a.rating
    })

  const addToCart = (p, e) => {
    e.stopPropagation()
    if (!user) { nav('login'); return }
    dispatch({ type: 'ADD', item: p })
    setToast(`เพิ่ม "${p.name}" ลงตะกร้าแล้ว`)
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 16 }}>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* Flash Sale Banner */}
      <div className="fade-up" style={{ background: 'linear-gradient(135deg, #059669, var(--primary), var(--primary-light))', borderRadius: 'var(--radius-lg)', padding: '24px 32px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ background: '#fff', color: 'var(--primary)', fontWeight: 900, fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>⚡ FLASH SALE</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>จบใน 02:14:30</span>
          </div>
          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em' }}>ลดสูงสุด 70%</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 }}>สินค้าคัดพิเศษ ราคาช็อค วันนี้เท่านั้น!</p>
        </div>
        <Btn style={{ background: '#fff', color: 'var(--primary)', flexShrink: 0 }}>ช้อปเลย →</Btn>
      </div>

      {/* Filter bar */}
      <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{ padding: '6px 14px', borderRadius: 20, border: category === cat ? 'none' : '1.5px solid var(--border)', background: category === cat ? 'var(--primary)' : '#fff', color: category === cat ? '#fff' : 'var(--text2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.15s' }}
            >{cat}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ padding: '7px 12px', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font)', outline: 'none', background: '#fff' }}
        >
          <option value="popular">ยอดนิยม</option>
          <option value="rating">คะแนนสูงสุด</option>
          <option value="price_asc">ราคา: ต่ำ→สูง</option>
          <option value="price_desc">ราคา: สูง→ต่ำ</option>
        </select>
      </div>

      {/* Results count */}
      <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 12, padding: '0 4px' }}>
        {search && <span>ผลการค้นหา &ldquo;<strong style={{ color: 'var(--primary)' }}>{search}</strong>&rdquo; — </span>}
        {filtered.length} สินค้า
      </div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
        {filtered.map((p, i) => {
          const discount = Math.round((1 - p.price / p.originalPrice) * 100)
          const inCart   = cart.find(c => c.id === p.id)
          return (
            <div key={p.id} className="card-hover fade-up"
              onClick={() => nav('product', p)}
              style={{ background: '#fff', borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-sm)', animationDelay: `${i * 0.03}s` }}
            >
              {/* Thumbnail */}
              <div style={{ height: 180, background: 'linear-gradient(135deg, #fff8f6, #fff3f0)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontSize: 72 }}>
                {p.image}
                {discount > 0 && (
                  <div style={{ position: 'absolute', top: 8, left: 8, background: 'var(--primary)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 4 }}>-{discount}%</div>
                )}
                {p.stock < 10 && (
                  <div style={{ position: 'absolute', top: 8, right: 8, background: '#ff9500', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>เหลือน้อย</div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '10px 12px 12px' }}>
                <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 5 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 16 }}>฿{p.price.toLocaleString()}</span>
                  <span style={{ color: 'var(--text4)', fontSize: 11, textDecoration: 'line-through' }}>฿{p.originalPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Stars rating={p.rating} />
                    <span style={{ fontSize: 10, color: 'var(--text3)' }}>{p.sold.toLocaleString()} ขาย</span>
                  </div>
                  <button onClick={e => addToCart(p, e)}
                    style={{ background: inCart ? 'var(--primary-pale2)' : 'var(--primary-pale)', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', fontSize: 14, color: 'var(--primary)', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-pale2)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = inCart ? 'var(--primary-pale2)' : 'var(--primary-pale)' }}
                  >🛒</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text3)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>ไม่พบสินค้าที่ค้นหา</div>
        </div>
      )}
    </div>
  )
}
