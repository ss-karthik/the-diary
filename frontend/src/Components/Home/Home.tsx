import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col items-center gap-5'>
      <h1 className='text-4xl'>The Diary</h1>
      <h1 className='text-2xl'>A no-nonsense digital diary that stores your tasks, thoughts, and activities.</h1>
      <div className='flex flex-wrap justify-center items-center gap-5'>
        <button className='text-xl rounded-lg bg-gruvbox-red text-gruvbox-mid-d cursor-pointer p-2'>Sign Up</button>
        <button className='text-xl rounded-lg bg-gruvbox-blue text-gruvbox-mid-d cursor-pointer p-2'>Log In</button>

      </div>
    </div>
  )
}

export default Home