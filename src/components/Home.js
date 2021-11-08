import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { getAuth, signOut } from "firebase/auth";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { withRouter, useHistory } from "react-router-dom";

function Home() {
  const [authTst, setAuth] = useState(null);
  const [anchorEl, setAnchorEl] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let history = useHistory();
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Soccer App
          </Typography>

          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            className="teste"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
            endIcon={<KeyboardArrowDownIcon />}
          >
            {auth.currentUser.email}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withRouter(Home);
