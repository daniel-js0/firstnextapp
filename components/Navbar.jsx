"use client";
import { Ruda } from 'next/font/google'
import { useState } from 'react';
// import axios from 'axios'


const rubik = Ruda({ subsets: ['latin'] })
// getStoredData, 
export default function Navbar({setSidebar, sidebar,  handleTitleChange, title, handleSave}) {



 


function handleToggle(e){
  e.preventDefault();
   setSidebar(!sidebar);
   
}
  return (
    <div className={rubik.className}>
    <nav className={`flex w-[100%] fixed top-0 justify-between md:h-20 h-16 bg-zinc-800`}>

        <div className='flex '>
            {!sidebar && <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"  viewBox="0 0 16 16"
            className="text-gray-200 md:ml-3 ml-1 md:mt-4 mt-3 h-9 w-8 md:w-12 md:h-10 hover:bg-rose-500 cursor-pointer"
            onClick={handleToggle}>
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>}

            {sidebar && 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
             className="text-white md:mt-5 mt-[5.5%] md:w-12 md:h-10 h-6 w-6 max-[600px]:ml-48 max-[400px]:ml-44 md:ml-64 lg:ml-60
              hover:bg-rose-500 cursor-pointer max-[281px]:ml-36 max-[281px]:mt-5" viewBox="0 0 16 16" onClick={handleToggle}>
           <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
           </svg>}

            <h2 className={`text-xl ml-4 font-semibold tracking-widest text-slate-300 lg:flex hidden leading-tight ${sidebar ? 'mt-7': 'mt-[6.2%]'}`}>NOTEPAD</h2>

            <div className='w-[0.02rem] h-12 bg-gray-400 ml-4 mt-3 md:flex hidden '></div>

            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 16 16"
            className={`md:ml-4 ml-1 md:h-6 md:w-6 w-5 h-5 text-white max-[281px]:mt-5 ${sidebar ? 'mt-6':'md:mt-[6.2%] mt-[8%]'}`}>
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
            </svg>
            <div className='flex flex-col ml-2  md:mt-4 mt-6'>
            <p className='text-gray-600 font-bold md:flex hidden ml-2' >Document Name</p>
                <input
                  required 
                  id="title"
                  type="text"
                  className='bg-zinc-800 px-2 max-[281px]:hidden -mt-1 w-44 text-gray-300'
                  onChange={handleTitleChange}
                  name="title"
                  value={title}
                />
            </div>
        </div>
        


        <div className='flex  md:mr-[5%] mr-1'>
            

            <button className='flex bg-rose-500 py-2 lg:px-3 px-1 md:mt-4 mt-3 md:mb-4 mb-5 rounded-md max-[600px]:mr-3 max-[600px]:px-2 ml-3'
            onClick={handleSave}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
            className="mt-[6%] text-gray-200">
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5Zm9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-1Z"/>
            </svg> 
            <p className='ml-2 mt-1 md:flex hidden text-gray-200'>Save Changes</p>
            </button>
        </div>

    </nav>

    </div>
  )
}