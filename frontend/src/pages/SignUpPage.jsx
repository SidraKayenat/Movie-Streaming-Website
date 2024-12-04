// import React from 'react'
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { useAuthStore } from '../store/authUser';


// const SignUpPage = () => {
//     const {searchParams}=new URL(document.location)
// const emailValue=searchParams.get('email')
//     const [email, setEmail] = useState(emailValue || "");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
    
//     //when we addd the email in auth screen it took us to sign up page and in url cam eemail form the url we got the email 

// const {signup}=useAuthStore(); // now this takes us to the signup function in the store 

//     const handleSignUp=(e)=>{
//         e.preventDefault();
//      signup({email,password,username});
        
//     }
//     return (
//         <div className='h-screen w-full hero-bg'>

//             <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
//                 <Link to={"/"}>
//                     <img src="/netflix-logo.png" alt="logo" className='w-52' />
//                 </Link>
//             </header>



//             {/* //hold the mail username etc  */}
//             <div className='flex justify-center items-center mt-20 mx-3'>
//                 <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>

//                     <h1 className='text-center text-white text-2xl font-bold mb-4'>SignUp </h1>

//                     <form className='space-y-4' onSubmit={handleSignUp}>

//                         {/* for email */}
//                         <div>
//                             <label htmlFor='email' className='text-gray-300 block text-sm font-medium'>Email</label>
//                             <input type='email' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
//                                 placeholder='you@example.com' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
//                         </div>


//                         {/* for username */}
//                         <div>
//                             <label htmlFor='username' className='text-gray-300 block text-sm font-medium'>Username</label>
//                             <input type='username' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
//                                 placeholder='John Doe' id='username' value={username} onChange={(e)=>setUsername(e.target.value)} />
//                         </div>


//                          {/* for password */}
//                          <div>
//                             <label htmlFor='password' className='text-gray-300 block text-sm font-medium'>Password</label>
//                             <input type='password' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
//                                 placeholder='Enter your password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
//                         </div>


//                         <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring'>
//                             SignUp
//                         </button>


//                     </form>


//                     <div className='text-center text-gray-400'>
// Already a member?{" "} <Link to={'/login'} className='text-red-500 hover:underline'>Sign In</Link>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SignUpPage










//correct iwht payment


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/authUser';

// const SignUpPage = () => {
//     const { searchParams } = new URL(document.location);
//     const emailValue = searchParams.get('email');
//     const [email, setEmail] = useState(emailValue || "");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [showModal, setShowModal] = useState(false);
//     const [plan, setPlan] = useState("Basic");

//     const { signup } = useAuthStore();
//     const navigate = useNavigate();

//     const handleSignUp = (e) => {
//         e.preventDefault();

//         if (plan === "Premium") {
//             setShowModal(true); // Show modal for Premium plan
//         } else {
//             signup({ email, password, username, subscriptionPlan: plan })
//                 .then(() => navigate('/login'))
//                 .catch((error) => console.error('Signup error:', error));
//         }
//     };

//     const togglePlan = () => {
//         setPlan(plan === "Basic" ? "Premium" : "Basic");
//     };

//     const handlePayment = () => {
//         navigate('/payment', { state: { email, username, plan } });
//     };

//     return (
//         <div className='h-screen w-full hero-bg'>
//             <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
//                 <Link to={"/"}>
//                     <img src="/netflix-logo.png" alt="logo" className='w-52' />
//                 </Link>
//             </header>

//             <div className='flex justify-center items-center mt-12 mx-3'>
//                 <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
//                     <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

//                     <form className='space-y-4' onSubmit={handleSignUp}>
//                         <div>
//                             <label htmlFor='email' className='text-gray-300 block text-sm font-medium'>Email</label>
//                             <input
//                                 type='email'
//                                 className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
//                                 placeholder='you@example.com'
//                                 id='email'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor='username' className='text-gray-300 block text-sm font-medium'>Username</label>
//                             <input
//                                 type='text'
//                                 className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
//                                 placeholder='John Doe'
//                                 id='username'
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor='password' className='text-gray-300 block text-sm font-medium'>Password</label>
//                             <input
//                                 type='password'
//                                 className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
//                                 placeholder='Enter your password'
//                                 id='password'
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>

//                         <div className='flex justify-between items-center'>
//                             <span className='text-gray-300 text-sm font-medium'>
//                                 Selected Plan: <span className='text-red-500'>{plan}</span>
//                             </span>
//                             <button
//                                 type='button'
//                                 onClick={togglePlan}
//                                 className='px-4 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none'
//                             >
//                                 Toggle to {plan === "Basic" ? "Premium" : "Basic"}
//                             </button>
//                         </div>

