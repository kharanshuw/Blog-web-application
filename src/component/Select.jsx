import React from 'react'
import { forwardRef } from 'react';
import { useId } from 'react';

/**
 * The Select component is a reusable dropdown menu that displays a list of options. 
 * It accepts options, a label, and additional styling through props
 */
const Select = forwardRef(   //Defines the Select component using forwardRef, which allows the component to forward its ref to a child component.
    (props, ref) => {

        //Generates a unique ID for the <select> element to associate it with the <label>.
        const selectid = useId();

        return (
            <div className='w-full'>
                {/* Checks if props.label exists and renders a <label> with the text from props.label. 
                It also associates the <label> with the <select> element using the generated ID. */}
                {
                    props.label && <label htmlFor={selectid}   >

                    </label>
                }


                <select id={selectid} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${props.className}`} >


                    {
                        props.options ? props.options.map(
                            (option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            )
                        ) : null
                    }

                </select>
            </div>
        );
    }
);

export default Select