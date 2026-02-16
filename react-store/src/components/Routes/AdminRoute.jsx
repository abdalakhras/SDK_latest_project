import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";
import toast from "react-hot-toast";


function AdminRoute (){

    const {user,loading} = useAuth()

    const role = user?.role

    if(loading){
        return <p>Loading ....</p>
    }
    if(role!=="Admin") 
    return (
<>
{toast.error('Access denid , only for Admin')} 
{<Navigate to='/login'/> }

</>
    )

        return <Outlet/>
}
export default AdminRoute