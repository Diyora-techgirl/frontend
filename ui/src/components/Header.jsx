import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function Header() {
  const { authState, logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
  };

  return (
    <header className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/home" className="text-white text-xl font-bold">MyShop</Link>
        </div>
        <nav className="space-x-4">
          <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/category" className="text-white hover:text-gray-300">Category</Link>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
        </nav>
        <div>
          {authState.token ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
