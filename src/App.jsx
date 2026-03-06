import { useState, useEffect } from 'react'

// ── Providers
import { AuthProvider }  from './contexts/AuthContext'
import { CartProvider }  from './contexts/CartContext'
import { OrderProvider } from './contexts/OrderContext'
import { NavProvider, useNav } from './contexts/NavContext'

// ── Layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// ── Pages
import LoginPage             from './pages/LoginPage'
import HomePage              from './pages/HomePage'
import ProductPage           from './pages/ProductPage'
import CartPage              from './pages/CartPage'
import CheckoutPage          from './pages/CheckoutPage'
import AdminPanel            from './pages/AdminPanel'
import { OrderSuccessPage, OrdersPage, ProfilePage } from './pages/OrdersAndProfile'

// ─────────────────────────────────────────────────────────────────────────────
// App Shell — reads from NavContext
// ─────────────────────────────────────────────────────────────────────────────
function AppShell() {
  const { page, pageData } = useNav()
  const [search, setSearch] = useState('')

  // Reset search when navigating away from home
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (page !== 'home') setSearch('')
  }, [page])

  const noLayout = ['login', 'register'].includes(page)

  const renderPage = () => {
    switch (page) {
      case 'login':         return <LoginPage />
      case 'home':          return <HomePage search={search} />
      case 'product':       return <ProductPage product={pageData} />
      case 'cart':          return <CartPage />
      case 'checkout':      return <CheckoutPage />
      case 'order_success': return <OrderSuccessPage order={pageData} />
      case 'orders':        return <OrdersPage />
      case 'admin':         return <AdminPanel />
      case 'profile':       return <ProfilePage />
      default:              return <HomePage search={search} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!noLayout && <Header search={search} setSearch={setSearch} />}
      <main style={{ flex: 1, paddingBottom: 20 }}>
        {renderPage()}
      </main>
      {!noLayout && <Footer />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Root App — wraps all providers
// Note: OrderProvider must be inside CartProvider (depends on cart state)
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavProvider>
          <OrderProvider>
            <AppShell />
          </OrderProvider>
        </NavProvider>
      </CartProvider>
    </AuthProvider>
  )
}
