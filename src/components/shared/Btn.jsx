const SIZES = {
  sm: { padding: '6px 14px',  fontSize: 12 },
  md: { padding: '10px 20px', fontSize: 14 },
  lg: { padding: '13px 28px', fontSize: 15 },
}

const VARIANTS = {
  primary: { background: 'var(--primary)',                               color: '#fff', boxShadow: '0 2px 8px rgba(22,163,74,0.3)' },
  outline: { background: 'transparent',                                  color: 'var(--primary)', border: '1.5px solid var(--primary)' },
  ghost:   { background: 'transparent',                                  color: 'var(--text2)',   border: '1px solid var(--border)' },
  success: { background: 'var(--success)',                               color: '#fff' },
  dark:    { background: '#333',                                         color: '#fff' },
  green:   { background: 'linear-gradient(135deg, #22c55e, var(--primary))', color: '#fff', boxShadow: '0 2px 10px rgba(22,163,74,0.35)' },
}

export default function Btn({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  style: customStyle,
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    border: 'none',
    borderRadius: 8,
    fontFamily: 'var(--font)',
    fontWeight: 700,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s',
    letterSpacing: '0.01em',
    opacity: disabled ? 0.6 : 1,
    width: full ? '100%' : 'auto',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-scale"
      style={{ ...base, ...SIZES[size], ...VARIANTS[variant], ...customStyle }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.filter = 'brightness(1.08)' }}
      onMouseLeave={e => { e.currentTarget.style.filter = '' }}
    >
      {children}
    </button>
  )
}
