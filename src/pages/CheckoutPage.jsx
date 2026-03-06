import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useOrders } from '../contexts/OrderContext'
import { useAuth } from '../contexts/AuthContext'
import { useNav } from '../contexts/NavContext'
import Btn from '../components/shared/Btn'
import { Spinner } from '../components/shared'

const fieldFocus = e => { e.target.style.borderColor = 'var(--primary)' }
const fieldBlur  = e => { e.target.style.borderColor = 'var(--border)' }

const INPUT = {
  width: '100%', padding: '10px 12px',
  border: '1.5px solid var(--border)', borderRadius: 8,
  fontSize: 13, outline: 'none', fontFamily: 'var(--font)', transition: 'border 0.2s',
}

const Steps = ({ step }) => (
  <div className="fade-up" style={{ display: 'flex', alignItems: 'center', marginBottom: 24, background: '#fff', borderRadius: 'var(--radius)', padding: '14px 24px', boxShadow: 'var(--shadow-sm)' }}>
    {[['1', 'ที่อยู่จัดส่ง'], ['2', 'วิธีชำระเงิน'], ['3', 'ยืนยันคำสั่ง']].map(([n, label], i) => (
      <div key={n} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: step >= parseInt(n) ? 'var(--primary)' : '#f0f0f0', color: step >= parseInt(n) ? '#fff' : 'var(--text3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>
            {step > parseInt(n) ? '✓' : n}
          </div>
          <span style={{ fontSize: 13, fontWeight: step === parseInt(n) ? 700 : 500, color: step >= parseInt(n) ? 'var(--text)' : 'var(--text3)' }}>{label}</span>
        </div>
        {i < 2 && <div style={{ flex: 1, height: 2, background: step > parseInt(n) ? 'var(--primary)' : '#f0f0f0', margin: '0 16px' }} />}
      </div>
    ))}
  </div>
)

