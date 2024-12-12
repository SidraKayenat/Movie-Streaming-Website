// import { Search } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser";
// import { Menu, LogOut } from "lucide-react";
// import { useContentStore } from "../store/content";
// import { useTranslation } from "react-i18next";
// import { useState } from "react";



// const Navbar = () => {
//   const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
//   const { user, logout } = useAuthStore();
//   const { t } = useTranslation();
//   const toggleMobileMenu = () => {
//     setisMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const { setContentType } = useContentStore();

//   return (
//     <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
//       <div className="flex items-center gap-10 z-50">
//         <Link to="/">
//           <img
//             // src="/netflix-logo.png"
//             src="/logo2.png"
//             alt="Netflix Logo"
//             className="w-32 sm:w-40"
//           />
//         </Link>

//         {/* Desktop navbar items */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex gap-6 items-center">
//           <Link
//             to="/"
//             className="hover:text-red-500 transition-colors duration-300"
//             onClick={() => setContentType("movie")}
//           >
//             {t("Movies")}
//           </Link>
//           <Link
//             to="/"
//             className="hover:text-red-500 transition-colors duration-300"
//             onClick={() => setContentType("tv")}
//           >
//             {t("TV Shows")}
//           </Link>
//           <Link
//             to="/history"
//             className="hover:text-red-500 transition-colors duration-300"
//           >
//             {t("Search History")}
//           </Link>
//         </div>
//       </div>

//       <div className="flex gap-5 items-center z-50">
//         <Link to={"/search"}>
//           <Search className="size-6 cursor-pointer hover:text-red-500 transition-colors duration-300" />{" "}
//         </Link>
//         <img
//           src="/avatar2.png"
//           alt="Avatar"
//           className="h-8 rounded cursor-pointer"
//         />
//         <LogOut
//           className="size-6 cursor-pointer text-white hover:text-red-500 transition-colors duration-300"
//           onClick={logout}
//         />

//         <div className="sm:hidden">
//           <Menu
//             className="size-6 cursor-pointer hover:text-red-500 transition-colors duration-300"
//             onClick={toggleMobileMenu}
//           />
//         </div>
//       </div>

//       {/* Mobile navbar items */}
//       {isMobileMenuOpen && (
//         <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
//           <Link
//             to="/"
//             className="block hover:underline p-2"
//             onClick={toggleMobileMenu}
//           >
//             {t("Movies")}
//           </Link>
//           <Link
//             to="/"
//             className="block hover:underline p-2"
//             onClick={toggleMobileMenu}
//           >
//             {t("TV Shows")}
//           </Link>
//           <Link
//             to="/history"
//             className="block hover:underline p-2"
//             onClick={toggleMobileMenu}
//           >
//             {t("Search History")}
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;



//correct complete but no UI



// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser"; // Assuming you have an auth store for managing user state
// import { Search, Menu, LogOut } from "lucide-react";
// import { useContentStore } from "../store/content";
// import { useTranslation } from "react-i18next";

// const Navbar = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
//   const [plan, setPlan] = useState("Basic"); // Default plan
//   const { user, logout } = useAuthStore();
//   const { setContentType } = useContentStore();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   useEffect(() => {
//     if (user) {
//       setPlan(user.subscriptionPlan || "Basic"); // Set plan when user data is available
//     }
//   }, [user]);

//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   const handleDeleteAccount = () => {
//     // Call API to delete account and remove the user session (logging out)
//     logout();
//     setIsModalOpen(false);
//   };

//   const handleUpgradeSubscription = async () => {
//     if (user?.subscriptionPlan === "Basic") {
//       // First navigate to the payment page
//       navigate("/payment", { 
//         state: { email: user.email, username: user.username, password: user.password, plan: "Premium" }
//       });

//       // Then update the subscription plan via the API (backend)
//       try {
//         const response = await fetch("api/v1/payment/update-subscription", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: user.email,
//             subscriptionPlan: "Premium", // The upgraded plan
//           }),
//         });

//         const data = await response.json();
//         if (data.message) {
//           console.log("Subscription updated successfully:", data.message);
//         }
//       } catch (error) {
//         console.error("Error updating subscription:", error);
//       }
//     }
//   };

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
//       <div className="flex items-center gap-10 z-50">
//         <Link to="/">
//           <img
//             src="/logo2.png"
//             alt="Logo"
//             className="w-32 sm:w-40"
//           />
//         </Link>