//                         <button
//                             type='submit'
//                             className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring'
//                         >
//                             Sign Up
//                         </button>
//                     </form>

//                     <button
//                         className='w-full mt-4 text-sm text-gray-400 hover:underline'
//                         onClick={() => setShowModal(true)}
//                     >
//                         Learn More About Plans
//                     </button>

//                     <div className='text-center text-gray-400'>
//                         Already a member?{" "}
//                         <Link to={'/login'} className='text-red-500 hover:underline'>Sign In</Link>
//                     </div>
//                 </div>
//             </div>

//             {showModal && (
//                 <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50'>
//                     <div className='bg-white rounded-lg max-w-md p-6 space-y-4 text-gray-800'>
//                         <h2 className='text-lg font-bold'>Subscription Plans</h2>
//                         <div>
//                             <h3 className='font-semibold'>Basic</h3>
//                             <p className='text-sm'>
//                                 Free plan with a usage limit of 5 hours per day. After that, access will be restricted.
//                             </p>
//                         </div>
//                         <div>
//                             <h3 className='font-semibold'>Premium</h3>
//                             <p className='text-sm'>
//                                 Unlimited usage for only 1000 PKR per month.
//                             </p>
//                         </div>
//                         <button
//                             onClick={() => setShowModal(false)}
//                             className='mt-4 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md w-full'
//                         >
//                             Close
//                         </button>
//                         <button
//                             onClick={handlePayment}
//                             className='mt-4 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md w-full'
//                         >
//                             Pay Now
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SignUpPage;










// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '../store/authUser';

// const SignUpPage = () => {
//     const location = useLocation();
//     const { email: savedEmail, username: savedUsername, password: savedPassword, plan: savedPlan } = location.state || {};

//     const [email, setEmail] = useState(savedEmail || "");
//     const [username, setUsername] = useState(savedUsername || "");
//     const [password, setPassword] = useState(savedPassword || "");
//     const [plan, setPlan] = useState(savedPlan || "Basic");
//     const [showModal, setShowModal] = useState(false);

//     const { signup } = useAuthStore();
//     const navigate = useNavigate();

//     const handleSignUp = (e) => {
//         e.preventDefault();

//         if (plan === "Premium") {
//             setShowModal(true);
//         } else {
//             signup({ email, password, username, subscriptionPlan: plan })
//                 .then(() => navigate('/login'))
//                 .catch((error) => console.error('Signup error:', error));
//         }
//     };

//     const togglePlan = () => {
//         setPlan(plan === "Basic" ? "Premium" : "Basic");
//     };

//     const handlePayment = () => {
//         navigate('/payment', { state: { email, username, password, plan } });
//     };

//     return (
//         <div className='h-screen w-full hero-bg'>
//             <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
//                 <Link to={"/"}>
//                     <img src="/netflix-logo.png" alt="logo" className='w-52' />
//                 </Link>
//             </header>

//             <div className='flex justify-center items-center mt-12 mx-3'>
//                 <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
//                     <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

//                     <form className='space-y-4' onSubmit={handleSignUp}>
//                         <div>
//                             <label htmlFor='email' className='text-gray-300 block text-sm font-medium'>Email</label>
//                             <input
//                                 type='email'
//                                 className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
//                                 placeholder='you@example.com'
//                                 id='email'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor='username' className='text-gray-300 block text-sm font-medium'>Username</label>
//                             <input
//                                 type='text'
//                                 className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
//                                 placeholder='John Doe'
//                                 id='username'
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor='password' className='text-gray-300 block text-sm font-medium'>Password</label>
//                             <input
//                                 type='password'
//                                 className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
//                                 placeholder='Enter your password'
//                                 id='password'
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>

//                         <div className='flex justify-between items-center'>
//                             <span className='text-gray-300 text-sm font-medium'>
//                                 Selected Plan: <span className='text-red-500'>{plan}</span>
//                             </span>
//                             <button
//                                 type='button'
//                                 onClick={togglePlan}
//                                 className='px-4 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none'
//                             >
//                                 Toggle to {plan === "Basic" ? "Premium" : "Basic"}
//                             </button>
//                         </div>

//                         <button
//                             type='submit'
//                             className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring'
//                         >
//                             Sign Up
//                         </button>
//                     </form>

//                     <button
//                         className='w-full mt-4 text-sm text-gray-400 hover:underline'
//                         onClick={() => setShowModal(true)}
//                     >
//                         Learn More About Plans
//                     </button>

//                     <div className='text-center text-gray-400'>
//                         Already a member?{" "}
//                         <Link to={'/login'} className='text-red-500 hover:underline'>Sign In</Link>
//                     </div>
//                 </div>
//             </div>

