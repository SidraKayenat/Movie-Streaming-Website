// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useAuthStore } from "../store/authUser";
// import { useTranslation } from "react-i18next";

// const SignUpPage = () => {
//   const { searchParams } = new URL(document.location);
//   const emailValue = searchParams.get("email");
//   const [email, setEmail] = useState(emailValue || "");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { t } = useTranslation();

//   //when we addd the email in auth screen it took us to sign up page and in url cam eemail form the url we got the email

//   const { signup } = useAuthStore(); // now this takes us to the signup function in the store

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     signup({ email, password, username }, t);
//   };
//   return (
//     <div className="h-screen w-full hero-bg">
//       <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
//         <Link to={"/"}>
//           <img src="/netflix-logo.png" alt="logo" className="w-52" />
//         </Link>
//       </header>

//       {/* //hold the mail username etc  */}
//       <div className="flex justify-center items-center mt-5 mx-3">
//         <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
//           <h1 className="text-center text-white text-2xl font-bold mb-4">
//             {t("SignUp")}
//           </h1>

//           <form className="space-y-2" onSubmit={handleSignUp}>
//             {/* for email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="text-gray-300 block text-sm font-medium"
//               >
//                 {t("Email")}
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="you@example.com"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* for username */}
//             <div>
//               <label
//                 htmlFor="username"
//                 className="text-gray-300 block text-sm font-medium"
//               >
//                 {t("Username")}
//               </label>
//               <input
//                 type="username"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="John Doe"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>

//             {/* for password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="text-gray-300 block text-sm font-medium"
//               >
//                 {t("Password")}
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="Enter your password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring">
//               {t("SignUp")}
//             </button>
//           </form>

//           <div className="text-center text-gray-400">
//             <span className="mr-2">{t("Already a member?")}</span>
//             <Link to={"/login"} className="text-red-500 hover:underline">
//               {t("Sign In")}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;









import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const searchParams = new URLSearchParams(window.location.search);
    const emailFromSearchParams = searchParams.get("email");
    const emailFromStorage = localStorage.getItem("email");

    const emailValue = emailFromSearchParams || emailFromStorage || "";
    const { username: savedUsername, password: savedPassword, plan: savedPlan } = location.state || {};

    const [email, setEmail] = useState(emailValue);
    const [username, setUsername] = useState(savedUsername || "");
    const [password, setPassword] = useState(savedPassword || "");
    const [plan, setPlan] = useState(savedPlan || "Basic");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const { signup } = useAuthStore();

    useEffect(() => {
        if (emailValue) {
            localStorage.setItem("email", emailValue);
        }
    }, [emailValue]);

    const validatePassword = (password) => {
        if (password.length < 6) {
            return t("Password must be at least 6 characters long.");
        }
        return "";
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        signup({ email, password, username, subscriptionPlan: plan })
            .then(() => navigate("/login"))
            .catch((error) => console.error("Signup error:", error));
    };

    const togglePlan = () => {
        if (plan === "Basic") {
            setPlan("Premium");
            navigate("/payment", { state: { email, username, password, plan: "Premium" } });
        } else {
            setPlan("Basic");
        }
    };

    return (
        <div className="h-screen w-full hero-bg">
            <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <Link to="/">
                    <img src="/netflix-logo.png" alt="logo" className="w-52" />
                </Link>
            </header>

            <div className="flex justify-center items-center mt-12 mx-3">
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    <h1 className="text-center text-white text-2xl font-bold mb-4">{t("SignUp")}</h1>

                    <form className="space-y-4" onSubmit={handleSignUp}>
                        <div>
                            <label htmlFor="email" className="text-gray-300 block text-sm font-medium">{t("Email")}</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="you@example.com"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className="text-gray-300 block text-sm font-medium">{t("Username")}</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="John Doe"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-gray-300 block text-sm font-medium">{t("Password")}</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder={t("Enter your password")}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-300 text-sm font-medium">
                                {t("Selected Plan")}: <span className="text-red-500">{plan}</span>
                            </span>
                            <button
                                type="button"
                                onClick={togglePlan}
                                className="px-4 py-2 rounded-md text-sm text-white bg-red-600 hover:bg-gray-600 focus:outline-none"
                            >
                                {t("Choose")} {plan === "Basic" ? "Premium" : "Basic"}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring"
                        >
                            {t("SignUp")}
                        </button>
                    </form>

                    <button
                        className="w-full mt-4 text-sm text-gray-400 hover:underline"
                        onClick={() => setShowModal(true)}
                    >
                        {t("Learn More About Plans")}
                    </button>

                    <div className="text-center text-gray-400">
                        {t("Already a member?")} {" "}
                        <Link to="/login" className="text-red-500 hover:underline">{t("Sign In")}</Link>
                    </div>
                </div>
            </div>

            {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-black text-white rounded-lg max-w-md p-8 space-y-6 shadow-lg border-4 border-red-600">
            <h2 className="text-2xl font-extrabold text-center">{t("Subscription Plans")}</h2>

            {/* Basic Plan Section */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">{t("Basic Plan")}</h3>
                <p className="text-sm">
                    {t("Enjoy a free plan with limited access:")}
                </p>
                <ul className="list-disc list-inside text-sm">
                
                   
                    <li>{t("Contains ads and a slower streaming experience")}</li>
                </ul>
            </div>

            {/* Premium Plan Section */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">{t("Premium Plan")}</h3>
                <p className="text-sm">
                    {t("For a seamless experience, choose the Premium Plan:")}
                </p>
                <ul className="list-disc list-inside text-sm">
                
                    <li>{t("Ad-free streaming at just Rs. 1000 per month")}</li>
                    <li>{t("Faster streaming with no buffering")}</li>
                    {/* <li>{t("Affordable at just Rs. 1000 per month")}</li> */}
                </ul>
            </div>

            {/* Close Button */}
            <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-lg font-semibold transition-all duration-300"
            >
                {t("Close")}
            </button>
        </div>
    </div>
)}


        </div>
    );
};

export default SignUpPage;
