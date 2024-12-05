import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import logo from "./components/logo.png";
import { FaHome, FaUserAlt, FaShoppingCart, FaBars, FaTimes, FaTrophy } from "react-icons/fa"; // Font Awesome icons

function Navbar() {
  const navigate = useNavigate();
  const { authenticate } = useOkto();
  const [authToken, setAuthToken] = useState(null); // Track authentication token state
  const [googleLoginLoaded, setGoogleLoginLoaded] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false); // State to control side menu visibility

  useEffect(() => {
    // Check if the user is already authenticated (localStorage or cookie check)
    const token = localStorage.getItem("auth_token");
    if (token) {
      setAuthToken(token);
    } else {
      setGoogleLoginLoaded(true);
    }
  }, []);

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
        localStorage.setItem("auth_token", authResponse.auth_token); // Store token
        navigate("/home");
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setAuthToken(null);
    navigate("/");
  };

  // Toggle side menu visibility
  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  return (
    <nav className="p-4 flex justify-between items-center">

      {/* Logo Section */}
      <div>
        <img
          src={logo}
          alt="Logo"
          style={{ width: '150px', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        {authToken && (
          <div className="flex items-center space-x-4 text-white">
            <button onClick={() => navigate("/home")} className="flex items-center space-x-3 hover:text-lavender">
              <FaHome /> <h3>Home</h3>
            </button>
            <button onClick={() => navigate("/chat")} className="flex items-center space-x-3 hover:text-lavender">
              <FaUserAlt /> <h3>Chat</h3>
            </button>
            <button onClick={() => navigate("/market")} className="flex items-center space-x-3 hover:text-lavender">
              <FaShoppingCart /> <h3>Market</h3>
            </button>
            {/* Arena Section */}
            <button onClick={() => navigate("/arena")} className="flex items-center space-x-3 hover:text-lavender">
              <FaTrophy /> <h3>Arena</h3>
            </button>
            <button onClick={handleLogout} className="py-2 px-6 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300">
              Logout
            </button>
          </div>
        )}

        {!authToken && googleLoginLoaded && (
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={(error) => console.log("Login Failed", error)}
            useOneTap
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="py-2 px-6 bg-lavender text-white rounded-lg shadow-lg hover:bg-darkPurple transition duration-300 focus:outline-none focus:ring-2 focus:ring-lavender"
              >
                Login with Google
              </button>
            )}
          />
        )}
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleSideMenu}>
          {sideMenuOpen ? <FaTimes size={24} color="white" /> : <FaBars size={24} color="white" />}
        </button>
      </div>

      {/* Mobile Side Menu */}
      {sideMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden flex justify-end">
          <div className="w-2/5 bg-deepPurple text-white p-6">
            <div className="flex justify-between items-center mb-6">
              <img
                src={logo}
                alt="Logo"
                style={{ width: '120px', height: 'auto', borderRadius: '10px' }}
              />
              <button onClick={toggleSideMenu} className="text-white">
                <FaTimes size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {authToken && (
                <>
                  <button onClick={() => navigate("/home")} className="flex items-center space-x-3 hover:text-lavender">
                    <FaHome /> <h3>Home</h3>
                  </button>
                  <button onClick={() => navigate("/profile")} className="flex items-center space-x-3 hover:text-lavender">
                    <FaUserAlt /> <h3>Profile</h3>
                  </button>
                  <button onClick={() => navigate("/market")} className="flex items-center space-x-3 hover:text-lavender">
                    <FaShoppingCart /> <h3>Market</h3>
                  </button>
                  {/* Arena Section in mobile menu */}
                  <button onClick={() => navigate("/arena")} className="flex items-center space-x-3 hover:text-lavender">
                    <FaTrophy /> <h3>Arena</h3>
                  </button>
                  <button onClick={handleLogout} className="py-2 px-6 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300">
                    Logout
                  </button>
                </>
              )}
              {!authToken && googleLoginLoaded && (
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={(error) => console.log("Login Failed", error)}
                  useOneTap
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="py-2 px-6 bg-lavender text-white rounded-lg shadow-lg hover:bg-darkPurple transition duration-300 focus:outline-none focus:ring-2 focus:ring-lavender"
                    >
                      Login with Google
                    </button>
                  )}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
