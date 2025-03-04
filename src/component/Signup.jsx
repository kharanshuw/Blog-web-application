import React from 'react'
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../auth_service/auth.js';
import { login } from '../store/authSlice.js';


function Signup() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const handlesignup = async (data) => {
        setError("");
        try {
            const newuserdata = await authService.createAccount(data);
            if(newuserdata)
            {
                console.log("new user created successfully");
                console.log(newuserdata);
                
                const currentuser = await authService.getCurrenctUser();
                if(currentuser)
                {
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
        <div>Signup</div>
    )
}

export default Signup