import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import Navbar from "../navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

export default function Bookings (){

    const [bookings,setbookings]= useState([])
    
    const fetchBookings = async () => {
        try {
        const res = await api.get('booking/getallbookings')
        console.log(res.data)
        setbookings(res.data.booking)
        toast.success('booking fetched successfully')
    } catch (error) {
        console.log(error.message)
    }
    }

    useEffect(()=>{
        fetchBookings()
    },[])

    return(
        <>
        <Navbar/>
       <h1> this is a booking page  </h1> 
        {/* show bookings */}
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>BookingId</TableCell>
              <TableCell align="right">#of guests</TableCell>
              <TableCell align="right">chekIn</TableCell>
              <TableCell align="right">checkOut</TableCell>
               <TableCell align="right">status</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item._id}
                </TableCell>
                <TableCell align="right">{item.guests}</TableCell>
                <TableCell align="right">{item.checkIn}</TableCell>
                <TableCell align="right">{item.checkOut}</TableCell>
                <TableCell align="right">{item.status}</TableCell>
                <TableCell>
                  <Button align="right" onClick={() => Delete(item._id)}>
                    delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    align="right"
                    
                  >
                    update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </>
    )
}