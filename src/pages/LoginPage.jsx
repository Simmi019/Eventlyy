// import React, { useState } from 'react';
// import { useNavigate, NavLink } from 'react-router-dom'; // Corrected imports

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Corrected for React Router v6

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Mock authentication logic
//     if (email && password) {
//       console.log('Logged in:', { email, password });
//       navigate('/dashboard'); // Redirect to dashboard after login
//     } else {
//       setError('Please enter both email and password.');
//     }
//   };

//   return (
//     <section id="login" className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
//       <div className="bg-white p-8 shadow-md rounded-lg max-w-sm w-full">
//         <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Login</h2>
        
//         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white font-medium py-2 rounded-md hover:bg-purple-700 transition duration-300"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-4">
//           Don't have an account?{' '}
//           <NavLink to="/signup" className="text-purple-600 hover:underline">
//             Sign Up
//           </NavLink>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default LoginPage;
// Login.js
import { useState } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebaseConfig"
import useAuthStore from "../store/authStore"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user data in Zustand
      login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // other user data you need
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    }
  };

  return (
    <section id="login" className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 shadow-md rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-medium py-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-purple-600 hover:underline">
            Sign Up
          </NavLink>
        </p>

      </div>
    </section>
  )
}

export default LoginPage;