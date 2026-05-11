import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import Navbar from "../navbar/Navbar";

export default function Booking (){

    const [booking,setbooking]= useState({})
    
    const fetchBooking = async () => {
        try {
        const res = await api.get('booking/getbooking')
        console.log(res.data)
        setbooking(res.data.booking)
        toast.success('booking fetched successfully')
    } catch (error) {
        console.log(error.message)
    }
    }

    useEffect(()=>{
        fetchBooking()
    },[])

    return(
        <>
        <Navbar/>
       <h1> this is a booking page  </h1> 
       {Object.keys(booking).length == 0 && <div>no bookings for you yet</div>}    
        </>
    )
}