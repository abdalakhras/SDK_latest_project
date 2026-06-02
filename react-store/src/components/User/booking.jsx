import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import Navbar from "../navbar/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Rating from "@mui/material/Rating";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Booking() {
  const [booking, setbooking] = useState([]);

  const [value, setValue] = React.useState(3);
  const [showModal, setShowModal] = useState(false);

  const fetchBooking = async () => {
    try {
      const res = await api.get("/booking/getbooking");
      console.log(res.data);
      setbooking(res.data.booking);
      toast.success("booking fetched successfully");
    } catch (error) {
  if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  //submit a review :
  const [reviewForm, setReviewForm] = useState({
    room: "",
    title: "",
    content: "",
    rating: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/reviews/createreview", reviewForm);
      console.log(res.data.message);
      toast.success("review submited successfully");
      setShowModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <>
      <Navbar />
      <h1> this is Your booking page </h1>
      <br />
      <br />
      {/* showing bookings */}
      {booking.length===0 &&(
        <h2>no booking for this user</h2>
      )}
      {booking.map((item) => (
        <ul key={item._id}>
          {item.room?.images?.map((image, index) => (
            <div key={index}>
              <img src={`${image}`} width={"250px"} />
            </div>
          ))}
          <li>
            check in : {new Date(item.checkIn).toLocaleDateString("en-GB")}
          </li>
          <li>
            check out : {new Date(item.checkOut).toLocaleDateString("en-GB")}
          </li>
          <li>booking status : {item.status}</li>
          <li>total amount: {item.totalAmount}$</li>
          {item.status === "Pending" && (
            <Button
              onClick={() => {
                setShowModal(true);
                setReviewForm({ ...reviewForm, room: item.room?._id });
                console.log(reviewForm);
              }}
            >
              write a review
            </Button>
          )}
        </ul>
      ))}
      <br />
      <br />
      {/* write a review */}
      <div>
        <Modal
          open={showModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              write a review
            </Typography>

            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
              onSubmit={onSubmit}
            >
              <TextField
                variant="standard"
                id="Title"
                label="reveiw title"
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, title: e.target.value })
                }
              />
              <TextField
                variant="standard"
                id="content"
                label="review content"
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, content: e.target.value })
                }
              />
              <Box sx={{ "& > legend": { mt: 2 } }}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    setReviewForm({ ...reviewForm, rating: newValue });
                  }}
                />
              </Box>
              <br />
            <Button type="submit">submit</Button>
            <Button onClick={() => setShowModal(false)}>Close</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
