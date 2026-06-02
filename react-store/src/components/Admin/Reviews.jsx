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

export default function Reviews() {
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  //  fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await api.get("reviews/getRivews");
      //    console.log(res.data);
      console.log(res.data.reviews);
      setReviews(res.data.reviews);
      toast.success("reviews fetched successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  //    update Reviews :
  const [updateReview, setUpdateReview] = useState({
    id: "",
    status: "",
  });
  const update = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/reviews/updatereview", updateReview);
      console.log(res.data.review);
      fetchReviews();
      toast.success("review's updated");
      setShowModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // delete review :
  const Delete = async (id) => {
    const del = window.confirm("Are you sure you want to proceed?");
    if (del) {
      try {
        const res = await api.delete(`/reviews/delReview/${id}`);
        console.log(res.data.message);
        fetchReviews();
        toast.success("review deleted successfully");
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Navbar />
      <h1>this is a review page</h1>
      {/* show reviews */}
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ReviewsId</TableCell>
              <TableCell align="right">user name</TableCell>
              <TableCell align="right">Room</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">content</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">rating</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow
                key={review._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {review._id}
                </TableCell>
                <TableCell align="right">{review.user?.username}</TableCell>
                <TableCell align="right">{review.room?.name}</TableCell>
                <TableCell align="right">{review.title}</TableCell>
                <TableCell align="right">{review.content}</TableCell>
                <TableCell align="right">{review.status}</TableCell>
                <TableCell align="right">{review.rating}</TableCell>
                <TableCell>
                  <Button
                    align="right"
                    onClick={() => {
                      Delete(review._id);
                    }}
                  >
                    delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    align="right"
                    onClick={() => {
                      setShowModal(true);
                      setUpdateReview({ ...updateReview, id: review._id });
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

      {/* update Reviews via modal */}
      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            update Review Status
          </Typography>
          <br />
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            onSubmit={update}
          >
            {/* select Revwies status */}

            <Box sx={{ minWidth: 120 }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={updateReview.status}
                  label="status"
                  onChange={(e) =>
                    setUpdateReview({
                      ...updateReview,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
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
