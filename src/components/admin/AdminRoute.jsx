import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function AdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0E0E0D] text-[#F4EFE7]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#B96843] border-t-transparent" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#9C978F]">
            Verifying Privileges...
          </p>
        </div>
      </div>
    )
  }

  // Not logged in -> redirect to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Logged in, but not an admin -> redirect to home
  if (user.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
