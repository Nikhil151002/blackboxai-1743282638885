import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { FaHome, FaCompass, FaPlusSquare, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed bottom-0 md:top-0 left-0 right-0 bg-white border-t md:border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-around w-full">
            <Link to="/" className="p-3 text-gray-700 hover:text-indigo-600">
              <FaHome size={20} />
            </Link>
            <button className="p-3 text-gray-700 hover:text-indigo-600">
              <FaCompass size={20} />
            </button>
            <Link to="/create" className="p-3 text-gray-700 hover:text-indigo-600">
              <FaPlusSquare size={20} />
            </Link>
            <button className="p-3 text-gray-700 hover:text-indigo-600">
              <FaHeart size={20} />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-3 text-gray-700 hover:text-indigo-600"
              >
                <FaUser size={20} />
              </button>
              
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <Link
                    to={`/profile/${user?.username}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              SocialApp
            </Link>
            
            <div className="flex-1 flex justify-center space-x-6">
              <Link to="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600">
                <FaHome className="mr-2" />
                Home
              </Link>
              <Link to="/explore" className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600">
                <FaCompass className="mr-2" />
                Explore
              </Link>
              <Link to="/create" className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600">
                <FaPlusSquare className="mr-2" />
                Create
              </Link>
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-700 hover:text-indigo-600 relative">
                  <FaHeart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img 
                      src={user.profilePicture || '/default-avatar.png'} 
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden lg:inline text-gray-700">{user.username}</span>
                  </button>
                  
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                      <Link
                        to={`/profile/${user.username}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-600">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}