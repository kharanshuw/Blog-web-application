import React from 'react'
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../auth_service/auth.js';
import { login } from '../store/authSlice.js';
import Logo from './Logo.jsx';
import { Link } from 'react-router-dom';
import { Input, Button } from './index.js';


function Signup() {

    const navigate = useNavigate();

    /**
     * initializes the error state. 
     * */
    const [error, setError] = useState(null);


    /**
     * dispatch function to send actions to the Redux store.
     */
    const dispatch = useDispatch();


    /**
     * sets up form handling, providing register and handleSubmit functions.
     */
    const { register, handleSubmit } = useForm();


    /**
     * is an async function that handles the signup process.
     * @param {*} data 
     */
    const handlesignup = async (data) => {
        setError("");
        try {

            /**
             * called to create a new user account with the provided form data.
             */
            const newuserdata = await authService.createAccount(data);


            /**
             * If successful, it logs the new user data and retrieves the current user using
             */
            if (newuserdata) {
                console.log("new user created successfully");
                console.log(newuserdata);

                const currentuser = await authService.getCurrenctUser();

                /**
                 * If the current user is successfully retrieved, the login action is dispatched to update the Redux store.
                 */
                if (currentuser) {
                    dispatch(login(currentuser));
                }
                navigate("/");
            }
        }
        catch (error) {
            console.log("error occured in handlesignup", error);
            setError(error);
        }
    }


    return (

        // A centered div for layout
        <div className="flex items-center justify-center" >

            {/* div containing the form elements with styling */}
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>



                <div className="mb-2 flex justify-center">
                    <span className='inline-block w-full max-w-[100px]'>
                        {/* The Logo component is displayed at the top */}
                        <Logo width='100%' />
                    </span>
                </div>



                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>



                {/**link to the login page for existing users */}
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>

                </p>





                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}



                {/**The signup form with inputs for "name", "email", and "password" */}
                <form onSubmit={handleSubmit(handlesignup)}>

                    <div className='space-y-5'>
                        <Input
                            label="full name :"
                            placeholder="enter your name "
                            {
                            ...register("name", {
                                required: true,
                            })
                            }
                        />


                        <Input
                            label="email : "
                            placeholder="enter your email"
                            type="email"
                            {
                            ...register("email", {
                                required: true,
                                pattern: /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/i
                            })
                            }
                        />


                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        {/**
 * A Button component to submit the form
 */}
                        <Button type='submit' className='w-full'>
                            Create Account
                        </Button>




                    </div>



                </form>

            </div>


        </div>
    )
}

export default Signup