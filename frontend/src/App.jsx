import SignUpPage from "./pages/SignUpPage"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import WatchPage from "./pages/WatchPage"
import {Route, Routes} from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer"
import { useEffect } from "react"
import { useAuthStore } from "./store/authUser"
import { Loader } from "lucide-react";

import { Navigate } from "react-router-dom"

function App() {
const {user, isCheckingAuth,authCheck}=useAuthStore()
console.log(user);

useEffect(() => {
  authCheck();

}, [authCheck])



if(isCheckingAuth) {
  return(

<div className="h-screen ">
<div className="flex justify-center items-center bg-black h-full">
<Loader className='animate-spin text-red-600 size-10'/>

</div>

</div>


  )
  
  
}



  return (
    <> 
  <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/login' element={!user ?<LoginPage/>:<Navigate to='/'/>} />
    {/* visit to sign up page if user not authenticated take them to sign up else to the home ooage */}
    <Route path='/signup' element={!user ?<SignUpPage/>:<Navigate to='/'/>} /> 
    <Route path='/watch/:id' element={user ?<WatchPage/>:<Navigate to='/login'/>} /> 
  </Routes>
  {/* to make toaster work */}
  <Toaster/>
  <Footer/>
  {/* put fpooter outside becz we want to see it on very page login sign up etc  */}
  
  </>
  )
}

export default App
