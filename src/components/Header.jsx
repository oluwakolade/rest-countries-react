import React from 'react'

const Header = ({dark, setDark}) => {
  return (
    <div className="px-8 py-4 md:px-12 md:py-6 drop-shadow-md bg-elements flex flex-row justify-between">
        <h1 className='text-base font-extrabold'>Where in the world ?</h1>
        <button onClick={setDark} className='flex flex-row items-center gap-4 cursor-pointer'>
            <span>
              {!dark ?  <img src="/moon-outline.svg" alt="moon icon" className='w-4' /> : <img src="/sun.svg" alt="sun icon" className='w-4'/> }
            </span>
            <span className='text-sm font-semibold'>{!dark ? 'Dark Mode' : 'Light Mode' }</span>
        </button>
    </div>
  )
}

export default Header