import React from 'react'
import { forwardRef } from 'react';
import { useId } from 'react';

const Input = forwardRef(

    (props,ref) =>  {

       let id = useId();
        return (
            <div className='w-full'>
                {
                    props.label &&  <label className='inline-block mb-1 pl-1' htmlFor={id}>
                        {props.label}
                    </label>
                }

                <input type={props.type} className={`${props.className} `} ref={ref}  id={id}  {...props}/>
            </div>
        )
    }
);

export default Input;