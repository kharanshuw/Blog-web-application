import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../auth_service/auth.js';
import { logout } from '../../store/authSlice.js';


function LogoutBtn() {

  let dispatch = useDispatch();


  /**
   * The logoutHandler function is designed to handle the user logout process.
   * It calls the authService.logout() method to invalidate the user's session and dispatches a Redux action (logout()) 
   * to update the application's state.
   */
  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    }
    catch (error) {
      console.log("error occured inside logoutHandler :", error);

    }
  }



  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn