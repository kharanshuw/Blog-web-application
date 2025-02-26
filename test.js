import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/authSlice'; // Adjust path to your authSlice
import authService from './auth'; // Assuming auth.js is in the same directory
import Footer from './components/Footer'; // Import the Footer component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function App() {
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null); // New state for auth error
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to redirect

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userdata = await authService.getCurrenctUser();

        if (userdata) {
          console.log("current user exist", userdata);
          dispatch(login({ userdata }));
        } else {
          console.log("No user is logged in.");
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error in useEffect of getCurrenctUser", error);
        setAuthError(error.message || 'An authentication error occurred.'); // Set error state

        //Consider to show an error or prompt if the user wants to be redirected
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  // useEffect to handle redirection based on authError
  useEffect(() => {
    if (authError) {
      console.log("Redirecting to login page due to authentication error.");
      navigate('/login'); // Redirect to login page
    }
  }, [authError, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return (
    <div>
      {/* Your app content here */}
      <p>App Content</p>
      <Footer />
    </div>
  );
}

export default App;