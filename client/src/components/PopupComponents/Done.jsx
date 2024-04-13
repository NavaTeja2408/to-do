import React from 'react'
import axios  from 'axios';
import {toast} from 'react-hot-toast'

const Done = ({stateChange , dataid , stateChangeDone , temp}) => {
    const handleDone = async () => {
        const dataId = dataid; // Assuming `dataid` is defined somewhere in your code
      
        try {
          const response = await axios.delete('https://to-do-server-w6ww.onrender.com/deletedata', { data: { dataId } });
          const data = response.data;
          if (data.error) {
            toast.error(data.error)
            console.log(data.error);
          } else {
            stateChange(temp + 1); // Assuming `temp` is defined and is part of your state management
            stateChangeDone(false)

          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-slate-600 " >
        <div className=' w-2/3 sm:w-1/2 p-11 bg-slate-50 border-4 border-sky-400 rounded-xl flex flex-col items-center justify-center '>
          <h2 className='text-xl font-bold '>Congratulations you completed your task!!!</h2>
          <button
          className=' mt-9 p-2 px-4  font-bold bg-sky-500 text-white rounded-xl  hover:bg-sky-700'
           onClick={handleDone}>Go back</button>
        </div>
        
    </div>
  )
}

export default Done