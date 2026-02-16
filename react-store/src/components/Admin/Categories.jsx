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
import { fabClasses } from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
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

export function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [showCateg, setShowCateg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    discription: "",
    image: "",
  });
  const [updateForm, setUpdateForm] = useState({
    id: "",
    name: "",
    discription: "",
    image: "",
  });
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [image, setImage] = useState("");

  //   fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/category/getCategory");
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  //   delete
  const Delete = async (id) => {
    const confirm = window.confirm("you wanna delete category ?");
    if (confirm) {
      try {
        const { data } = await api.delete(`/category/deleteCateg/${id}`);
        console.log(data.message);
        fetchCategories();
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  //   add categories
  const addCategory = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/category/createCategory", categoryForm);
      console.log(data.message);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // update category

  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put("/category/updatecateg", updateForm);
      console.log(data.message);
      fetchCategories();
      setShowModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <Navbar/>
      <h1>welcom to Categories page</h1>
      {/* <Button onClick={() => navigate("/users")}>go to users</Button>
      <Button onClick={() => navigate("/adminProducts")}>go to products</Button> */}
      {/* adding Category */}
      <Button onClick={() => setShowCateg((prev) => !prev)}>
        {showCateg ? "cancel" : " add category"}
      </Button>

      {showCateg && (
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={addCategory}
        >
          <TextField
            id="category-name"
            label="name"
            variant="standard"
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, name: e.target.value })
            }
          />
          <TextField
            id="category-discription"
            label="discription"
            variant="standard"
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, discription: e.target.value })
            }
          />
          <TextField
            id="category-image"
            label="image"
            variant="standard"
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, image: e.target.value })
            }
          />

          <br />
          <Button type="submit">submit</Button>
        </Box>
      )}

      {/* show categories */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>category name</TableCell>
              <TableCell align="right">discription</TableCell>
              <TableCell align="right">category id</TableCell>
              <TableCell align="right">image</TableCell>
              <TableCell align="right">action</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">{category.discription}</TableCell>
                <TableCell align="right">{category._id}</TableCell>
                <TableCell align="right">
                  <img
                    src={category.image}
                    alt="no image was found"
                    width={"150px"}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => Delete(category._id)}>delete</Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      setShowModal(true);
                      setUpdateForm({ ...updateForm, id: category._id });
                      setName(category.name);
                      setDiscription(category.discription);
                      setImage(category.image);
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
      {/* modal to update categories */}
      <div>
        <Modal
          open={showModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              update category
            </Typography>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
              onSubmit={updateCategory}
            >
              <TextField
                id="update-name"
                label="name"
                variant="standard"
                defaultValue={name}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, name: e.target.value })
                }
              />
              <TextField
                id="update-discription"
                label="discription"
                variant="standard"
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, discription: e.target.value })
                }
                defaultValue={discription}
              />

              <TextField
                id="update-image"
                label="image"
                variant="standard"
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, image: e.target.value })
                }
                defaultValue={image}
              />
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
