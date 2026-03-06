import { createContext, useContext, useReducer } from 'react'

const CartCtx = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.item.id)
      if (exists) {
        return state.map(i =>
          i.id === action.item.id
            ? { ...i, qty: Math.min(i.qty + 1, action.item.stock) }
            : i
        )
      }
      return [...state, { ...action.item, qty: 1, checked: true }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'UPDATE_QTY':
      return state.map(i =>
        i.id === action.id
          ? { ...i, qty: Math.max(1, Math.min(action.qty, i.stock)) }
          : i
      )
    case 'TOGGLE_CHECK':
      return state.map(i =>
        i.id === action.id ? { ...i, checked: !i.checked } : i
      )
    case 'CHECK_ALL':
      return state.map(i => ({ ...i, checked: action.checked }))
    case 'CLEAR_CHECKED':
      return state.filter(i => !i.checked)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])

  return (
    <CartCtx.Provider value={{ cart, dispatch }}>
      {children}
    </CartCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartCtx)
