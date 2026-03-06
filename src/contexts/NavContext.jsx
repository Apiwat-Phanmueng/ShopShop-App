import { createContext, useContext, useState, useCallback } from 'react'

const NavCtx = createContext(null)

export function NavProvider({ children }) {
  const [page, setPage] = useState('home')
  const [pageData, setPageData] = useState(null)

  const nav = useCallback((p, data = null) => {
    setPage(p)
    setPageData(data)
    window.scrollTo(0, 0)
  }, [])

  return (
    <NavCtx.Provider value={{ page, pageData, nav }}>
      {children}
    </NavCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNav = () => useContext(NavCtx)
