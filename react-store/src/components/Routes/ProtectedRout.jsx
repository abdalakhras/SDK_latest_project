import React from "react";
import toast from "react-hot-toast"
import { useAuth } from "../Context/Authcontext";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoute(){

const {user,loading} = useAuth()

if(loading){
    return <p>loading...</p>
}
if(!user){
    return (
    <>
    {toast.error('please login to continue')}
   {<Navigate to='/login'/> }
    
    </>
    )
}

    return <Outlet/>
}
export default ProtectedRoute