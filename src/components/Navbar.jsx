import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSignOut, isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSignOutConfirmModal, setShowSignOutConfirmModal] = useState(false);

    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    }

    const handleSignOutClick = () => {
        setShowSignOutConfirmModal(true);
    }

    const handleConfirmSignOut = (confirm) => {
        if (confirm) {
            onSignOut();
        }
        setShowSignOutConfirmModal(false);
    };

    return (
      <div className={`fixed top-0 right-0 h-16 bg-white border-b border-yellow-100 transition-all duration-300 z-40
        ${isOpen ? 'left-64' : 'left-16'}`}>
        <div className="flex justify-end items-center h-full px-4">
          <div className="flex items-center space-x-4">
            <div className="relative" ref={notificationRef}>
              <button 
                className="p-2 text-yellow-600 hover:text-yellow-800 focus:outline-none"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-yellow-100">
                  <div className="px-4 py-2 text-sm text-yellow-900">
                    <div className="py-1 hover:bg-yellow-50">A new Job was posted</div>
                    <div className="py-1 hover:bg-yellow-50">You have an unread message</div>
                    <div className="py-1 hover:bg-yellow-50">Three new applications were submitted</div>
                  </div>
                </div>
              )}
            </div>
  
            <div className="relative" ref={profileRef}>
              <button 
                className="p-2 text-yellow-600 hover:text-yellow-800 focus:outline-none"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                👤
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-yellow-100">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-yellow-900 hover:bg-yellow-50">
                    View Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-yellow-900 hover:bg-yellow-50">
                    Settings
                  </Link>
                  <Link to="/help" className="block px-4 py-2 text-sm text-yellow-900 hover:bg-yellow-50">
                    Help
                  </Link>
                  <button 
                    onClick={handleSignOutClick}
                    className="block w-full text-left px-4 py-2 text-sm text-yellow-900 hover:bg-yellow-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
  
        {showSignOutConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto border border-yellow-100">
              <h3 className="text-lg font-medium text-yellow-900 mb-4">Sign out</h3>
              <p className="text-sm text-yellow-700 mb-4">Are you sure you want to sign out?</p>
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => handleConfirmSignOut(false)}
                  className="px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleConfirmSignOut(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default Navbar;