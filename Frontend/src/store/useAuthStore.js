import { create } from "zustand";

export const useAuthStore = create((set)=>({
    authUser:{name:"Ahmed",_id:123,age:24},
    isLoggedIn:false,
    IsLoading: false,

    Login:()=>{
        console.log("We just logged in");
        set({isLoggedIn:true,IsLoading:true});
        
    },
}));