//         {/* Desktop navbar items */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex gap-6 items-center">
//           <Link
//             to="/"
//             className="hover:text-red-500 transition-colors duration-300"
//             onClick={() => setContentType("movie")}
//           >
//             {t("Movies")}
//           </Link>
//           <Link
//             to="/"
//             className="hover:text-red-500 transition-colors duration-300"
//             onClick={() => setContentType("tv")}
//           >
//             {t("TV Shows")}
//           </Link>
//           <Link
//             to="/history"
//             className="hover:text-red-500 transition-colors duration-300"
//           >
//             {t("Search History")}
//           </Link>
//         </div>
//       </div>

//       <div className="flex gap-5 items-center z-50">
//         <Link to="/search">
//           <Search className="size-6 cursor-pointer hover:text-red-500 transition-colors duration-300" />
//         </Link>
//         <img
//           src="/avatar2.png"
//           alt="Avatar"
//           className="h-8 rounded cursor-pointer"
//           onClick={toggleModal}
//         />
//         <LogOut
//           className="size-6 cursor-pointer text-white hover:text-red-500 transition-colors duration-300"
//           onClick={logout}
//         />
//         <div className="sm:hidden">
//           <Menu
//             className="size-6 cursor-pointer hover:text-red-500 transition-colors duration-300"
//             onClick={toggleMobileMenu}
//           />
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-80 max-w-md space-y-4">
//             <h2 className="text-xl font-semibold">Account Settings</h2>

//             {/* Option buttons */}
//             <div className="space-y-2">
//               <button
//                 onClick={() => setIsDeleteConfirmation(true)}
//                 className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete Account
//               </button>
//               <button
//                 onClick={handleUpgradeSubscription}
//                 className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Upgrade to Premium
//               </button>
//             </div>

//             {/* Delete confirmation */}
//             {isDeleteConfirmation && (
//               <div className="mt-4 space-y-2">
//                 <p className="text-sm text-gray-600">Are you sure you want to delete your account?</p>
//                 <div className="flex space-x-4">
//                   <button
//                     onClick={handleDeleteAccount}
//                     className="w-1/2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                   >
//                     Yes, Delete
//                   </button>
//                   <button
//                     onClick={() => setIsDeleteConfirmation(false)}
//                     className="w-1/2 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Mobile navbar items */}
//       {isMobileMenuOpen && (
//         <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
//           <Link
//             to="/"
//             className="block hover:underline p-2"
//             onClick={toggleMobileMenu}
//           >
//             {t("Movies")}
//           </Link>
//           <Link
//             to="/"
//             className="block hover:underline p-2"
//             onClick={toggleMobileMenu}
//           >
//             {t("TV Shows")}
//           </Link>
//           <Link
//             to="/history"
//             className="block hover:underline p-2"
//             onClick={toggleMobileMenu}
//           >
//             {t("Search History")}
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;




// //perfectly till premium only 
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser"; // Assuming you have an auth store for managing user state
// import { Search, Menu, LogOut, X } from "lucide-react"; // Import X icon from lucide-react
// import { useContentStore } from "../store/content";
// import { useTranslation } from "react-i18next";

// const Navbar = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { user, logout } = useAuthStore();
//   const { setContentType } = useContentStore();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   const handleUpgradeSubscription = async () => {
//     if (user?.subscriptionPlan === "Basic") {
//       navigate("/payment", {
//         state: { email: user.email, username: user.username, plan: "Premium" },
//       });
//       try {
//         const response = await fetch("/api/v1/payment/update-subscription", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user?.token}`,
//           },
//           body: JSON.stringify({
//             email: user?.email,
//             subscriptionPlan: "Premium",
//           }),
//         });
//         if (response.ok) {
//           const { subscriptionPlan } = await response.json();
//           useAuthStore.setState((state) => ({
//             user: {
//               ...state.user,
//               subscriptionPlan,
//             },
//           }));
//         }
//       } catch (error) {
//         console.error("Error updating subscription:", error);
//       }
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       const response = await fetch("/api/v1/auth/delete", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user?.token}`,
//         },
//         body: JSON.stringify({ email: user?.email }),
//       });
//       if (response.ok) {
//         alert("Account deleted successfully.");
//         logout();
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to delete account: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       alert("An error occurred while trying to delete your account. Please try again.");
//     } finally {
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
//       <div className="flex items-center gap-10 z-50">
//         <Link to="/">
//           <img src="/logo2.png" alt="Logo" className="w-32 sm:w-40" />
//         </Link>
//         <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex gap-6 items-center">
//           <Link to="/" className="hover:text-red-500" onClick={() => setContentType("movie")}>{t("Movies")}</Link>
//           <Link to="/" className="hover:text-red-500" onClick={() => setContentType("tv")}>{t("TV Shows")}</Link>
//           <Link to="/history" className="hover:text-red-500">{t("Search History")}</Link>
//         </div>
//       </div>
//       <div className="flex gap-5 items-center z-50">
//         <Link to="/search">
//           <Search className="size-6 cursor-pointer hover:text-red-500" />
//         </Link>
//         <img
//           src="/avatar2.png"
//           alt="Avatar"
//           className="h-8 rounded cursor-pointer"
//           onClick={toggleModal}
//         />
//         <LogOut className="size-6 cursor-pointer hover:text-red-500" onClick={logout} />
//         <div className="sm:hidden">
//           <Menu className="size-6 cursor-pointer hover:text-red-500" />
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="bg-black text-white p-8 rounded-lg w-[90%] max-w-4xl flex relative">
//             {/* Close Button */}
//             <X
//               className="absolute top-2 right-2 cursor-pointer text-white"
//               onClick={() => setIsModalOpen(false)} // Close modal when clicked
//             />
//             {/* Left Column */}
//             <div className="w-1/2 pr-4 border-r border-gray-700">
//               <h2 className="text-2xl font-semibold text-red-500 mb-4">Update Subscription</h2>
//               <p className="text-gray-400 mb-2">Current Plan: <span className="font-bold text-white">{user?.subscriptionPlan || "Basic"}</span></p>
//               <button
//                 onClick={handleUpgradeSubscription}
//                 className="w-full py-2 bg-red-500 rounded hover:bg-red-600"
//               >
//                 Pay & Upgrade
//               </button>
//             </div>

//             {/* Right Column */}
//             <div className="w-1/2 pl-4">
//               <h2 className="text-2xl font-semibold text-red-500 mb-4">Account Details</h2>
//               <p className="text-gray-400 mb-2">Username: <span className="font-bold text-white">{user?.username}</span></p>
//               <p className="text-gray-400 mb-2">Email: <span className="font-bold text-white">{user?.email}</span></p>
//               <p className="text-gray-400 mb-2">Password: <span className="font-bold text-white">******</span></p>

//               <div className="mt-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="w-full py-2 bg-red-500 rounded hover:bg-red-600"
//                 >
//                   Delete Account
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

//perfect allround

// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser"; // Assuming you have an auth store for managing user state
// import { Search, Menu, LogOut, X } from "lucide-react"; // Import X icon from lucide-react
// import { useContentStore } from "../store/content";
// import { useTranslation } from "react-i18next";

// const Navbar = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { user, logout } = useAuthStore();
//   const { setContentType } = useContentStore();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   const handleUpgradeSubscription = async () => {
//     if (user?.subscriptionPlan === "Basic") {
//       navigate("/payment", {
//         state: { email: user.email, username: user.username, plan: "Premium" },
//       });
//       try {
//         const response = await fetch("/api/v1/payment/update-subscription", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user?.token}`,
//           },
//           body: JSON.stringify({
//             email: user?.email,
//             subscriptionPlan: "Premium",
//           }),
//         });
//         if (response.ok) {
//           const { subscriptionPlan } = await response.json();
//           useAuthStore.setState((state) => ({
//             user: {
//               ...state.user,
//               subscriptionPlan,
//             },
//           }));
//           window.location.reload()

//         }
//       } catch (error) {
//         console.error("Error upgrading subscription:", error);
//       }
//     }
//   };

//   const handleDowngradeSubscription = async () => {
//     if (user?.subscriptionPlan === "Premium") {
//       try {
//         const response = await fetch("/api/v1/payment/update-subscription", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user?.token}`,
//           },
//           body: JSON.stringify({
//             email: user?.email,
//             subscriptionPlan: "Basic",
//           }),
//         });
//         if (response.ok) {
//           const { subscriptionPlan } = await response.json();
//           useAuthStore.setState((state) => ({
//             user: {
//               ...state.user,
//               subscriptionPlan,
//             },
//           }));
//           alert("Downgraded to Basic plan successfully.");
//           setIsModalOpen(false);
//           window.location.reload()
//         }
//       } catch (error) {
//         console.error("Error downgrading subscription:", error);
//       }
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       const response = await fetch("/api/v1/auth/delete", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user?.token}`,
//         },
//         body: JSON.stringify({ email: user?.email }),
//       });
//       if (response.ok) {
//         alert("Account deleted successfully.");
//         logout();
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to delete account: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       alert("An error occurred while trying to delete your account. Please try again.");
//     } finally {
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
//       <div className="flex items-center gap-10 z-50">
//         <Link to="/">
//           <img src="/logo2.png" alt="Logo" className="w-32 sm:w-40" />
//         </Link>
//         <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex gap-6 items-center">
//           <Link to="/" className="hover:text-red-500" onClick={() => setContentType("movie")}>{t("Movies")}</Link>
//           <Link to="/" className="hover:text-red-500" onClick={() => setContentType("tv")}>{t("TV Shows")}</Link>
//           <Link to="/history" className="hover:text-red-500">{t("Search History")}</Link>
//         </div>
//       </div>
//       <div className="flex gap-5 items-center z-50">
//         <Link to="/search">
//           <Search className="size-6 cursor-pointer hover:text-red-500" />
//         </Link>
//         <img
//           src="/avatar2.png"
//           alt="Avatar"
//           className="h-8 rounded cursor-pointer"
//           onClick={toggleModal}
//         />
//         <LogOut className="size-6 cursor-pointer hover:text-red-500" onClick={logout} />
//         <div className="sm:hidden">
//           <Menu className="size-6 cursor-pointer hover:text-red-500" />
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="bg-black text-white p-8 rounded-lg w-[90%] max-w-4xl flex relative">
//             {/* Close Button */}
//             <X
//               className="absolute top-2 right-2 cursor-pointer text-white"
//               onClick={() => setIsModalOpen(false)} // Close modal when clicked
//             />
//             {/* Left Column */}
//             <div className="w-1/2 pr-4 border-r border-gray-700">
//               <h2 className="text-2xl font-semibold text-red-500 mb-4">Update Subscription</h2>
//               <p className="text-gray-400 mb-2">Current Plan: <span className="font-bold text-white">{user?.subscriptionPlan || "Basic"}</span></p>
//               {user?.subscriptionPlan === "Basic" ? (
//                 <button
//                   onClick={handleUpgradeSubscription}
//                   className="w-full py-2 bg-red-500 rounded hover:bg-red-600"
//                 >
//                   Pay & Upgrade to Premium
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleDowngradeSubscription}
//                   className="w-full py-2 bg-yellow-500 rounded hover:bg-yellow-600"
//                 >
//                   Downgrade to Basic
//                 </button>
//               )}
//             </div>

//             {/* Right Column */}
//             <div className="w-1/2 pl-4">
//               <h2 className="text-2xl font-semibold text-red-500 mb-4">Account Details</h2>
//               <p className="text-gray-400 mb-2">Username: <span className="font-bold text-white">{user?.username}</span></p>
//               <p className="text-gray-400 mb-2">Email: <span className="font-bold text-white">{user?.email}</span></p>
//               {/* <p className="text-gray-400 mb-2">Password: <span className="font-bold text-white">******</span></p> */}

//               <div className="mt-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="w-full py-2 bg-red-500 rounded hover:bg-red-600"
//                 >
//                   Delete Account
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;






//correct

// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser"; // Assuming you have an auth store for managing user state
// import { Search, Menu, LogOut, X } from "lucide-react"; // Import X icon from lucide-react
// import { useContentStore } from "../store/content";
// import { useTranslation } from "react-i18next";

// const Navbar = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);
//   const { user, logout } = useAuthStore();
//   const { setContentType } = useContentStore();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const toggleModal = () => setIsModalOpen(!isModalOpen);
//   const toggleLearnMoreModal = () => setIsLearnMoreModalOpen(!isLearnMoreModalOpen);

//   const handleUpgradeSubscription = async () => {
//     if (user?.subscriptionPlan === "Basic") {
//       navigate("/payment", {
//         state: { email: user.email, username: user.username, plan: "Premium" },
//       });
//       try {
//         const response = await fetch("/api/v1/payment/update-subscription", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user?.token}`,
//           },
//           body: JSON.stringify({
//             email: user?.email,
//             subscriptionPlan: "Premium",
//           }),
//         });
//         if (response.ok) {
//           const { subscriptionPlan } = await response.json();
//           useAuthStore.setState((state) => ({
//             user: {
//               ...state.user,
//               subscriptionPlan,
//             },
//           }));
//           window.location.reload();
//         }
//       } catch (error) {
//         console.error("Error upgrading subscription:", error);
//       }
//     }
//   };

//   const handleDowngradeSubscription = async () => {
//     if (user?.subscriptionPlan === "Premium") {
//       try {
//         const response = await fetch("/api/v1/payment/update-subscription", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user?.token}`,
//           },
//           body: JSON.stringify({
//             email: user?.email,
//             subscriptionPlan: "Basic",
//           }),
//         });
//         if (response.ok) {
//           const { subscriptionPlan } = await response.json();
//           useAuthStore.setState((state) => ({
//             user: {
//               ...state.user,
//               subscriptionPlan,
//             },
//           }));
//           alert("Downgraded to Basic plan successfully.");
//           setIsModalOpen(false);
//           window.location.reload();
//         }
//       } catch (error) {
//         console.error("Error downgrading subscription:", error);
//       }
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       const response = await fetch("/api/v1/auth/delete", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user?.token}`,
//         },
//         body: JSON.stringify({ email: user?.email }),
//       });
//       if (response.ok) {
//         alert("Account deleted successfully.");
//         logout();
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to delete account: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error("Error deleting account:", error);
//       alert("An error occurred while trying to delete your account. Please try again.");
//     } finally {
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
//       <div className="flex items-center gap-10 z-50">
//         <Link to="/">
//           <img src="/logo2.png" alt="Logo" className="w-32 sm:w-40" />
//         </Link>
//         <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex gap-6 items-center">
//           <Link to="/" className="hover:text-red-500" onClick={() => setContentType("movie")}>{t("Movies")}</Link>
//           <Link to="/" className="hover:text-red-500" onClick={() => setContentType("tv")}>{t("TV Shows")}</Link>
//           <Link to="/history" className="hover:text-red-500">{t("Search History")}</Link>
//         </div>
//       </div>
//       <div className="flex gap-5 items-center z-50">
//         <Link to="/search">
//           <Search className="size-6 cursor-pointer hover:text-red-500" />
//         </Link>
//         <img
//           src="/avatar2.png"
//           alt="Avatar"
//           className="h-8 rounded cursor-pointer"
//           onClick={toggleModal}
//         />
//         <LogOut className="size-6 cursor-pointer hover:text-red-500" onClick={logout} />
//         <div className="sm:hidden">
//           <Menu className="size-6 cursor-pointer hover:text-red-500" />
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
//           <div className="bg-black text-white p-12 rounded-lg w-[80%] max-w-5xl flex relative">
//             <X
//               className="absolute top-4 right-4 cursor-pointer text-white"
//               onClick={() => setIsModalOpen(false)}
//             />
        
// <div className="w-1/2 pr-6 border-r border-gray-700">
//   <h2 className="text-3xl font-semibold text-red-500 mb-6">Update Subscription</h2>
//   <p className="text-gray-400 mb-4">Current Plan: <span className="font-bold text-white">{user?.subscriptionPlan || "Basic"}</span></p>

//   {/* Learn More Link */}
//   <Link
//     to="#"
//     onClick={toggleLearnMoreModal}
//     className="text-sm text-red-500 underline mb-4 inline-block hover:text-red-700"
//   >
//     {t("Learn More about Subscriptions")}
//   </Link>

//   {/* Button */}
//   {user?.subscriptionPlan === "Basic" ? (
//     <button
//       onClick={handleUpgradeSubscription}
//       className="w-full py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300"
//     >
//       Pay & Upgrade to Premium
//     </button>
//   ) : (
//     <button
//       onClick={handleDowngradeSubscription}
//       className="w-full py-3 bg-yellow-600 rounded hover:bg-yellow-700 transition duration-300"
//     >
//       Downgrade to Basic
//     </button>
//   )}
// </div>

//             <div className="w-1/2 pl-6">
//               <h2 className="text-3xl font-semibold text-red-500 mb-6">Account Details</h2>
//               <p className="text-gray-400 mb-4">Username: <span className="font-bold text-white">{user?.username}</span></p>
//               <p className="text-gray-400 mb-4">Email: <span className="font-bold text-white">{user?.email}</span></p>
//               <div className="mt-6">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="w-full py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300"
//                 >
//                   Delete Account
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {isLearnMoreModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
//           <div className="bg-black text-white p-12 rounded-lg w-[80%] max-w-4xl flex flex-col relative">
//             <X
//               className="absolute top-4 right-4 cursor-pointer text-white"
//               onClick={toggleLearnMoreModal}
//             />
//             <h2 className="text-4xl font-semibold text-center text-red-500 mb-6">
//               {t("Learn More about Subscription Plans")}
//             </h2>
//             <div className="text-lg text-gray-400">
//               <p className="mb-4">{t("The Basic plan includes ads, while the Premium plan is ad-free.")}</p>
//               <p className="mb-4">{t("Premium subscribers enjoy faster streaming and an overall better experience.")}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Search, Menu, LogOut, X, ArrowUpRight, ArrowDown } from "lucide-react";
import { useContentStore } from "../store/content";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // State to track active link

  const { user, logout } = useAuthStore();
  const { setContentType } = useContentStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleLearnMoreModal = () => setIsLearnMoreModalOpen(!isLearnMoreModalOpen);

  const handleUpgradeSubscription = async () => {
    if (user?.subscriptionPlan === "Basic") {
      navigate("/payment", {
        state: { email: user.email, username: user.username, plan: "Premium" },
      });
      try {
        const response = await fetch("/api/v1/payment/update-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            email: user?.email,
            subscriptionPlan: "Premium",
          }),
        });
        if (response.ok) {
          const { subscriptionPlan } = await response.json();
          useAuthStore.setState((state) => ({
            user: {
              ...state.user,
              subscriptionPlan,
            },
          }));
          window.location.reload();
        }
      } catch (error) {
        console.error("Error upgrading subscription:", error);
      }
    }
  };

  const handleDowngradeSubscription = async () => {
    if (user?.subscriptionPlan === "Premium") {
      try {
        const response = await fetch("/api/v1/payment/update-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            email: user?.email,
            subscriptionPlan: "Basic",
          }),
        });
        if (response.ok) {
          const { subscriptionPlan } = await response.json();
          useAuthStore.setState((state) => ({
            user: {
              ...state.user,
              subscriptionPlan,
            },
          }));
          alert("Downgraded to Basic plan successfully.");
          setIsModalOpen(false);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error downgrading subscription:", error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/v1/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ email: user?.email }),
      });
      if (response.ok) {
        alert("Account deleted successfully.");
        logout();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete account: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while trying to delete your account. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img src="/logo2.png" alt="Logo" className="w-32 sm:w-40" />
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex gap-6 items-center">
          <Link
            to="/"
            className={`hover:text-red-500 ${activeLink === "movies" ? "text-red-500 font-bold" : "text-white"}`}
            onClick={() => {
              setContentType("movie");
              setActiveLink("movies");
            }}
          >
            {t("Movies")}
          </Link>
          <Link
            to="/"
            className={`hover:text-red-500 ${activeLink === "tv" ? "text-red-500 font-bold" : "text-white"}`}
            onClick={() => {
              setContentType("tv");
              setActiveLink("tv");
            }}
          >
            {t("TV Shows")}
          </Link>
          <Link
            to="/history"
            className={`hover:text-red-500 ${activeLink === "history" ? "text-red-500 font-bold" : "text-white"}`}
            onClick={() => setActiveLink("history")}
          >
            {t("Search History")}
          </Link>
        </div>
      </div>

      <div className="flex gap-5 items-center z-50">
        <Link to="/search">
          <Search className="size-6 cursor-pointer hover:text-red-500" />
        </Link>
        <img
          src="/avatar2.png"
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
          onClick={toggleModal}
        />
        <LogOut className="size-6 cursor-pointer hover:text-red-500" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer hover:text-red-500" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-black text-white p-10 rounded-lg w-[80%] max-w-4xl flex relative shadow-lg border-2 border-white">
            <X
              className="absolute top-4 right-4 cursor-pointer text-white"
              onClick={() => setIsModalOpen(false)}
            />

            <div className="w-full lg:w-1/2 pr-6 border-r border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-10 text-center">Update Subscription</h2>
              <p className="text-gray-400 mb-4 text-center">
                Current Plan: <span className="font-bold text-white">{user?.subscriptionPlan || "Basic"}</span>
              </p>

              <div className="text-center mb-10">
                <Link
                  to="#"
                  onClick={toggleLearnMoreModal}
                  className="text-sm text-red-500 underline hover:text-red-700 mb-10"
                >
                  {t("Learn More about Subscriptions")}
                </Link>
              </div>

              {user?.subscriptionPlan === "Basic" ? (
                <button
                  onClick={handleUpgradeSubscription}
                  className="w-full py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowUpRight className="w-5 h-5" />
                  Pay & Upgrade to Premium
                </button>
              ) : (
                <button
                  onClick={handleDowngradeSubscription}
                  className="w-full py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowDown className="w-5 h-5" />
                  Downgrade to Basic
                </button>
              )}
            </div>


      <div className="w-full lg:w-1/2 pl-6 mt-8 lg:mt-0 ">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Account Details</h2>
        <p className="text-gray-400 mb-4 text-center">
          Username: <span className="font-bold text-white">{user?.username}</span>
        </p>
        <p className="text-gray-400 mb-10 text-center">
          Email: <span className="font-bold text-white mb-10">{user?.email}</span>
        </p>
        <div className="mt-6">
          <button
            onClick={handleDeleteAccount}
            className="w-full py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* {isLearnMoreModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
    <div className="bg-black text-white p-10 rounded-lg w-[80%] max-w-4xl flex flex-col relative shadow-lg">
      <X
        className="absolute top-4 right-4 cursor-pointer text-white"
        onClick={toggleLearnMoreModal}
      />
      <h2 className="text-4xl font-semibold text-center text-red-500 mb-6">{t("Learn More about Subscription Plans")}</h2>
      <div className="text-lg text-gray-400">
        <p className="mb-4">{t("The Basic plan includes ads, while the Premium plan is ad-free.")}</p>
        <p className="mb-4">{t("Premium subscribers enjoy faster streaming and an overall better experience.")}</p>
      </div>
    </div>
  </div>
)} */}

{isLearnMoreModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
    <div className="bg-black text-white rounded-lg max-w-md p-8 space-y-6 shadow-lg border-2 border-y-red-600">
      <h2 className="text-2xl font-extrabold text-center">{t("Learn More about Subscription Plans")}</h2>

      {/* Basic Plan Section */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{t("Basic Plan")}</h3>
        <p className="text-sm">{t("Enjoy a free plan with limited access:")}</p>
        <ul className="list-disc list-inside text-sm">
          <li>{t("Contains ads and a slower streaming experience")}</li>
        </ul>
      </div>

      {/* Premium Plan Section */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{t("Premium Plan")}</h3>
        <p className="text-sm">{t("For a seamless experience, choose the Premium Plan:")}</p>
        <ul className="list-disc list-inside text-sm">
          <li>{t("Ad-free streaming at just Rs. 1000 per month")}</li>
          <li>{t("Faster streaming with no buffering")}</li>
        </ul>
      </div>

      {/* Close Button */}
      <button
        onClick={toggleLearnMoreModal}
        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-lg font-semibold transition-all duration-300"
      >
        {t("Close")}
      </button>
    </div>
  </div>
)}


      
    </header>
  );
};

export default Navbar;
