import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Input, Button, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import authService from '../auth_service/auth.js';
import { useForm } from 'react-hook-form';

/**
 * The Login component is a React component used to handle user login functionality.
 * It interacts with a backend service to authenticate users, fetch their data, and update the application state
 */
function Login() {

    //Used to navigate to different routes.
    const navigation = useNavigate();

    //Used to dispatch actions to the Redux store.
    const dispatch = useDispatch();

    //Functions from react-hook-form to handle form registration and submission.
    const { register, handleSubmit } = useForm();

    //State to store any error messages.
    const [error, setError] = useState(null);

/**
 * An asynchronous function that handles the login process.
 * @param {*} data Contains user input data from the form.
 */
    const login = async (data) => {
    //    Resets any previous error messages.
        setError("");
        try {

            /**
             * Calls the login function from the authentication service.
             */
            const session = await authService.login(data);

            /**
             * Checks if the login was successful.
             */
            if (session) {
                const userData = await authService.getCurrenctUser();

                if (userData) {
                    dispatch(authLogin(userData));
                    navigation("/");
                }
                else {
                    console.log("error occured in fetching current user");
                }

            }

        } catch (error) {
            console.log("error in login method ", error);
            setError(error);
        }
    }


    return (
        <div>Login</div>
    )
}

export default Login