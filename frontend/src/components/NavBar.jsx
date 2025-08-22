import React, { useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/slice/authSlice.js';
import { logoutUser, getCurrentUser } from '../api/user.api.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userName = user?.name || user?.email || 'User';

  useEffect(() => {
    const syncUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data?.user) {
          dispatch(login(data.user));
        }
      } catch (e) {
        // not logged in or error; ignore
      }
    };
    if (!isAuthenticated) {
      syncUser();
    }
  }, [dispatch, isAuthenticated]);

  const onLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // ignore API error; still clear local auth state
    }
    dispatch(logout());
    navigate({ to: '/' });
  };

  return (
    <nav className="bg-white border border-b-black">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              URL Shortener
            </Link>
          </div>
          
          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {(isAuthenticated) ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {userName}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;