import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import { useAuth } from "../Context/Authcontext.jsx";
import { useNavigate } from "react-router-dom";



export default function Navbar() {


  const [showsidebar, setShowSidebar] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1, width: "90vw" }}  >
        <AppBar position="static" >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setShowSidebar(true)}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> */}
            <Button
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => navigate("/profile")}
            >
              profile
            </Button>
            <Button variant="h6" component="div" sx={{ flexGrow: 1 }} 
          
            >
              dark
            </Button>
            {/* <Button variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Button> */}

            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Sidebar open={showsidebar} onClose={() => setShowSidebar(false)} />
    </>
  );
}
