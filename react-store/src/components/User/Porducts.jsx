import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

function Products() {
  const [products, setProducts] = useState([]);
  const [searchname,setSearchName] = useState('')

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products/getproducts");
      console.log(data);
      setProducts(data);
      console.log("products : ", products);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>welcom to products Page</h1>
      <label htmlFor="">search by name </label>
      <input type="text" 
      value={searchname}
      onChange={(e)=>setSearchName(e.target.value)}></input>

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
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  <img width={'200px'} src={product.img} alt="cant show image" />
                </TableCell>
                <Button>delete</Button>
                <Button >update</Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Products;
