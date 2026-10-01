/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react"
import { getCurrentUser, loginUser, registerUser } from "../lib/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const verifyAuth = async () => {
      const storedToken = localStorage.getItem("token")
      if (!storedToken) {
        if (isMounted) setLoading(false)
        return
      }

      try {
        const userData = await getCurrentUser(storedToken)
        if (isMounted) {
          setUser(userData)
          setToken(storedToken)
        }
      } catch {
        // Token invalid or expired
        localStorage.removeItem("token")
        if (isMounted) {
          setUser(null)
          setToken(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    verifyAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const login = async (credentials) => {
    const data = await loginUser(credentials)
    if (data.token) {
      localStorage.setItem("token", data.token)
      setToken(data.token)
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      })
    }
    return data
  }

  const register = async (userData) => {
    const data = await registerUser(userData)
    if (data.token) {
      localStorage.setItem("token", data.token)
      setToken(data.token)
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      })
    }
    return data
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
