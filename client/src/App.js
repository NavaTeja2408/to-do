
import './App.css';
import { useContext  } from 'react';
import { UserContext } from './components/Context';
import Login from './components/Login';
import Home from './components/Home';
import Signin from './components/Signin';
import {Navigate , Route , Routes } from 'react-router-dom';
import { UserContextProvider } from './components/Context';
import {Toaster} from 'react-hot-toast'



function App() {
  const {user} = useContext(UserContext)

  return (
    <div className='bg-slate-50 h-screen overflow-hidden' >

    <div className='w-full pt-7 bg-slate-50 flex items-center justify-center'>
      <h1 className=' text-2xl sm:text-4xl text-slate-700 font-bold '>TO-DO WEBSITE</h1>
    </div>
   
    <UserContextProvider>
    <Toaster position='top-center' toastOptions={{duration : 4000}} />
      <Routes>
        <Route path='/' element= {<Login />} />
        <Route path='/home' element= {<Home />} />
        <Route path='/signin' element= {<Signin/>} />
        
      </Routes>
      </UserContextProvider>
     
    </div>
  );
}

export default App;
