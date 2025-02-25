import React from 'react'

const BotonComponent = ({ onClick, text }) => {
    return <button type="button" onClick={onClick} className="w-[100px] rounded bg-sky-500  hover:bg-sky-900 px-4 py-2 ">
        {text}
    </button>
}

export default BotonComponent
