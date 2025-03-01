import React from 'react'
import { forwardRef } from 'react';
import { useId } from 'react';

const Select = forwardRef(
    (props, ref) => {
        const selectid = useId();

        let optionLength = Object.keys(props.options).length;


        return (
            <div className='w-full'>
                {
                    props.label && <label htmlFor={selectid}   >

                    </label>
                }


                <select id={selectid} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${props.className}`} >

                    {
                        optionLength > 0 ? props.options.map(
                            (option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )
                            
                        ) : <option disabled>no option available</option>
                    }
                    
                </select>
            </div>
        );
    }
);

export default Select