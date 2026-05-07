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
import Navbar from "../navbar/Navbar";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RoomPage from "./RoomPage";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function HotelPage() {
  const [rooms, setRooms] = useState([]);

    const navigate = useNavigate()

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms/getrooms");
      console.log(res.data);
      setRooms(res.data.rooms);
      console.log(rooms);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
    <Navbar/>
    <br />
      <Card sx={{width: "70vw"}}>
        {/* Large Image Area */}
        <CardMedia
          component="img"
          height="240"
          image="https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg"
          alt="Luxury Hotel Exterior"
        />

        <CardContent>
          {/* Hotel Name */}
          <Typography gutterBottom variant="h5" component="div">
            The AK Hotel, Jordan
          </Typography>

          {/* Rating Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating name="read-only" value={5} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              (5.0 stars)
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* show rooms in home page */}

      <br />
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {rooms?.map((room) => (
            <Grid size={{ xs: 6, md:4 }} key={room._id}>
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={room.images[0]}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {room.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {room.discription}
                    </Typography>
                    {/* <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {product.category}
                    </Typography> */}
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      price: {room.price}$
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Availability: {room.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        console.log(room._id);
                      }}
                    >
                      Book
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        console.log(room._id);
                    
                        navigate(`/room/${room._id}`)
                      }}
                    >
                      show details
                    </Button>
                  </CardActions>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
