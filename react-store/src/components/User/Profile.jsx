import { react, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../../services/api";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import React from "react";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import Navbar from "../navbar/Navbar.jsx";

function Profile() {
  // const [showsidebar,setShowSidebar] = useState(false)

  const { user, logout } = useAuth();
  // console.log(user);

  const [updatedUser, setUpdatedUser] = useState({});
  // console.log(updatedUser)

  const [showForm, setShowForm] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);

  const [updateForm, setupdateForm] = useState({
    username: "",
    email: "",
  });
  const [updatePass, setUpdatePass] = useState({
    newpass: "",
    oldpass: "",
  });

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put("/users/updateuserpass", updatePass);
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put("/users/updateUser", updateForm);
      console.log(data.message);
      setUpdatedUser(data.updatedUser);
      setShowForm(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
      <br />
      {/* <Button onClick={()=>logout()}>logout</Button> */}
      {/* <Button color="success" onClick={()=>setShowSidebar(true)}>show side bar</Button> */}
      <br />
      <h1>this is {updatedUser?.role || user?.role} profile</h1>

      <h2>welcome {updatedUser?.username || user?.username}</h2>

      {/* edit user info */}
      <Button onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? "Close" : " Update user info"}
      </Button>
      {showForm && (
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={update}
        >
          <TextField
            id="username"
            label="username"
            variant="standard"
            onChange={(e) =>
              setupdateForm({ ...updateForm, username: e.target.value })
            }
            defaultValue={updatedUser?.username || user?.username}
          />
          <TextField
            id="email"
            label="email"
            variant="standard"
            onChange={(e) =>
              setupdateForm({ ...updateForm, email: e.target.value })
            }
            defaultValue={updatedUser?.email || user?.email}
          />
          <br />
          <Button type="submit">submit</Button>
        </Box>
      )}
      <br />
      {/* edit user password */}
      <Button onClick={() => setShowPassForm(true)}>
        {showPassForm ? "Close" : " Update user password"}
      </Button>
      {showPassForm && (
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={updatePassword}
        >
          <TextField
            id="old-password"
            label="old password"
            variant="standard"
            onChange={(e) =>
              setUpdatePass({ ...updatePass, oldpass: e.target.value })
            }
          />
          <TextField
            id="new-password"
            label="new password"
            variant="standard"
            onChange={(e) =>
              setUpdatePass({ ...updatePass, newpass: e.target.value })
            }
          />
          <br />
          <Button type="submit">submit</Button>
        </Box>
      )}
      {/* <Sidebar open={showsidebar} onClose = {()=>setShowSidebar(false)}/> */}
    </>
  );
}
export default Profile;
