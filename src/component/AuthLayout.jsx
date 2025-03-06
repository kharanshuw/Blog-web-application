import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function AuthLayout({ children, authentication = true }) {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(true); //initializes the loader state to true.

    const authStatus = useSelector(state => state.auth.status);  //accesses the authStatus from the Redux state.

    /**
     * hook runs whenever authStatus, navigate, or authentication changes.
     */
    useEffect(

        /**
         * It checks the authentication prop and authStatus to determine if the user should be redirected:
         */
        () => {

            /**
             * If authentication is true and authStatus does not match, it navigates to the login page "/login".
             * in simple words if authstatus of redux store is false means user is not logged in so we have to redirect him to login page
             */
            if (authentication && authStatus !== authentication) {
                navigate("/login");
            }

            /**
             * If authentication is false and authStatus does not match, it navigates to the home page "/".
             * in simple words if authstatus of redux store is true then we have to redirect user to home page 
             */
            else if (!authentication && authStatus !== authentication) {
                navigate("/")
            }
            setLoader(false)
        }, [authStatus, navigate, authentication]
    )

    return (
        loader ? <h1>Loading ... </h1> : <>{children}</>
    )
}

export default AuthLayout