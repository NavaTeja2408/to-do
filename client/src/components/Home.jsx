import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Card from './Card'
import AddNew from './PopupComponents/AddNew'
import axios from 'axios'
import { UserContext } from './Context'

const Home = () => {
  const navigate = useNavigate()
  const [search , setSearch] = useState('')
  const {verifiedData  , setUser  , user} = useContext(UserContext)
  const [popupforadd , setPopupforadd] = useState(false)

  const [temp , setTemp] = useState(0)
  const [list , setList] = useState([])
 
  
  
  useEffect(() => {
      const {id} = verifiedData
      axios.get('https://to-do-server-w6ww.onrender.com/getdata' , {id}).then(({data}) => setList(data))
  } , [temp , verifiedData ])
 
  
  const handletemp = () => {

    localStorage.removeItem('accessToken')
    navigate('/')
    
  } 


  return (
    <div className='  w-full flex items-center bg-slate-50  flex-col space-x-3 text-slate-700 overflow-hidden'>
       <input type='text' value={search} placeholder='Search for task' 
        className=' mr-5 pr-11 p-1  sm:w-2/3 sm:p-2 mt-5 border-2 rounded-xl border-slate-500 focus:border-sky-500 focus:outline-none'
        onChange={(e) =>  setSearch(e.target.value)}
          />
        <div className='w-2/3 flex justify-end'>
          {!popupforadd ? <button 
          className='mr-5 mt-3 p-1 px-3 sm:p-2 sm:px-5 sm:font-bold bg-sky-500 text-white rounded-xl  hover:bg-sky-700'
          onClick={() => setPopupforadd(true)}>Add New Task</button> : 
          <></> }

          <button
          className=' mt-3 py-1  px-2 sm:p-2 sm:px-5 sm:font-bold bg-sky-500 text-white rounded-xl  hover:bg-sky-700'
            onClick={handletemp}>Logout </button>
       </div>

         


         {popupforadd ?  <AddNew stateChange= {setTemp} temp = {temp} popupState = {setPopupforadd}  /> : <></> }

      
            <div className=' w-full flex flex-col space-y-5 justify-start mt-6'>
              { list.filter((items) => {
              return items.user_id === verifiedData.id
                } ).length === 0 ? 
                <div className='flex flex-col items-center justify-center text-slate-600'>
                  <h1 className='text-3xl'>There are no Tasks!</h1>
                  <h2 className='text-xl'>Add new tasks to see </h2>
                </div> :

              list.filter((items) => {
              return items.user_id === verifiedData.id
                } ).filter((items) => {
              return search.toLowerCase().trim() === '' ? items : items.thing.toLowerCase().includes(search)
              }
              ).map((items , index) => {
                  return (
                  <div key={index}> 
                    <Card thing = {items.thing} todate = {items.date} dataid = {items._id} stateChange= {setTemp} temp = {temp} />
                  </div>
                ) 
                })}

            </div>
    </div>
  )
}

export default Home