import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import logo from "./components/logo.png"; // Assuming you have the logo image
import leftImage from "./components/loginimg.webp"; // Assuming you have the left image

function LoginPage() {
  console.log("LoginPage component rendered");
  const navigate = useNavigate();
  const { authenticate } = useOkto();
  const [authToken, setAuthToken] = useState(null); // Track authentication token state
  const [googleLoginLoaded, setGoogleLoginLoaded] = useState(false);

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
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("google idtoken: ", idToken);
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("Authentication check: ", authResponse);
        setAuthToken(authResponse.auth_token);
        localStorage.setItem("auth_token", authResponse.auth_token); // Store token to keep user logged in
        console.log("auth token received", authResponse.auth_token);
        navigate("/home");
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  return (
    // Outer div with a static grey background and Poppins font
    <div className=" bg-blur mx-auto flex items-center justify-center font-poppins">
      {/* Flex container for image and form */}
      <div className="flex  mx-auto mt-32 mb-9 max-w-4xl p-0 rounded-lg shadow-xl hover:shadow-b-2xl hover:shadow-deepPurple transition-shadow duration-300 ease-in-out">


        {/* Left side - Image */}
        <div className="hidden md:flex w-1/2 md:w-1/2 mt-6 md:mt-0 justify-center items-center border-spacing-3">
          <img src={leftImage} alt="MagicChain Logo" className="w-full h-full object-cover rounded-l-lg" />
        </div>

        {/* Right side - Login form */}
        <div className="bg-darkPurple p-8 rounded-r-lg shadow-xl w-full md:w-1/2 flex flex-col justify-between h-full mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="MagicChain Logo" className="h-12 mb-4" />
          </div>
          
          {/* Login Form Title */}
          <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
          <div className="mx-auto">
          {/* Google Login Button Styled with Tailwind */}
          {!authToken && googleLoginLoaded ? (
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={(error) => {
                console.log("Login Failed", error);
              }}
              useOneTap
              promptMomentNotification={(notification) =>
                console.log("Prompt moment notification:", notification)
              }
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="w-full mx-auto bg-lavender text-white rounded-lg shadow-lg hover:bg-darkPurple transition duration-300 focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-opacity-50 text-lg font-semibold"
                >
                  Login with Google
                </button>
              )}
            />
          
          ) : (
            <div className="text-white text-center">
              <p className="text-lg">Authenticated! Welcome back.</p>
              <button
                onClick={() => navigate("/home")}
                className="mt-4 py-2 px-6 bg-lavender text-white rounded-lg shadow-lg hover:bg-darkPurple transition duration-300"
              >
                Go to Home
              </button>
              
            </div>
            
          )}
          </div>

          {/* Forgot Password Link */}
          <div className="mt-6">
            <a
              href="#"
              className="text-lavender text-sm hover:underline block text-center"
            >
              Forgot Password?
            </a>
          </div>

          {/* Footer with Terms of Service and Privacy Policy */}
          <div className="mt-8 text-center text-sm text-lavender">
            <a href="#" className="hover:underline mr-4">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
