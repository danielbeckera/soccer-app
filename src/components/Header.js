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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css'
import ChangePasswordModal from "./ChangePasswordModal";

import { withRouter, useHistory } from "react-router-dom";

function Home(props) {
  const [authTst, setAuth] = useState(null);
  const [anchorEl, setAnchorEl] = useState(false);
  const [modalVisible, setVisible] = useState(false);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleOpenModal = () => {
    setVisible(true);
  }

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
        <Toolbar className="toolbar" variant="dense">
          <Typography id="logo" variant="h6" color="inherit" component="div">
            Soccer App
          </Typography>
                <ul className="navBar">
                    <li>{props.item1}</li>
                    <li>{props.item2}</li>
                    <li>{props.item3}</li>
                </ul>
            <AccountCircleIcon onClick={handleClick}/>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleOpenModal}>Alterar senha</MenuItem>
            <MenuItem onClick={logout}>Sair</MenuItem>
          </Menu>
        </Toolbar>

      </AppBar>
      <ChangePasswordModal nomeButton="Alterar senha" title="Altere sua senha!" handleClose={handleCloseModal} visibleOn={modalVisible} />

    </>
  );
}

export default withRouter(Home);