
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebaseConfig"
import useAuthStore from "./store/authStore"

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, init } = useAuthStore()

  useEffect(() => {
    // Initialize the auth state
    init()

    const unsubscribe = onAuthStateChanged(auth, () => {
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [init])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute


