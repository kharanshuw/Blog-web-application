import React from 'react';
import { useState } from 'react';
import { Link, matchPath } from 'react-router-dom';
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
                //Fetches the current user's data.
                const userData = await authService.getCurrenctUser();

                if (userData) {
                    //Dispatches an action to update the application state with the user's data.
                    dispatch(authLogin(userData));
                    //Navigates to the home page upon successful login.
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
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%'></Logo>
                    </span>
                </div>


                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;


                    <Link
                        to='/signup'
                        className="font-medium text-primary transition-all duration-200 hover:underline">


                        Sign Up
                    </Link>
                </p>



                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}





                <form onSubmit={handleSubmit(login)}>


                    <div className='space-y-5'>


                        <Input
                            label="Email :"
                            placeholder="Enter your email"
                            type="email"
                            {
                            ...register("email", {
                                required: true,
                                pattern: /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/i
                            })
                            }


                        />




                        <Input
                            label="Password : "
                            type="password"
                            placeholder="enter your password"
                            {
                            ...register("password", {
                                required: true,
                            })
                            }
                        />





                        <Button
                            type='submit'
                            className='w-full'>
                            Sign in
                        </Button>








                    </div>

                </form>



            </div>











        </div>
    )
}

export default Login