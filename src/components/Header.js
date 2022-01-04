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
      <AppBar style={{ background: 'green' }} position="static">
        <Toolbar className="toolbar" variant="dense">
          <Typography id="logo" variant="h6" color="inherit" component="div">
            Soccer App
          </Typography>
                <ul className="navBar">
                    {props.links.map(link => <li>{link}</li>)}
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
