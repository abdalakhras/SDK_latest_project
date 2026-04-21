import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx"
// import Products from "./components/User/Porducts.jsx";
import Profile from "./components/User/Profile.jsx";
import Home from "./components/Home.jsx";
import ProtectedRoute from "./components/Routes/ProtectedRout.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import { Toaster } from "react-hot-toast";
import Users from "./components/Admin/Users.jsx";
import AdminProducts from "./components/Admin/AdminProducts.jsx";
import { Categories } from "./components/Admin/Categories.jsx";
import ProductsCard from "./components/User/ProductsCard.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Cart from "./components/Cart/Cart.jsx";


function App() {
  return (
    <>
    <Toaster position="top-center"/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/home" element={<Home />} />
         {/* <Route path="/navbar" element={<Navbar />} /> */}

        <Route element={<ProtectedRoute/>}>
        
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/products" element={<ProductsCard />} />
        <Route path="/cart" element={<Cart/>}/>
        
        <Route element={<AdminRoute/>}>
        {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        <Route path="/users" element={<Users />} />
        <Route path ="/adminProducts" element={<AdminProducts/>} />
        <Route path="/categories" element={<Categories/>}/>
        </Route>

        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
