import React, { useEffect, useState } from 'react';
import './index.css';
import { useDispatch } from 'react-redux';
import authService from './auth_service/auth';
import { login, logout } from "./store/authSlice.js"
import { Outlet } from 'react-router-dom';


function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(
    () => {
      authService.getCurrenctUser().then(
        (userdata) => {

          if (userdata) {
            console.log("current user exist", userdata);
            dispatch(login({ userdata }));
          }
          else {
            dispatch(logout());
          }

        }
      ).catch()
        .finally(() => {
          setLoading(false);
        })
    },

    []
  )


  return (
    !loading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>

        <Headers />

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
