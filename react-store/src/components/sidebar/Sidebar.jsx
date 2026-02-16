import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useAuth } from "../Context/Authcontext";
import { SidebarConfig } from "./SidebarConfig";
import { Navigate, useNavigate } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  // console.log(user);
  const role = user?.role;
  const menuItem = SidebarConfig[role] || [];

  // const [open, setOpen] = React.useState(false);
  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen);
  // };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItem.map((item, index) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`${item.path}`);
                onClose();
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={()=>setOpen(isOpen)}>Open drawer</Button> */}
      <Drawer open={open} onClose={onClose}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
