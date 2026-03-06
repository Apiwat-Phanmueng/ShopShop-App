export default function Footer() {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid var(--border)', marginTop: 40, padding: '32px 0 16px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 24 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>🛒</span>
              <span style={{ fontWeight: 900, fontSize: 18, color: 'var(--primary)' }}>ShopShop</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.7 }}>
              แพลตฟอร์ม E-commerce ที่ดีที่สุด<br />
              สร้างด้วย React + Node.js + Stripe + PostgreSQL
            </p>
          </div>

          {/* Link columns */}
          {[
            ['บริษัท',    ['เกี่ยวกับเรา', 'ร่วมงานกับเรา', 'ข่าวสาร', 'นักลงทุน']],
            ['บริการ',    ['ช่วยเหลือ', 'นโยบายคืนสินค้า', 'ชำระเงิน', 'จัดส่ง']],
            ['ติดตามเรา', ['Facebook', 'Instagram', 'Twitter', 'TikTok']],
          ].map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: 13, fontWeight: 800, marginBottom: 12, color: 'var(--text)' }}>{title}</h4>
              {links.map(l => (
                <div key={l}
                  style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6, cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)' }}
                >{l}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 11, color: 'var(--text3)' }}>
            © 2024 ShopShop App. Portfolio Project — Built with React, Node.js, Stripe, PostgreSQL
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['💳 Visa', '💳 Mastercard', '📲 PromptPay', '🏦 KBank'].map(p => (
              <span key={p} style={{ fontSize: 10, padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text3)' }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
