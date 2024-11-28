import React from 'react'

function Btn({text, onClick, isLoading, disabled}) {
  return (
    <button onClick={onClick} className='bg-blue-500 text-white px-3 py-1 rounded-md disabled:bg-gray-600' disabled={disabled}>
        {
            isLoading ? 'Loading...' : text
        }
    </button>
  )
}

export default Btn