import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'



const Login = () => {
    const navigate = useNavigate()
    const [showPassword , setShowPassword] = useState(false)
    const [loginData , setLoginData] = useState({
        name:'' ,
        password:''
    })

    const Loginform = async(e) => {
        e.preventDefault()
        const {name , password} = loginData
        try {
            

            const {data} = await axios.post('http://localhost:8000/login'  , {
                name , password
            })
            
            if (data.error){
                toast.error(data.error)
            }
            else{

                localStorage.setItem('accessToken', data.jwttoken);
                setLoginData({})
                toast.success('Sucessful Login')
                navigate('/home')

            }
        } catch (error) {
            console.log(error)
        }
    }


return (
    <div 
    className="w-full mt-14  flex items-center justify-center text-slate-600 ">
        
        
        <form onSubmit={Loginform} 
        className='  w-full sm:w-1/2 bg-white mr-8 ml-8 flex items-center justify-center flex-col space-y-4 shadow-xl rounded-xl'>

            <h1 className=' text-xl sm:text-2xl font-bold mt-12'>Login</h1>
            <div className='p-4  flex flex-col space-x-3 '>
                <label className='text-md sm:text-xl'>Username: </label>
                <input type='text' placeholder='Username' value={loginData.name}  
                className= 'w-full p-1 mr-3 sm:mr-3 sm:p-2 border-2 rounded-lg border-slate-400 focus:border-sky-600 disabled:shadow-none focus:outline-none'
                onChange={(e) => {setLoginData({...loginData , name: e.target.value})}}
                required />
            </div>
            <div className='p-4  flex flex-col space-x-3 '>
                <label className='text-md sm:text-xl'>Password: </label>
                <div className='flex flex-col'>
                    <input type={!showPassword ? 'password' : 'text' } placeholder='Password'
                    value={loginData.password} 
                    onChange={(e) => {setLoginData({...loginData , password: e.target.value})}}
                    className= 'w-full p-1 mr-7  sm:mr-3 sm:p-2 border-2 rounded-lg border-slate-400 focus:border-sky-600 disabled:shadow-none focus:outline-none'
                    required/>
                    <button type = 'button' className='mr-0 ml-5 text-slate-600 hover:text-sky-600 flex justify-end' onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'hide' : 'show'}</button>
                </div>
            </div>
            <div className='flex flex-col  '>
                <button className='w-20 mb-10 p-2  font-bold bg-sky-500 text-white rounded-xl  hover:bg-sky-700 ' 
                type='submit'>Login</button>

                <Link to = '/signin'><p 
                className='mb-10 text-black   hover:text-blue-700 ' >Don't have an account? Signup</p></Link>  
            </div> 
        </form>
    </div>
    )
}

export default Login