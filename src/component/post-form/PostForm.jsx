import React from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index.js'
import databaseservice from '../../auth_service/database_config.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm() {

    const {register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: { 
                title:'',
               }
        } 
     )


    return (
        <div>

        </div>
    )
}

export default PostForm