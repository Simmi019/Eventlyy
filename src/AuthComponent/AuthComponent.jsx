  
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/authStore"
import { signOut } from "firebase/auth"
import { auth } from "../firebaseConfig"

const AuthComponent = () => {
  const { user, isAuthenticated, logout, init } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    init()
  }, [init])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      logout()
      localStorage.setItem("isAuthenticated", "false")
      navigate("/")
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <div className="p-4">
      {isAuthenticated ? (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold mb-4">Welcome, {user?.email || "User"}</h1>
          <button
            onClick={handleLogout}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold mb-4">Please log in</h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthComponent

