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

function AdminProducts() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [showProd, setShowProd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prodForm, setProdForm] = useState({
    name: "",
    discription: "",
    category: "",
    price: "",
    image: "",
  });

  const [updateForm, setUpdateForm] = useState({
    id: "",
    name: "",
    discription: "",
    category: "",
    price: "",
    image: "",
  });

  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products/getproducts");
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const Delete = async (id) => {
    const confirm = window.confirm("you wanna delete Product ?");
    if (confirm) {
      try {
        const { data } = await api.delete(`/products/deleproduct/${id}`);
        console.log(data.message);
        fetchProducts();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/products/craeteProduct", prodForm);
      console.log(data.message);
      setShowProd(false)
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProd = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.put("/products/updateProduct", updateForm);
      console.log(data.message);
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <Navbar/>
      <h1>welcom to products Page</h1>
    {/* <Button onClick={()=> navigate('/users')}>go to users</Button>
    <Button onClick={()=> navigate('/categories')}>go to categories</Button> */}
      {/* adding product */}
      <Button onClick={() => setShowProd((prev) => !prev)}>
        {showProd ? "cancel" : " add products"}
      </Button>

      {showProd && (
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          onSubmit={addProduct}
        >
          <TextField
            id="product-name"
            label="name"
            variant="standard"
            onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
          />
          <TextField
            id="discription"
            label="discription"
            variant="standard"
            onChange={(e) =>
              setProdForm({ ...prodForm, discription: e.target.value })
            }
          />
          <TextField
            id="category"
            label="category"
            variant="standard"
            onChange={(e) =>
              setProdForm({ ...prodForm, category: e.target.value })
            }
          />
          <TextField
            id="price"
            label="price"
            variant="standard"
            onChange={(e) =>
              setProdForm({ ...prodForm, price: e.target.value })
            }
          />
          <TextField
            id="image"
            label="image"
            variant="standard"
            onChange={(e) =>
              setProdForm({ ...prodForm, image: e.target.value })
            }
          />
          <br />
          <Button type="submit">submit</Button>
        </Box>
      )}

      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>product</TableCell>
              <TableCell align="right">discription</TableCell>
              <TableCell align="right">category</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">image</TableCell>
              <TableCell>action</TableCell>
              <TableCell>action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.discription}</TableCell>
                <TableCell align="right">{product.category}</TableCell>
                <TableCell align="right">{product.price} $</TableCell>
                <TableCell align="right">
                  <img
                    width={"200px"}
                    src={product.img}
                    alt="cant show image"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => Delete(product._id)}>delete</Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      setShowModal(true);
                      setUpdateForm({ ...updateForm, id: product._id });
                      setName(product.name);
                      setDiscription(product.discription);
                      setCategory(product.category);
                      setPrice(product.price);
                      setImage(product.image);
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
      {/* modal to update products */}
      <div>
        <Modal
          open={showModal}
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
              onSubmit={updateProd}
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
                id="update-category"
                label="category"
                variant="standard"
                defaultValue={category}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, category: e.target.value })
                }
              />
              <TextField
                id="update-price"
                label="price"
                variant="standard"
                defaultValue={price}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, price: e.target.value })
                }
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
export default AdminProducts;
