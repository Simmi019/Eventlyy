import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import Events from "./components/Events/Event";
import About from "./components/About/About";
import Pricing from "./components/Pricing/pricing";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import BudgetPlanner from "./components/BudgetPlanner/BudgetPlanner";
import Dashboard from "./Dashboard/Dashboard";
import Vendor from "./components/VendorDirectory/Vendor";
import ProtectedRoute from "./ProtectedRoute";
import useAuthStore from "./store/authStore";
import LoadingSpinner from "./components/LoadingSpinner"; // Create this component

const App = () => {
  const { init } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await init();
      } catch (error) {
        console.error("Authentication initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, [init]);

  if (isLoading) {
    return <LoadingSpinner />; // Show loading state while initializing
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route
          path="/budgetplanner"
          element={
            <ProtectedRoute>
              <BudgetPlanner />
            </ProtectedRoute>
          }
        />
        <Route path="/vendors" element={<Vendor />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1 className="text-center text-2xl mt-10">404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;