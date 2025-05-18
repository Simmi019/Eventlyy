import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const Logout = () => {
    logout();
    navigate("/");
  };

  const dashboardItems = [
    {
      title: "Budget Planner",
      description: "Manage your financial budget effectively",
      icon: "💰",
      route: "/BudgetPlanner",
      bgColor: "bg-teal-100",
      textColor: "text-teal-800",
    },
    {
      title: "Expense Tracker",
      description: "Track and analyze your daily expenses",
      icon: "📊",
      route: "/ExpenseTracker",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-800",
    },
    {
      title: "Vendor Directory",
      description: "Find and manage event vendors",
      icon: "🤝",
      route: "/Vendors",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
    },
    {
      title: "Savings Goals",
      description: "Set and achieve your savings goals", 
      icon: "🎯",
      route: "/SavingsGoals",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      title: "Financial Reports",
      description: "Generate comprehensive financial reports",
      icon: "📈",
      route: "/Reports",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center border-b pb-6 mb-10 p-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Hello, <span className="font-semibold">{user?.name}</span>! Manage everything from one place!
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardItems.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.route)}
              className={`cursor-pointer ${item.bgColor} ${item.textColor} 
                p-6 rounded-2xl shadow-md hover:shadow-xl transition-all 
                hover:scale-[1.03] transform duration-300`}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-md">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
