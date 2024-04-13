import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast'


const Signin = () => {
    const [signinData , setSigninData] = useState({
        name: '' ,
        password: '' ,
        cpassword: ''
    })
    const [show , setShow] = useState(false)
    const [pass , setPass] = useState(false)

    const navigate = useNavigate()

    const Signinform = async (e) => {
        e.preventDefault()
        const {name , password , cpassword}  =  signinData
        try {
            const {data} = await axios.post('http://localhost:8000/signin' , {
                name , password , cpassword
            })

            if(data.error) {
                toast.error(data.error)
                console.log(data.error)
            }
            else{
                setSigninData({})
                navigate('/')
                toast.success('You can login now')
                
            }
        } catch (error) {
            console.log(error)
            
        }
    }

  return (
    <div 
    className="w-full mt-10  flex items-center justify-center text-slate-600 ">
         <form onSubmit={Signinform}
         className='  w-full sm:w-1/2 bg-white mr-8 ml-8 flex items-center justify-center flex-col space-y-4 shadow-xl rounded-xl'>
            <h1 className='text-xl sm:text-2xl font-bold mt-12'>SignUp</h1>
            <div className='p-4  flex flex-col space-x-3  '>
                <label className='text-md sm:text-xl'>Username:</label>
                <input type='text' placeholder='username' value={signinData.name}  onChange={(e) => {
                    setSigninData({...signinData , name: e.target.value})
                }}
                className=' w-full p-1 mr-3 sm:mr-3 sm:p-2 border-2 rounded-lg border-slate-400 focus:border-sky-600 disabled:shadow-none focus:outline-none'
                required/>
            </div>
            <div className='flex flex-col space-x-3'>
                <label className='text-md sm:text-xl'>Password</label>
                <div className='flex flex-col'>
                    <input type={!show ? 'password' : 'text'} placeholder='Password'   value={signinData.password} onChange={(e) => {
                        setSigninData({...signinData , password: e.target.value})
                    }}
                    className='w-full p-1 mr-7  sm:mr-3 sm:p-2 border-2 rounded-lg border-slate-400 focus:border-sky-600 disabled:shadow-none focus:outline-none'
                    required/>
                    <button type='button'
                    className=' ml-5 text-slate-600 hover:text-sky-600 flex justify-end'
                    onClick={() => setShow(!show)}>{show ? 'Hide' :  'Show'}</button>
                </div>
            </div>
            <div className='flex flex-col space-x-3'>
                <label className='text-md sm:text-xl'>Conform Password:</label>
                <div className='flex flex-col'>
                    <input type={!pass ? 'password' : 'text'}  placeholder='Conform Password'   value={signinData.cpassword} onChange={(e) => {
                        setSigninData({...signinData , cpassword: e.target.value})
                    }}
                    className='w-full p-1 mr-7  sm:mr-3 sm:p-2 border-2 rounded-lg border-slate-400 focus:border-sky-600 disabled:shadow-none focus:outline-none'
                    required/>
                    <button  type='button'
                    className=' ml-5 text-slate-600 hover:text-sky-600 flex justify-end'
                    onClick={() => setPass(!pass)}>{pass ? 'Hide' :  'Show'}</button>
                </div>
            </div>
            <div className=' mt-3 flex flex-col justify-end  '>
                <button type='submit' className=' w-20 mb-10 p-2  font-bold bg-sky-500 text-white rounded-xl  hover:bg-sky-700 ' >SignUp</button>
                <Link to = '/' ><div className='  mb-10 text-black   hover:text-blue-700 '>Already have account? Login</div></Link>
            </div>
            
            
        </form>
    </div>
  )
}

export default Signin