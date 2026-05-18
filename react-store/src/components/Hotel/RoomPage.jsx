import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
} from "@mui/material";

import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import taost, { toast } from "react-hot-toast";

export default function RoomPage() {
  const navigate = useNavigate();
  const [checkIn, setCheckin] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  //   console.log("checkIn",checkIn)
  //    console.log("checkIn to new date",new Date(checkIn))
  //   console.log("checkOut",checkOut)
  // console.log("checkOut to new date",new Date(checkOut))

  const { id } = useParams();
  // console.log("params:", useParams());
  // console.log("room id :", id);

  const [room, setRoom] = useState();
  // console.log(Number((new Date(checkOut) - new Date(checkIn))/(24*60*60*1000)*(room?.price)))

  const fetchroom = async () => {
    try {
      const res = await api.get(`/rooms/findbyid/${id}`);
      console.log(res.data);
      console.log(res.data.room);
      setRoom(res.data.room);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchroom();
  }, []);

  // post the booking

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/booking/book", {
        room: id,
        checkIn: checkIn.format("YYYY-MM-DD"),
        checkOut: checkOut.format("YYYY-MM-DD"),
        guests: guests,
        totalAmount: Number(
          ((new Date(checkOut) - new Date(checkIn)) / (24 * 60 * 60 * 1000)) *
            room?.price,
        ),
      });
      console.log(res.data);
      toast.success("room booked successfully");
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.status == 400) {
        toast.error("room is already booked");
      }
    }
  };
  return (
    <>
      <h1>Room Page</h1>
      <Button
        onClick={() => {
          navigate("/hotelpage");
        }}
      >
        back to hotelpage
      </Button>
      <ImageList
        sx={{ width: 500, height: 450 }}
        cols={2}
        gap={8}
        rowHeight={164}
      >
        {room?.images?.map((image, index) => (
          <ImageListItem key={index}>
            <img
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              alt="cannot show photo"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div>{room?.discription}</div>
      <br />
      {/* booking the room */}
      <h3>book this room</h3>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          variant="standard"
          id="guests"
          label="number of guests"
          onChange={(e) => setGuests(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="checkIn"
            value={checkIn}
            onChange={(newValue) => setCheckin(newValue)}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="checkOut"
            value={checkOut}
            onChange={(newValue) => setCheckOut(newValue)}
            minDate={checkIn}
          />
        </LocalizationProvider>
        <Button type="submit">book</Button>
        <div>
          total price :{" "}
          {Number(
            ((new Date(checkOut) - new Date(checkIn)) / (24 * 60 * 60 * 1000)) *
              room?.price,
          )}{" "}
        </div>
      </Box>
    </>
  );
}
