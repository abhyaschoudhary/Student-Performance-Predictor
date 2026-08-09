import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { clearSession, getToken, login as loginRequest, TOKEN_KEY, USER_KEY } from '../services/api'

const AuthContext = createContext(null)

function savedUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) } catch { return null }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken)
  const [user, setUser] = useState(savedUser)

  const logout = () => {
    clearSession()
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    window.addEventListener('edupredict:unauthorized', logout)
    return () => window.removeEventListener('edupredict:unauthorized', logout)
  }, [])

  const login = async (credentials) => {
    const result = await loginRequest(credentials)
    const nextUser = { email: credentials.email }
    localStorage.setItem(TOKEN_KEY, result.access_token)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    setToken(result.access_token)
    setUser(nextUser)
    return result
  }

  const value = useMemo(() => ({ isAuthenticated: Boolean(token), user, login, logout }), [token, user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
