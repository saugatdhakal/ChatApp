import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set)=>({
    messages:[],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async ()=>{
        set({isUserLoading: true});
        try{
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
            console.log(res.data);
        }
        catch(err){
            toast.error(error.response.data.message);
        }
        finally{
            set({isUserLoading:false});
        }
    },

    getMessages: async ()=>{
        set({isMessagesLoading:true}); 
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({message: res.data});
        }catch(err){
            toast.error(error.response.data.message);
        }
        finally{
            set({isMessagesLoading:false})
        }

    },
    setSelectedUser : (user)=>set({selectedUser:user})
}));