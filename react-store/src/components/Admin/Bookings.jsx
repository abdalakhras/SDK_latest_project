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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

export default function Bookings() {
  const [bookings, setbookings] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await api.get("booking/getallbookings");
      console.log(res.data);
      setbookings(res.data.booking);
      toast.success("booking fetched successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // update booking Status

  const [checkIn, setCheckin] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const [updateBooking, setUpdateBooking] = useState({
    id: "",
    checkIn: checkIn,
    checkOut: checkOut,
    guests: "",
    totalAmount: "",
    status: "",
  });
  const [guests, setGuests] = useState(1);
  const [amount, setAmount] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("booking/updateBooking", updateBooking);
      console.log(res.data.message);
      toast.success("booking status updated");
      fetchBookings();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <h1> this is a booking page </h1>
      {/* show bookings */}
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>BookingId</TableCell>
              <TableCell align="right">user name</TableCell>
              <TableCell align="right">#of guests</TableCell>
              <TableCell align="right">chekIn</TableCell>
              <TableCell align="right">checkOut</TableCell>
              <TableCell align="right">toal Amount</TableCell>
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
                <TableCell align="right">{item.user.username}</TableCell>
                <TableCell align="right">{item.guests}</TableCell>
                <TableCell align="right">{item.checkIn}</TableCell>
                <TableCell align="right">{item.checkOut}</TableCell>
                <TableCell align="right">{item.totalAmount}</TableCell>
                <TableCell align="right">{item.status}</TableCell>
                <TableCell>
                  <Button align="right" onClick={() => Delete(item._id)}>
                    delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    align="right"
                    onClick={() => {
                      setShowModal(true);
                      setGuests(item.guests);
                      setAmount(item.totalAmount);
                      setUpdateBooking({
                        ...updateBooking,
                        id: item._id,
                        status: item.status,
                      });
                      console.log(updateBooking);
                    }}
                  >
                    update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* update rooms via modal */}
      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            update rooms
          </Typography>
          <br />
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            {/* update date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="checkIn"
                value={checkIn}
                onChange={(newValue) => setCheckin(newValue)}
              />
            </LocalizationProvider>
            <br />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="checkOut"
                value={checkOut}
                minDate={checkIn}
                onChange={(newValue) => setCheckOut(newValue)}
              />
            </LocalizationProvider>

            <TextField
              id="update-guests"
              label="guests"
              variant="standard"
              defaultValue={guests}
              onChange={(e) =>
                setUpdateBooking({ ...updateBooking, guests: e.target.value })
              }
            />
            <TextField
              id="update-totalAmount"
              label="totalAmount"
              variant="standard"
              defaultValue={amount}
              onChange={(e) =>
                setUpdateBooking({
                  ...updateBooking,
                  totalAmount: e.target.value,
                })
              }
            />
            {/* select booking status */}

            <Box sx={{ minWidth: 120 }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updateBooking.status}
                  label="status"
                  onChange={(e) =>
                    setUpdateBooking({
                      ...updateBooking,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <br />
            <Button type="submit">submit</Button>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
