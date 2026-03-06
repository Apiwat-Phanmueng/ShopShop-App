import { createContext, useContext, useState } from 'react'
import { INITIAL_ORDERS } from '../data/mockData'
import { useCart } from './CartContext'

const OrderCtx = createContext(null)

export function OrderProvider({ children }) {
  const { cart, dispatch: cartDispatch } = useCart()
  const [orders, setOrders] = useState(INITIAL_ORDERS)

  const placeOrder = (paymentMethod) => {
    const checkedItems = cart.filter(i => i.checked !== false)
    const total = checkedItems.reduce((s, i) => s + i.price * i.qty, 0)

    const order = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      items: checkedItems.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      total,
      status: 'pending',
      payment: paymentMethod,
    }

    setOrders(prev => [order, ...prev])
    cartDispatch({ type: 'CLEAR' })
    return order
  }

  return (
    <OrderCtx.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrders = () => useContext(OrderCtx)
