import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false); // State pour controler open/close

  const handleDrawerToggle = () => {
    setOpen(!open); // Toggle  state
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 220 : 64,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        [`& .MuiDrawer-paper`]: {
          width: open ? 220 : 64,
          overflowX: "hidden",
          transition: "width 0.3s",
        },
      }}
    >
      <Toolbar>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />} {/* Toggle icon */}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItem component={Link} to="/" sx={{ px: 2.5 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Register" sx={{ opacity: open ? 1 : 0 }} />
        </ListItem>
        <ListItem component={Link} to="/users" sx={{ px: 2.5 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
