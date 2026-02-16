import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../../services/api";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import React from "react";
import Typography from "@mui/material/Typography";
import { Navigate,useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";
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

export default function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [addForm, setAddForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [updateForm, setUpdateForm] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
  });
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/users/creatuserByAdmin", addForm);
      console.log(data.message);
      getUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await api.get("/users/getusers");
      setUsers(data);
      // console.log(data)
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const Delete = async (id) => {
    const confirmDelete = window.confirm("are u sure you want to delete ? ");
    if (confirmDelete) {
      try {
        const { data } = await api.delete(`/users/delete/${id}`);
        console.log(data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.put("/users/updateByAdmin", updateForm);
      console.log(data.message);
      getUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <Navbar/>
    {/* <Button onClick={()=> navigate('/adminProducts')}>go to products</Button>
     <Button onClick={()=> navigate('/categories')}>go to categories</Button> */}
      {/* adding user */}
      <Button onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? "cnacel" : "add user"}
      </Button>

      {showForm && (
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={addUser}
        >
          <TextField
            id="username"
            label="username"
            variant="standard"
            onChange={(e) =>
              setAddForm({ ...addForm, username: e.target.value })
            }
          />
          <TextField
            id="email"
            label="email"
            variant="standard"
            onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
          />
          <TextField
            id="password"
            label="password"
            variant="standard"
            onChange={(e) =>
              setAddForm({ ...addForm, password: e.target.value })
            }
          />
          <TextField
            id="role"
            label="role"
            variant="standard"
            onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
          />
          <br />
          <Button type="submit">submit</Button>
        </Box>
      )}

      {/* show users */}
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell align="right">userId</TableCell>
              <TableCell align="right">userEmail</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="right">{user._id}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell>
                  <Button align="right" onClick={() => Delete(user._id)}>
                    delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    align="right"
                    onClick={() => {
                      setShowUpdate(true);
                      setUpdateForm({ ...updateForm, id: user._id });
                      setUsername(user.username);
                      setEmail(user.email);
                      setRole(user.role);
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

      {/* modal for update user */}
      <div>
        <Modal
          open={showUpdate}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              update user
            </Typography>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
              onSubmit={onUpdate}
            >
              <TextField
                id="update-username"
                label="username"
                variant="standard"
                defaultValue={username}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, username: e.target.value })
                }
              />
              <TextField
                id="update-email"
                label="email"
                variant="standard"
                defaultValue={email}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, email: e.target.value })
                }
              />
              <TextField
                id="update-role"
                label="role"
                variant="standard"
                defaultValue={role}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, role: e.target.value })
                }
              />
              <br />
              <Button type="submit">submit</Button>
              <Button onClick={() => setShowUpdate(false)}>Close</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
