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

import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function RoomPage() {
  const { id } = useParams();
  console.log("params:", useParams());
  console.log("room id :", id);

  const [room, setRoom] = useState();

  const fetchroom = async () => {
    try {
      const res = await api.get(`/rooms/findbyid/${id}`);
      console.log(res.data);
      console.log(res.data.room);
      setRoom(res.data.room)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchroom();
  }, []);
  return (
    <>
      <h1>Room Page</h1>
     <ImageList sx={{ width: 500, height: 450 }} cols={2} gap={8} rowHeight={164}>
      {room?.images?.map((image,index) => (
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
         
    </>
  );
}
