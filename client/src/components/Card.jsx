
import React, { useState } from 'react'
import DeleteConform from './PopupComponents/DeleteConform';
import Done from './PopupComponents/Done';

const Card = ({thing , todate , dataid , stateChange , temp}) => {
  const [open , setOpen] = useState(false)
  const [doneTab , setDonetab] = useState(false)

 
  
    return (
    <div className='w-full flex justify-center text-slate-600 '>
      <div className='w-4/5 p-2 sm:w-1/2 shadow-inner sm:p-4 py-10 bg-white flex flex-row justify-center '>
        <div className='w-2/3 flex flex-col  '>
          <label>Task:</label>
          <h2 className='text-xl font-bold text-slate-800 ml-2'>{thing}</h2>
          <p className='text-xs sm:text-md ml-3'>{todate}</p>
        </div>
        <div className='flex flex-col space-y-3'>
          <button
          className='  p-1 px-3 sm:p-2 sm:px-4  font-bold bg-green-500 text-white rounded-xl  hover:bg-green-700'  
          onClick={() => setDonetab(true)}>Done</button>
          <button
          className='  p-1 px-3 sm:p-2 sm:px-4  font-bold bg-red-500 text-white rounded-xl  hover:bg-red-700' 
          onClick={() => setOpen(true)}>Delete</button>
        </div>
      </div>
        { open ? <DeleteConform stateChange={stateChange} closeTab = {setOpen} dataid={dataid} temp = {temp}/> : <></> }
        {doneTab ? <Done stateChangeDone = {setDonetab}  stateChange={stateChange}  dataid={dataid} temp = {temp}/> : <></> }
    </div>
  )
}

export default Card