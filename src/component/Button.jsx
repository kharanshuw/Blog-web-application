import React from 'react'

function Button(
    {
        btnText,
        type ="button",
        bgColor = 'bg-blue-600',
        textColor = 'text-white',
        className = '',
        ...props 
    }
) {


  
  return (
    <button   className={`${className} ${bgColor} ${textColor} px-4 py-2 rounded-lg`  } {...props}  type={`${type}`}>
        {btnText}
    </button>
  )
}

export default Button