import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers: [],

    checkAuth: async()=>{
        try{
            const res = await axiosInstance.get('/auth/check');
            set({authUser:res.data});
        }
        catch(err){
            console.error("Error on checkAuth", err);
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth:false});
        }
    },
    signup: async (data)=>{
        set({isSigningUp:true});
        try{
            const res= await axiosInstance.post('/auth/signup',data);
            set({authUser:res.data});
            toast.success("Account created Successfully");
        }
        catch(err){
            toast.error(err.response.data.message);
        }
        finally{
            set({isSigningUp:false});
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true});
        try{
            const res = await axiosInstance.post('/auth/login',data);
            set({authUser:res.data});
            toast.success("Account LoggedIn successfully");
        }
        catch(err){
            toast.error(err.response.data.message);
        }
        finally{
            set({isLoggingIn:false});
        }
    },
    logout: async()=>{
        try{
            await axiosInstance.post('/auth/logout');
            set({authUser:null});
            toast.success("logout Successfully");
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    },
    updateProfile: async (data)=>{
        set({isUpdatingProfile:true});
        try{
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("profile update successfully");
        }
        catch(err){
            toast.error(err.response.data.message);
        }
        finally{
            set({isUpdatingProfile:false});
        }
    }
}

));

