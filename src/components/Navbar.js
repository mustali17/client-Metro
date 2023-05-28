import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../Contexts/context";

const Navbar = () => {
  const { cart } = useContext(UserContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar position="static" style={{ background: "#f8f8f8" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#333" }}>
            Metro Trading
          </Typography>
          <Box
            component="nav"
            sx={{
              display: isMobile ? "none" : "flex",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Button
              color="inherit"
              component={NavLink}
              to="/"
              style={{ color: "#333" }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/products"
              style={{ color: "#333" }}
            >
              Products
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/about"
              style={{ color: "#333" }}
            >
              About
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/contact"
              style={{ color: "#333" }}
            >
              Contact
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            <Button
              color="inherit"
              component={NavLink}
              to="/cart"
              style={{ color: "#333" }}
            >
              <FaShoppingCart className="me-1" />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Cart ({cart.length})
              </Typography>
            </Button>
          </Box>
          <Box
            component="div"
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon style={{ color: "#333" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button component={NavLink} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={NavLink} to="/products">
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button component={NavLink} to="/about">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={NavLink} to="/contact">
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={NavLink} to="/cart">
              <ListItemText primary={`Cart (${cart.length})`} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;