//             {showModal && (
//                 <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50'>
//                     <div className='bg-white rounded-lg max-w-md p-6 space-y-4 text-gray-800'>
//                         <h2 className='text-lg font-bold'>Subscription Plans</h2>
//                         <div>
//                             <h3 className='font-semibold'>Basic</h3>
//                             <p className='text-sm'>
//                                 Free plan with a usage limit of 5 hours per day. After that, access will be restricted.
//                             </p>
//                         </div>
//                         <div>
//                             <h3 className='font-semibold'>Premium</h3>
//                             <p className='text-sm'>
//                                 Unlimited usage for only 1000 PKR per month.
//                             </p>
//                         </div>
//                         <button
//                             onClick={() => setShowModal(false)}
//                             className='mt-4 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md w-full'
//                         >
//                             Close
//                         </button>
//                         <button
//                             onClick={handlePayment}
//                             className='mt-4 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md w-full'
//                         >
//                             Pay Now
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SignUpPage;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const SignUpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get email from search params (for AuthScreen case) or localStorage (for Payment case)
    const searchParams = new URLSearchParams(window.location.search);
    const emailFromSearchParams = searchParams.get('email');
    const emailFromStorage = localStorage.getItem('email');

    const emailValue = emailFromSearchParams || emailFromStorage || "";

    const { username: savedUsername, password: savedPassword, plan: savedPlan } = location.state || {};

    const [email, setEmail] = useState(emailValue);
    const [username, setUsername] = useState(savedUsername || "");
    const [password, setPassword] = useState(savedPassword || "");
    const [showModal, setShowModal] = useState(false); // Declare showModal here
   
    const [plan, setPlan] = useState(savedPlan || "Basic");
    const [error, setError] = useState("");

    const { signup } = useAuthStore();

    useEffect(() => {
        if (emailValue) {
            // Store the email in localStorage for future use
            localStorage.setItem('email', emailValue);
        }
    }, [emailValue]);

    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError); // Set error message and prevent navigation
            return;
        }

        signup({ email, password, username, subscriptionPlan: plan })
            .then(() => navigate('/login'))
            .catch((error) => console.error('Signup error:', error));
    };

    const togglePlan = () => {
        if (plan === "Basic") {
            setPlan("Premium");
            navigate('/payment', { state: { email, username, password, plan: "Premium" } });
        } else {
            setPlan("Basic");
        }
    };

    return (
        <div className='h-screen w-full hero-bg'>
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
                <Link to={"/"}>
                    <img src="/netflix-logo.png" alt="logo" className='w-52' />
                </Link>
            </header>

            <div className='flex justify-center items-center mt-12 mx-3'>
                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                    <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

                    <form className='space-y-4' onSubmit={handleSignUp}>
                        <div>
                            <label htmlFor='email' className='text-gray-300 block text-sm font-medium'>Email</label>
                            <input
                                type='email'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='you@example.com'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor='username' className='text-gray-300 block text-sm font-medium'>Username</label>
                            <input
                                type='text'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='John Doe'
                                id='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor='password' className='text-gray-300 block text-sm font-medium'>Password</label>
                            <input
                                type='password'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='Enter your password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>} {/* Display error message */}
                        </div>

                        <div className='flex justify-between items-center'>
                            <span className='text-gray-300 text-sm font-medium'>
                                Selected Plan: <span className='text-red-500'>{plan}</span>
                            </span>
                            <button
                                type='button'
                                onClick={togglePlan}
                                className='px-4 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none'
                            >
                                Toggle to {plan === "Basic" ? "Premium" : "Basic"}
                            </button>
                        </div>

                        <button
                            type='submit'
                            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring'
                        >
                            Sign Up
                        </button>
                    </form>

                    <button
                        className='w-full mt-4 text-sm text-gray-400 hover:underline'
                        onClick={() => setShowModal(true)}
                    >
                        Learn More About Plans
                    </button>

                    <div className='text-center text-gray-400'>
                        Already a member?{" "}
                        <Link to={'/login'} className='text-red-500 hover:underline'>Sign In</Link>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50'>
                    <div className='bg-white rounded-lg max-w-md p-6 space-y-4 text-gray-800'>
                        <h2 className='text-lg font-bold'>Subscription Plans</h2>
                        <div>
                            <h3 className='font-semibold'>Basic</h3>
                            <p className='text-sm'>
                                Free plan with a usage limit of 5 hours per day. After that, access will be restricted.
                            </p>
                        </div>
                        <div>
                            <h3 className='font-semibold'>Premium</h3>
                            <p className='text-sm'>
                                Unlimited usage for only 1000 PKR per month.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className='mt-4 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md w-full'
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpPage;
