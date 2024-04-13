import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserContext } from '../Context'
import toast from 'react-hot-toast'

const AddNew = ({stateChange , temp , popupState }) => {

  const {verifiedData} = useContext(UserContext)

 
  const [todo , setTodo] = useState({
    thing: '' ,
    date : ''
  })
  

  const handleOnSubmit = async(e) => {
    
    e.preventDefault()
    const {thing , date} = todo
    const { id} = verifiedData
    try {
        

        const {data} = await axios.post('https://to-do-server-w6ww.onrender.com/adddata'  , {
          thing , date , id
        })
        
        if (data.error){
            toast.error(data.error)
            console.log(data.error)
        }
        else{
            // const token = data.jwttoken
            // localStorage.setItem('accessToken', data.jwttoken);
            toast.success('Succesfully added new task')
            stateChange(temp + 1)
            setTodo({
              thing: '' ,
              date : ''
            })
            popupState(false)
            // console.log(token)

        }
    } catch (error) {
        console.log(error)
    }

  }


  
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center " >
      <form onSubmit={handleOnSubmit}
      className='w-2/3 p-9 bg-slate-50  flex items-center justify-center flex-col space-y-8 border-4 border-sky-400 rounded-xl'
     >
        <div className='flex flex-col space-x-3 '>
          <label className='text-sm sm:text-xl'>Task Name: </label>
          <input type='text' value={todo.thing} placeholder='Enter the Task' 
          className=' p-1 sm:p-2 border-2 rounded-lg border-slate-400 focus:border-sky-600 disabled:shadow-none focus:outline-none'
          onChange={(e) => setTodo({...todo , thing: e.target.value})} 
          required/>
        </div>
        <div className='flex flex-col space-x-3 '>
          <label className=' text-sm sm:text-xl'>Description</label>
          <input type='text' value={todo.date} placeholder= 'Enter description' 
          className=' p-1 sm:p-2 border-2 rounded-lg border-slate-400 focus:border-sky-600 disabled:shadow-none focus:outline-none'
          onChange={(e) => setTodo({...todo , date: e.target.value})} 
          required/>
        </div>
        <div className='flex flex-row space-x-3'>
        <button className=' p-1   sm:p-2 sm:px-4  sm:font-bold bg-sky-500 text-white rounded-xl  hover:bg-sky-700'
        type='button'
        onClick={() => popupState(false)} 
        >Cancel</button>
        <button className=' w-32  sm:p-2 sm:px-4  sm:font-bold bg-sky-500 text-white rounded-xl  hover:bg-sky-700' type='submit'>Add New Task</button>
        
        </div>
      </form> 
     
    </div>
  )
} 

export default AddNew