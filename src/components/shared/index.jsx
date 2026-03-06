import { useEffect } from 'react'

export function Badge({ children, color = 'var(--primary)', bg }) {
  return (
    <span
      className="tag-badge"
      style={{ background: bg || `${color}15`, color }}
    >
      {children}
    </span>
  )
}

export function Stars({ rating }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#ffb300' : '#ddd', fontSize: 11 }}>
          ★
        </span>
      ))}
    </span>
  )
}

export function Avatar({ initials, size = 32, bg = 'var(--primary)' }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        background: bg, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: size * 0.35,
        fontWeight: 800, color: '#fff', flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

export function Spinner() {
  return (
    <span style={{ display: 'inline-block', animation: 'spin 0.7s linear infinite', fontSize: 16 }}>
      ⟳
    </span>
  )
}

export function Toast({ msg, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: '#333', color: '#fff', padding: '12px 22px', borderRadius: 40,
      fontSize: 13, fontWeight: 600, zIndex: 9999,
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      display: 'flex', alignItems: 'center', gap: 8,
      animation: 'bounce-in 0.3s ease',
    }}>
      <span style={{ color: '#4ade80' }}>✓</span> {msg}
    </div>
  )
}