const OrderSummary = ({ checkedItems, total }) => (
  <div className="fade-up" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 20, boxShadow: 'var(--shadow)', position: 'sticky', top: 120 }}>
    <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 14 }}>สรุปคำสั่งซื้อ</h3>
    <div style={{ maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
      {checkedItems.map(item => (
        <div key={item.id} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 50, height: 50, background: 'var(--primary-pale)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{item.image}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
            <p style={{ fontSize: 11, color: 'var(--text3)' }}>x{item.qty}</p>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>฿{(item.price * item.qty).toLocaleString()}</span>
        </div>
      ))}
    </div>
    <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 12 }}>
      {[['ราคาสินค้า', `฿${total.toLocaleString()}`], ['ค่าจัดส่ง', 'ฟรี']].map(([k, v]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text2)', marginBottom: 6 }}><span>{k}</span><span>{v}</span></div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 16, marginTop: 8 }}>
        <span>ยอดรวม</span>
        <span style={{ color: 'var(--primary)' }}>฿{total.toLocaleString()}</span>
      </div>
    </div>
  </div>
)

export default function CheckoutPage() {
  const { cart }         = useCart()
  const { placeOrder }   = useOrders()
  const { user }         = useAuth()
  const { nav }          = useNav()

  const [step, setStep]         = useState(1)
  const [payMethod, setPayMethod] = useState('card')
  const [loading, setLoading]   = useState(false)
  const [address, setAddress]   = useState({
    name: user?.name || '', phone: '081-234-5678',
    addr: '123 ถนนสุขุมวิท แขวงคลองเตย',
    district: 'คลองเตย', province: 'กรุงเทพมหานคร', zip: '10110',
  })
  const [card, setCard] = useState({
    number: '4242 4242 4242 4242', name: user?.name || '', exp: '12/27', cvv: '***',
  })

  const checkedItems = cart.filter(i => i.checked !== false)
  const total        = checkedItems.reduce((s, i) => s + i.price * i.qty, 0)

  const handlePay = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    const order = placeOrder(payMethod)
    setLoading(false)
    nav('order_success', order)
  }

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '20px 16px' }}>
      <Steps step={step} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>
        <div>
          {/* ── Step 1: Address ── */}
          {step === 1 && (
            <div className="fade-in" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20 }}>📍 ที่อยู่จัดส่ง</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['ชื่อ-นามสกุล', 'name'], ['เบอร์โทรศัพท์', 'phone']].map(([label, key]) => (
                  <div key={key}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>{label}</label>
                    <input value={address[key]} onChange={e => setAddress({ ...address, [key]: e.target.value })} style={INPUT} onFocus={fieldFocus} onBlur={fieldBlur} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>ที่อยู่</label>
                <input value={address.addr} onChange={e => setAddress({ ...address, addr: e.target.value })} style={INPUT} onFocus={fieldFocus} onBlur={fieldBlur} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 12 }}>
                {[['แขวง/ตำบล', 'district'], ['จังหวัด', 'province'], ['รหัสไปรษณีย์', 'zip']].map(([label, key]) => (
                  <div key={key}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>{label}</label>
                    <input value={address[key]} onChange={e => setAddress({ ...address, [key]: e.target.value })} style={INPUT} onFocus={fieldFocus} onBlur={fieldBlur} />
                  </div>
                ))}
              </div>
              <Btn onClick={() => setStep(2)} variant="green" size="lg" style={{ marginTop: 20 }}>ถัดไป: เลือกการชำระเงิน →</Btn>
            </div>
          )}

          {/* ── Step 2: Payment ── */}
          {step === 2 && (
            <div className="fade-in" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20 }}>💳 วิธีชำระเงิน</h3>
              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                {[['card', '💳', 'บัตรเครดิต/เดบิต'], ['promptpay', '📲', 'PromptPay'], ['bank', '🏦', 'โอนเงิน']].map(([id, icon, label]) => (
                  <button key={id} onClick={() => setPayMethod(id)}
                    style={{ flex: 1, padding: '12px 8px', borderRadius: 10, border: `2px solid ${payMethod === id ? 'var(--primary)' : 'var(--border)'}`, background: payMethod === id ? 'var(--primary-pale)' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontFamily: 'var(--font)', transition: 'all 0.2s' }}
                  >
                    <span style={{ fontSize: 24 }}>{icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: payMethod === id ? 'var(--primary)' : 'var(--text2)' }}>{label}</span>
                  </button>
                ))}
              </div>

              {payMethod === 'card' && (
                <div>
                  {/* Card preview */}
                  <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)', borderRadius: 16, padding: '22px 24px', color: '#fff', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.05em', color: '#00d4ff' }}>STRIPE</span>
                      <span style={{ fontSize: 28 }}>💳</span>
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: 18, letterSpacing: '0.15em', marginBottom: 18 }}>{card.number || '•••• •••• •••• ••••'}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div><div style={{ fontSize: 9, opacity: 0.6, marginBottom: 2 }}>CARD HOLDER</div><div style={{ fontSize: 13, fontWeight: 700 }}>{card.name || 'YOUR NAME'}</div></div>
                      <div><div style={{ fontSize: 9, opacity: 0.6, marginBottom: 2 }}>EXPIRES</div><div style={{ fontSize: 13 }}>{card.exp}</div></div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[['หมายเลขบัตร', 'number', 'text', 19], ['ชื่อบนบัตร', 'name', 'text', 50]].map(([label, key, type, max]) => (
                      <div key={key}>
                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>{label}</label>
                        <input value={card[key]} onChange={e => setCard({ ...card, [key]: e.target.value })} type={type} maxLength={max} style={INPUT} onFocus={fieldFocus} onBlur={fieldBlur} />
                      </div>
                    ))}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>วันหมดอายุ</label>
                        <input value={card.exp} onChange={e => setCard({ ...card, exp: e.target.value })} placeholder="MM/YY" style={INPUT} onFocus={fieldFocus} onBlur={fieldBlur} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', display: 'block', marginBottom: 5 }}>CVV</label>
                        <input value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} type="password" maxLength={3} style={INPUT} onFocus={fieldFocus} onBlur={fieldBlur} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {payMethod === 'promptpay' && (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: 140, height: 140, background: '#f0f0f0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 60 }}>📲</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>สแกน QR PromptPay</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--primary)' }}>฿{total.toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>QR Code จำลอง — Powered by Stripe</div>
                </div>
              )}

              {payMethod === 'bank' && (
                <div style={{ background: '#f8f8f8', borderRadius: 12, padding: 20 }}>
                  {[['ธนาคาร', 'กสิกรไทย (KBank)'], ['ชื่อบัญชี', 'ShopShop Thailand Co., Ltd.'], ['เลขบัญชี', '123-4-56789-0'], ['ยอดโอน', `฿${total.toLocaleString()}`]].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                      <span style={{ color: 'var(--text3)' }}>{label}</span>
                      <span style={{ fontWeight: 700, color: label === 'ยอดโอน' ? 'var(--primary)' : 'var(--text)' }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <Btn onClick={() => setStep(1)} variant="ghost">← กลับ</Btn>
                <Btn onClick={() => setStep(3)} variant="green" style={{ flex: 1 }}>ตรวจสอบคำสั่งซื้อ →</Btn>
              </div>
            </div>
          )}

          {/* ── Step 3: Confirm ── */}
          {step === 3 && (
            <div className="fade-in" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20 }}>✅ ยืนยันคำสั่งซื้อ</h3>
              <div style={{ background: '#f8f8f8', borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', marginBottom: 10 }}>ที่อยู่จัดส่ง</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{address.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 2 }}>{address.phone}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{address.addr}, {address.district}, {address.province} {address.zip}</div>
              </div>
              <div style={{ background: '#fff3f0', borderRadius: 10, padding: 16, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>ยอดชำระทั้งหมด</span>
                <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 22 }}>฿{total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Btn onClick={() => setStep(2)} variant="ghost">← กลับ</Btn>
                <Btn onClick={handlePay} variant="green" style={{ flex: 1 }} disabled={loading} size="lg">
                  {loading ? <><Spinner /> กำลังดำเนินการ...</> : `🔒 ชำระเงิน ฿${total.toLocaleString()}`}
                </Btn>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', marginTop: 10 }}>🔒 ชำระเงินปลอดภัย 100% ด้วย Stripe Payment Gateway</p>
            </div>
          )}
        </div>

        <OrderSummary checkedItems={checkedItems} total={total} />
      </div>
    </div>
  )
}
