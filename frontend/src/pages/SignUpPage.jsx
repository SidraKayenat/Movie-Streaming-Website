import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/authUser';


const SignUpPage = () => {
    const {searchParams}=new URL(document.location)
const emailValue=searchParams.get('email')
    const [email, setEmail] = useState(emailValue || "");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    //when we addd the email in auth screen it took us to sign up page and in url cam eemail form the url we got the email 

const {signup}=useAuthStore(); // now this takes us to the signup function in the store 

    const handleSignUp=(e)=>{
        e.preventDefault();
     signup({email,password,username});
        
    }
    return (
        <div className='h-screen w-full hero-bg'>

            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
                <Link to={"/"}>
                    <img src="/netflix-logo.png" alt="logo" className='w-52' />
                </Link>
            </header>



            {/* //hold the mail username etc  */}
            <div className='flex justify-center items-center mt-20 mx-3'>
                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>

                    <h1 className='text-center text-white text-2xl font-bold mb-4'>SignUp </h1>

                    <form className='space-y-4' onSubmit={handleSignUp}>

                        {/* for email */}
                        <div>
                            <label htmlFor='email' className='text-gray-300 block text-sm font-medium'>Email</label>
                            <input type='email' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='you@example.com' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>


                        {/* for username */}
                        <div>
                            <label htmlFor='username' className='text-gray-300 block text-sm font-medium'>Username</label>
                            <input type='username' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='John Doe' id='username' value={username} onChange={(e)=>setUsername(e.target.value)} />
                        </div>


                         {/* for password */}
                         <div>
                            <label htmlFor='password' className='text-gray-300 block text-sm font-medium'>Password</label>
                            <input type='password' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='Enter your password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>


                        <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring'>
                            SignUp
                        </button>


                    </form>


                    <div className='text-center text-gray-400'>
Already a member?{" "} <Link to={'/login'} className='text-red-500 hover:underline'>Sign In</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUpPage
