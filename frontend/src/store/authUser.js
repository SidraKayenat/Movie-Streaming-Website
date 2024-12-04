import {create} from "zustand";
import toast from 'react-hot-toast';
import axios from 'axios';

export const useAuthStore=create((set)=>
   ({
        user:null,
        isSigningUp:false,
        isCheckingAuth:true,
        isLoggingOut:false,
        isLoggingIn:false,
        
        signup:async(credentials)=>{
            set({isSigningUp:true})
            try {
                const response=await axios.post("/api/v1/auth/signup",credentials);
                set({user:response.data.user,isSigningUp:false})
                toast.success("Account Created successfully")      
            } catch (error) {
              toast.error(error.response.data.message ||  "Signup failed") 
              set({isSigningUp:false,user:null})
            }
        },




        login: async ({ email, password }) => {
            set({ isLoggingIn: true });
            try {
                // Send email and password in the request body
                const response = await axios.post("/api/v1/auth/login", { email, password });
        
                // Update state with the user data returned from the backend
                set({ user: response.data.user, isLoggingIn: false });
        
                toast.success("Logged in successfully");
            } catch (error) {
                // Handle errors gracefully
                const errorMessage = error.response?.data?.message || "Login failed";
                toast.error(errorMessage);
        
                // Reset state on failure
                set({ isLoggingIn: false, user: null });
            }
        },
        






        logout:async()=>{
            set({isLoggingOut:true})
            try {
            await axios.post("/api/v1/auth/logout");
            set({user:null,isLoggingOut:false})
            toast.success("Logged out successfully")
        } catch (error) {
            set({isLoggingOut:false,user:null})
            toast.error(error.response.data.message ||  "An error occured")
        }},






        authCheck:async()=>{
            set({isCheckingAuth:true})
            try {
                const response=await axios.get("/api/v1/auth/authCheck");
                set({user:response.data.user,isCheckingAuth:false})
            } catch (error) {
                set({user:null,isCheckingAuth:false})
               
            }
        },
    }
   ))