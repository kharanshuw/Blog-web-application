import React, { useEffect, useState } from 'react';
import './index.css';
import { useDispatch } from 'react-redux';
import authService from './auth_service/auth';
import { login, logout } from "./store/authSlice.js"
import { Outlet } from 'react-router-dom';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx'


function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();


  /**
   * This hook checks if a user is currently logged in and updates the application state accordingly.
   */
  useEffect(
    () => {


      /**
       * What checkAuth does:

      It calls the getCurrenctUser method of authService, which is an async function that returns a promise.
      If the promise resolves successfully, it checks if a user object (userdata) is returned.
      If a user object is present, it logs a message to the console and dispatches a login action with the user data using the dispatch function from Redux.
      If no user object is present, it logs a message to the console and dispatches a logout action using the dispatch function from Redux.
      If the promise rejects (i.e., an error occurs), it catches the error and logs it to the console.
      Finally, regardless of the outcome, it sets the loading state to false using the setLoading function
       */
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

        } finally {
          setLoading(false);
        }
      };

      checkAuth(); // Call the async function

      [dispatch]
    }
  )



  return (
    !loading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>

          <Header />

          <main>
            todo  <Outlet>

            </Outlet>
          </main>


          <Footer />

        </div>
      </div>
    ) : null
  )


}

export default App;
