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

export default function Rooms() {
  const [showAddRooms, setShowAddRooms] = useState(false);
  const [showModal, setShowModal] = React.useState(false);

  // add rooms
  const [addrooms, setAddrooms] = useState({
    name: "",
    type: "",
    price: "",
    capacity: "",
    view: "",
    images: ["", "", ""],
    statsus: "",
    discription: "",
  });

  const Addroom = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/rooms/createroom", addrooms);
      console.log(res.message);
      setShowAddRooms(false);
      toast.success("room added successfully");
      fetchrooms();
    } catch (error) {
      console.log(error.message);
    }
  };

  //   updateRooms
  const [udpateStatus, setUpdpateStatus] = React.useState("");

  const handleChange = (event) => {
    setUpdpateStatus(event.target.value);
  };

  const [updateRooms, setUpdateRrooms] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    capacity: "",
    view: "",
    images: ["", "", ""],
    statsus: "",
    discription: "",
  });
  //   const [id,setId] =useState('')
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [view, setView] = useState("");
  const [images, setImages] = useState(["", "", ""]);
  const [status, setStatus] = useState("");
  const [discription, setDiscription] = useState("");

  const updateRoom = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/rooms/updateroom", updateRooms);
      console.log(res.data.message);
      fetchrooms();
      setShowModal(false);
      toast.success("room updated successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  //   fetch rooms
  const [rooms, setRooms] = useState([]);
  const fetchrooms = async () => {
    try {
      const res = await api.get("/rooms/getrooms");
      console.log(res.data);
      setRooms(res.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchrooms();
  }, []);

  return (
    <>
      <Navbar />
      <h1> this is Rooms page </h1>
      {/* add rooms */}
      <br />
      <br />
      <Button onClick={() => setShowAddRooms((prev) => !prev)}>
        {showAddRooms ? "cancel" : "add rooms"}
      </Button>
      {showAddRooms && (
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={Addroom}
        >
          <TextField
            id="room-name"
            label="name"
            variant="standard"
            onChange={(e) => setAddrooms({ ...addrooms, name: e.target.value })}
          />
          <TextField
            id="room-type"
            label="type"
            variant="standard"
            onChange={(e) => setAddrooms({ ...addrooms, type: e.target.value })}
          />
          <TextField
            id="room-price"
            label="price"
            variant="standard"
            onChange={(e) =>
              setAddrooms({ ...addrooms, price: e.target.value })
            }
          />
          <TextField
            id="room-capacity"
            label="capacity"
            variant="standard"
            onChange={(e) =>
              setAddrooms({ ...addrooms, capacity: e.target.value })
            }
          />
          <TextField
            id="room-view"
            label="view"
            variant="standard"
            onChange={(e) => setAddrooms({ ...addrooms, view: e.target.value })}
          />
          {/* add more for images */}
          <TextField
            id="room-images"
            label="image 1"
            variant="standard"
            onChange={(e) =>
              setAddrooms({
                ...addrooms,
                images: [
                  e.target.value,
                  addrooms.images[1],
                  addrooms.images[2],
                ],
              })
            }
          />
          <TextField
            id="room-images"
            label="image 2"
            variant="standard"
            onChange={(e) =>
              setAddrooms({
                ...addrooms,
                images: [
                  addrooms.images[0],
                  e.target.value,
                  addrooms.images[2],
                ],
              })
            }
          />
          <TextField
            id="room-images"
            label="image 3"
            variant="standard"
            onChange={(e) =>
              setAddrooms({
                ...addrooms,
                images: [
                  addrooms.images[0],
                  addrooms.images[1],
                  e.target.value,
                ],
              })
            }
          />

          <TextField
            id="room-status"
            label="status"
            variant="standard"
            onChange={(e) =>
              setAddrooms({ ...addrooms, statsus: e.target.value })
            }
          />
          <TextField
            id="room-discription"
            label="discription"
            variant="standard"
            onChange={(e) =>
              setAddrooms({ ...addrooms, discription: e.target.value })
            }
          />
          <br />
          <Button type="submit">submit</Button>
        </Box>
      )}
      <br />
      <br />

      {/* show Rooms */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>RoomId</TableCell>
              <TableCell align="right">Room name</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">discription</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">capacity</TableCell>
              <TableCell align="right">type</TableCell>
              <TableCell align="right">view</TableCell>
              <TableCell align="right">image</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow
                key={room._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {room._id}
                </TableCell>
                <TableCell align="right">{room.name}</TableCell>
                <TableCell align="right">{room.price}$</TableCell>
                <TableCell align="right">{room.discription}</TableCell>
                <TableCell align="right">{room.status}</TableCell>
                <TableCell align="right">{room.capacity}</TableCell>
                <TableCell align="right">{room.type}</TableCell>
                <TableCell align="right">{room.view}</TableCell>
                <TableCell align="right">
                  <img
                    src={room.images?.[0]}
                    width={"200px"}
                    alt="cant show image"
                  />
                </TableCell>
                <TableCell>
                  <Button>delete</Button>
                </TableCell>
                <TableCell>
                  <Button
                    align="right"
                    onClick={() => {
                      setShowModal(true);
                      setUpdateRrooms({ ...updateRooms, id: room._id });
                      setName(room.name);
                      setType(room.type);
                      setPrice(room.price);
                      setCapacity(room.capacity);
                      setDiscription(room.discription);
                      setView(room.view);
                      setStatus(room.status);
                      setImages([
                        room.images[0],
                        room.images[1],
                        room.images[2],
                      ]);
                      console.log(id)
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

      {/* update rooms via mocal */}
      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            update rooms
          </Typography>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            onSubmit={updateRoom}
          >
            <TextField
              id="update-name"
              label="name"
              variant="standard"
              defaultValue={name}
              onChange={(e) =>
                setUpdateRrooms({ ...updateRooms, name: e.target.value })
              }
            />
            <TextField
              id="update-type"
              label="type"
              variant="standard"
              defaultValue={type}
              onChange={(e) =>
                setUpdateRrooms({ ...updateRooms, type: e.target.value })
              }
            />
            <TextField
              id="update-price"
              label="price"
              variant="standard"
              defaultValue={price}
              onChange={(e) =>
                setUpdateRrooms({ ...updateRooms, price: e.target.value })
              }
            />
            <TextField
              id="update-capacity"
              label="capacity"
              variant="standard"
              defaultValue={capacity}
              onChange={(e) =>
                setUpdateRrooms({ ...updateRooms, capacity: e.target.value })
              }
            />
            <TextField
              id="update-view"
              label="view"
              variant="standard"
              defaultValue={view}
              onChange={(e) =>
                setUpdateRrooms({ ...updateRooms, view: e.target.value })
              }
            />
            {/* select availability */}

            <Box sx={{ minWidth: 120 }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={udpateStatus}
                  label="status"
                  onChange={handleChange}
                  defaultValue={status}
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Booked">Booked</MenuItem>
                  <MenuItem value="Maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              id="update-discription"
              label="discription"
              variant="standard"
              defaultValue={discription}
              onChange={(e) =>
                setUpdateRrooms({ ...updateRooms, discription: e.target.value })
              }
            />
            <TextField
              id="update-image"
              label="image1"
              variant="standard"
              defaultValue={images[0]}
              onChange={(e) =>
                setUpdateRrooms({
                  ...updateRooms,
                  images: [
                    e.target.value,
                    updateRooms.images[1],
                    updateRooms[2],
                  ],
                })
              }
            />
            <TextField
              id="update-image"
              label="image2"
              variant="standard"
              defaultValue={images[1]}
              onChange={(e) =>
                setUpdateRrooms({
                  ...updateRooms,
                  images: [
                    updateRooms.images[0],
                    e.target.value,
                    updateRooms.images[2],
                  ],
                })
              }
            />
            <TextField
              id="update-image"
              label="image3"
              variant="standard"
              defaultValue={images[2]}
              onChange={(e) =>
                setUpdateRrooms({
                  ...updateRooms,
                  images: [
                    updateRooms.images[0],
                    updateRooms.images[1],
                    e.target.value,
                  ],
                })
              }
            />
            <br />
            <Button type="submit">submit</Button>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
